import { update } from 'lodash';
import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { toast } from 'react-project-management';
import api from 'Services/api';
import { store } from 'store';
import List from './List';
import { Lists } from './Styles';

const filterFeild = (projectId, sprintId, items) => {
  const movedIssue = {
    projectId,
    backlogs: [],
    sprints: [
      {
        id: sprintId,
        issuesList: items,
      },
    ],
  };

  return movedIssue;
};

const getBoardId = (sprints, sprintId, boardName) => {
  const sprintItem = sprints.filter(sprint => sprint.id === sprintId)[0];

  const boardId = sprintItem.boards.filter(board => board.name === boardName)[0].id;
  return boardId;
};

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex.index, 1);

  result.splice(endIndex.index, 0, removed);

  for (let i = 0; i < result.length - 1; i++) {
    for (let j = i + 1; j < result.length; j++) {
      if (result[i].position > result[j].position) {
        const b = result[i].position;
        result[i].position = result[j].position;
        result[j].position = b;
      }
    }
  }

  const updatedPostion = result.map((issue, index) => ({
    id: issue.id,
    position: index,
    boardId: issue.boardId,
  }));
  return updatedPostion;
};

/**
 * Moves an item from one list to another list.
 */
const move = (sprints, sprintId, list, source, destination) => {
  const sourceClone = Array.from(list[source.droppableId]);
  const destClone = Array.from(list[destination.droppableId]);
  const [removed] = sourceClone.splice(source.index, 1);

  const destBoardId = getBoardId(sprints, sprintId, destination.droppableId);

  destClone.splice(destination.index, 0, { ...removed, boardId: destBoardId });

  for (let i = 0; i < destClone.length - 1; i++) {
    for (let j = i + 1; j < destClone.length; j++) {
      if (destClone[i].position > destClone[j].position) {
        const b = destClone[i].position;
        destClone[i].position = destClone[j].position;
        destClone[j].position = b;
      }
    }
  }
  const result = sourceClone.concat(destClone);

  const updatedPostion = result.map((issue, index) => ({
    id: issue.id,
    position: index,
    boardId: issue.boardId,
  }));
  return {
    items: updatedPostion,
    issue: { id: removed.id, issusStatusName: destination.droppableId },
  };
};

const moveIssue = async movedIssue => {
  const res = await api.post(`/api/issues/move`, JSON.stringify(movedIssue));
  return res;
};

const updateIssueDetail = async (issueId, issuesStatusId) => {
  try {
    const res = await api.put(`/api/issues/${issueId}`, { issuesStatusId });
    toast.success('Update issue successfully');
  } catch (err) {
    toast.success(err);
  }
};

const ProjectBoardLists = props => {
  const { boards, projectId, sprintId, sprints, setIsMove } = props;
  const [issueStatusList, setIssueStatusList] = useState([]);

  useEffect(() => {
    const getAllIssueStatus = async () => {
      const res = await api.get(
        `/api/issues-status?organizationId=${store.getState().auth.user.organizationId}`,
      );
      setIssueStatusList(res);
    };
    getAllIssueStatus();
  }, []);

  const handleIssueDrop = ({ draggableId, destination, source }) => {
    if (!isPositionChanged(source, destination)) return;

    if (source.droppableId === destination.droppableId) {
      const items = reorder(boards[source.droppableId], source, destination);
      moveIssue(filterFeild(projectId, sprintId, items))
        .then(res => {
          toast.success(res.message);
        })
        .catch(err => {
          toast.error(err);
        });
    } else {
      const { items, issue } = move(sprints, sprintId, boards, source, destination);
      const issueStatusId = issueStatusList.filter(
        issueStatus => issueStatus.name === issue.issusStatusName,
      )[0].id;

      moveIssue(filterFeild(projectId, sprintId, items))
        .then(res => {
          updateIssueDetail(issue.id, issueStatusId);
          toast.success(res.message);
        })
        .catch(err => {
          toast.error(err);
        });
    }
    setIsMove();
  };

  return (
    <DragDropContext onDragEnd={handleIssueDrop}>
      <Lists>
        {boards !== undefined &&
          ['TO DO', 'IN PROGRESS', 'DONE'].map((boardName, index) => (
            <List key={index} boardName={boardName} board={boards[boardName]} />
          ))}
      </Lists>
    </DragDropContext>
  );
};

const isPositionChanged = (destination, source) => {
  if (!destination) return false;
  const isSameList = destination.droppableId === source.droppableId;
  const isSamePosition = destination.index === source.index;
  return !isSameList || !isSamePosition;
};

export default ProjectBoardLists;
