import React, { useEffect, useState } from 'react';
import { Breadcrumbs } from 'components';
import { DragDropContext } from 'react-beautiful-dnd';
import { toast } from 'react-project-management';
import api from 'Services/api';
import { store } from 'store';
import { FormHeading } from '../ProjectSettings/Styles';
import BoardSprint from './Board/BoardSprint';
import BoardBacklog from './Board/BoardBacklog';
import { reorder, move, getList } from './sprintEvent';

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  padding: grid * 2,
  margin: 0,
  border: '1px solid #EBECF0',
  background: isDragging ? 'lightgreen' : '#fff',
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightgrey' : '#f4f5f7',
  padding: grid,
  width: '100%',
});

const filterFeild = items => {
  const movedIssue = {
    projectId: store.getState().listproject.projectId,
    backlogs: [],
    sprints: [],
  };

  items.forEach(item => {
    if (item.id === '#backlog') {
      movedIssue.backlogs = [...item.issuesList];
    } else {
      movedIssue.sprints.push(item);
    }
  });
  // const stringifyJson = JSON.stringify(moveIssue);
  return movedIssue;
};

const sortFeild = items => {
  let copedItems = { ...items };
  // console.log("Copy board", copedItems);
  copedItems.backlog.sort((a, b) => a.position - b.position);
  copedItems.sprints.sort((a, b) => a.position - b.position);

  copedItems.sprints.forEach(sprint => {
    if (sprint.issuesList !== undefined) {
      sprint.issuesList.sort((a, b) => a.position - b.position);
    }
  });
  return copedItems;
};

const getAllSprints = async projectId => {
  const res = await api.get(`/api/backlogs?project_id=${projectId}`);
  return res;
};

const moveIssue = async movedIssue => {
  const res = await api.post(`/api/issues/move`, JSON.stringify(movedIssue));
  return res;
};

const Backlog = () => {
  const [boards, setBoards] = useState(null);
  const [boardStatus, setBoardStatus] = useState('empty');
  const [isMove, setIsMove] = useState(false);
  const [doCreateIssue, setDoCreateIssue] = useState(false);
  const [doDeleteIssue, setDoDeleteIssue] = useState(false);
  const [doCreateSprint, setDoCreateSprint] = useState(false);
  const [doStartSprint, setDoStartSprint] = useState(false);
  const [doDeleteSprint, setDoDeleteSprint] = useState(false);
  const [doCompleteSprint, setDoCompleteSprint] = useState(false);

  let sortedBoards;
  if (boardStatus !== 'empty') {
    const copedBoards = { ...boards };
    sortedBoards = sortFeild(copedBoards);
  }

  useEffect(() => {
    const { projectId } = store.getState().listproject;
    getAllSprints(projectId)
      .then(res => {
        setBoards(res);
        setBoardStatus(`successed`);
      })
      .catch(err => {
        toast.error(err);
      });
  }, [
    boardStatus,
    isMove,
    doCreateIssue,
    doDeleteIssue,
    doCreateSprint,
    doStartSprint,
    doDeleteSprint,
    doCompleteSprint,
  ]);

  const onDragEnd = result => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        getList(sortedBoards, source.droppableId),
        source.droppableId,
        source.index,
        destination.index,
      );

      moveIssue(filterFeild(items))
        .then(res => {
          toast.success(res.message);
        })
        .catch(err => {
          toast.error(err);
        });
    } else {
      const items = move(
        sortedBoards,
        getList(sortedBoards, source.droppableId),
        getList(sortedBoards, destination.droppableId),
        source,
        destination,
      );

      moveIssue(filterFeild(items))
        .then(res => {
          toast.success(res.message);
        })
        .catch(err => {
          toast.error(err);
        });
    }
    setIsMove(!isMove);
  };

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Breadcrumbs items={['Projects', 'singularity 1.0', 'Backlog']} />
      <FormHeading>Backlog</FormHeading>

      <DragDropContext onDragEnd={onDragEnd}>
        {boardStatus !== 'empty' &&
          sortedBoards.sprints.map(sprint => (
            <BoardSprint
              key={sprint.id}
              sprint={sprint}
              getListStyle={getListStyle}
              getItemStyle={getItemStyle}
              setDoCreateIssue={setDoCreateIssue}
              setDoStartSprint={setDoStartSprint}
              setDoDeleteIssue={setDoDeleteIssue}
              setDoDeleteSprint={setDoDeleteSprint}
              setDoCompleteSprint={setDoCompleteSprint}
            />
          ))}

        {boardStatus !== 'empty' && (
          <BoardBacklog
            droppableId="#backlog"
            backlog={sortedBoards.backlog}
            numSprint={sortedBoards.sprints.length}
            getListStyle={getListStyle}
            getItemStyle={getItemStyle}
            setDoCreateIssue={setDoCreateIssue}
            setDoDeleteIssue={setDoDeleteIssue}
            setDoCreateSprint={setDoCreateSprint}
          />
        )}
      </DragDropContext>
    </div>
  );
};

export default Backlog;
