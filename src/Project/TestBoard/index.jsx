import React, { Fragment, useState, useEffect } from 'react';
import { Route, useRouteMatch, useHistory } from 'react-router-dom';
import { Breadcrumbs, Modal } from 'components';
import useMergeState from 'hooks/mergeState';
import { store } from 'store';
import api from 'Services/api';
import Header from './Header';
import Filters from './Filters';
import Lists from './Lists';
import IssueDetails from './IssueDetails';

const defaultFilters = {
  searchTerm: '',
  sprintId: null,
};

const refactorResStructure = (res, sprintId) => {
  const boards = {
    'TO DO': [],
    'IN PROGRESS': [],
    DONE: [],
  };
  const filterRes = sprintId !== null ? res.filter(sprint => sprint.id === sprintId) : res;

  filterRes.forEach(sprint => {
    sprint.boardDtoList.forEach(board => {
      ['TO DO', 'IN PROGRESS', 'DONE'].forEach(boardName => {
        if (board.name === boardName && board.issuesDtoList !== undefined) {
          const issuesList = board.issuesDtoList.map(issue => ({
            ...issue,
            sprintId: board.sprintId,
            boardId: board.id,
            sprintPosition: sprint.position,
          }));

          boards[boardName].push(...issuesList);
        }
      });
    });
  });

  return boards;
};

const fetchSprints = res => {
  const sprints = res.map(sprint => {
    const obj = {
      id: sprint.id,
      name: sprint.name,
      value: sprint.name,
      label: sprint.name,
    };

    const boards = [];
    sprint.boardDtoList.forEach(board => {
      boards.push({
        id: board.id,
        name: board.name,
      });
    });
    obj.boards = boards;
    return obj;
  });

  return sprints;
};

const sortIssueListBySprintAndIssuePosition = boards => {
  ['TO DO', 'IN PROGRESS', 'DONE'].forEach(boardName => {
    boards[boardName].sort((a, b) => a.position - b.position);
  });
};
const ProjectBoard = () => {
  const match = useRouteMatch();
  const history = useHistory();
  const [boards, setBoards] = useState({});
  const [filters, mergeFilters] = useMergeState(defaultFilters);
  const [sprints, setSprints] = useState([]);
  const [isMove, setIsMove] = useState(false);
  const [members, setMembers] = useState([]);
  const { projectId } = store.getState().listproject;

  useEffect(() => {
    const getBoards = async () => {
      const res = await api.get(`/api/issues/boards?project_id=${projectId}`);
      setSprints(fetchSprints(res));
      const refactored = refactorResStructure(res, filters.sprintId);
      sortIssueListBySprintAndIssuePosition(refactored);
      setBoards(refactored);
      console.log('sort', refactored);
      return res;
    };

    const getMembers = async () => {
      const res = await api.get(`/api/members/projects/${projectId}/search`);
      setMembers(res);
    };

    getBoards();
    getMembers();
  }, [filters, isMove]);

  return (
    <Fragment>
      <Breadcrumbs items={['Projects', 'singularity 1.0', 'Test Board']} />
      <Header />
      <Filters
        sprints={sprints}
        defaultFilters={defaultFilters}
        filters={filters}
        mergeFilters={mergeFilters}
      />
      <Lists
        boards={boards}
        sprintId={filters.sprintId}
        projectId={projectId}
        sprints={sprints}
        setIsMove={() => setIsMove(!isMove)}
      />
      <Route
        path={`${match.path}/issues/:issueId`}
        render={routeProps => (
          <Modal
            isOpen
            testid="modal:issue-details"
            width={1040}
            withCloseIcon={false}
            onClose={() => history.push(match.url)}
            renderContent={modal => (
              <IssueDetails
                issueId={routeProps.match.params.issueId}
                projectUsers={members}
                fetchProject={() => {}}
                updateLocalProjectIssues={() => {}}
                modalClose={modal.close}
              />
            )}
          />
        )}
      />
    </Fragment>
  );
};

export default ProjectBoard;
