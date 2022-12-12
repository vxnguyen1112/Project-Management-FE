import React, { Fragment, useState, useEffect } from 'react';
import { Route, useRouteMatch, useHistory } from 'react-router-dom';
import { Breadcrumbs, Modal } from 'components';
import api from 'Services/api'; 
import Header from './Header';
import Filters from './Filters';
import Lists from './Lists';
import IssueDetails from './IssueDetails';

const refactorResStructure = (res) => {
  const boards = {
    "TO DO": [],
    "IN PROGRESS": [],
    "DONE": []
  }
  res.forEach(sprint => {
    sprint.boardDtoList.forEach(board => {
      ["TO DO", "IN PROGRESS", "DONE"].forEach(boardName => {
        if(board.name === boardName && board.issuesDtoList !== undefined) {
          const issuesList = board.issuesDtoList.map(issue => ({
            ...issue,
            sprintId: board.sprintId,
            boardId: board.id,
            sprintPosition: sprint.position,
          }))

          boards[boardName].push(...issuesList);
        }
      })
    })
  })

  return boards;
}


const sortIssueListBySprintAndIssuePosition = (boards) => {
  ["TO DO", "IN PROGRESS", "DONE"].forEach(boardName => {
    boards[boardName].sort((a, b) => (a.sprintPosition - b.sprintPosition || a.position - b.position));
  })
}
const ProjectBoard = () => {
  const match = useRouteMatch();
  const history = useHistory();
  const [boards, setBoards] = useState({});

  useEffect(() => {
    const getBoards = async () => {
      const projectId = '1a27f30a-7703-4b62-bc1e-d7c3e94c15ae';
      const res = await api.get(`/api/issues/boards?project_id=${projectId}`);
      const refactored = refactorResStructure(res);
      sortIssueListBySprintAndIssuePosition(refactored);
      setBoards(refactored);
      console.log("sort", refactored);
      return res;
    }
    getBoards();
  }, []);

  return (
    <Fragment>
      <Breadcrumbs items={['Projects', 'singularity 1.0', 'Test Board']} />
      <Header />
      {/* <Filters
        projectUsers={project.users}
        defaultFilters={defaultFilters}
        filters={filters}
        mergeFilters={mergeFilters}
      /> */}
      <Lists
        boards={boards}
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
                projectUsers={null}
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
