import React from 'react';
import { Route, Redirect, useRouteMatch, useHistory } from 'react-router-dom';

import useApi from 'hooks/api';
import { updateArrayItemById, createQueryParamModalHelpers } from 'react-project-management';
import { Modal } from 'components';

import NavbarLeft from './NavbarLeft';
import IssueCreate from './IssueCreate';
import IssueSearch from './IssueSearch';
import Sidebar from './Sidebar';
import Grantt from './Grantt';
import ProjectBoard from './TestBoard';
import ProjectSettings from './ProjectSettings';
import ProjectCreate from './ProjectCreate';
import Backlog from './Backlog';
import ListIssues from './ListIssues';
import { ProjectPage } from './Styles';

const Project = () => {
  const match = useRouteMatch();
  const history = useHistory();

  const issueSearchModalHelpers = createQueryParamModalHelpers('issue-search');
  const issueCreateModalHelpers = createQueryParamModalHelpers('issue-create');

  const [{ setLocalData }, fetchProject] = useApi.get('/project');
  // const data =
  //   {id:93671,"name":"singularity 1.0","url":"https://www.atlassian.com/software/jira","description":"Plan, track, and manage your agile and software development projects in Jira. Customize your workflow, collaborate, and release great software.","category":"software","createdAt":"2022-11-03T02:44:49.776Z","updatedAt":"2022-11-03T02:44:49.776Z","users":[{"id":281755,"name":"Pickle Rick","email":"rick@jira.guest","avatarUrl":"https://i.ibb.co/7JM1P2r/picke-rick.jpg","createdAt":"2022-11-03T02:44:49.763Z","updatedAt":"2022-11-03T02:44:49.776Z","projectId":93671},{"id":281756,"name":"Baby Yoda","email":"yoda@jira.guest","avatarUrl":"https://i.ibb.co/6n0hLML/baby-yoda.jpg","createdAt":"2022-11-03T02:44:49.766Z","updatedAt":"2022-11-03T02:44:49.776Z","projectId":93671},{"id":281757,"name":"Lord Gaben","email":"gaben@jira.guest","avatarUrl":"https://i.ibb.co/6RJ5hq6/gaben.jpg","createdAt":"2022-11-03T02:44:49.770Z","updatedAt":"2022-11-03T02:44:49.776Z","projectId":93671}],"issues":[{"id":760322,"title":"Click on an issue to see what's behind it.","type":"task","status":"backlog","priority":"2","listPosition":2,"createdAt":"2022-11-03T02:44:49.786Z","updatedAt":"2022-11-03T02:44:49.786Z","userIds":[281755]},{"id":760321,"title":"This is an issue of type: Task.","type":"task","status":"selected","priority":"4","listPosition":7,"createdAt":"2022-11-03T02:44:49.786Z","updatedAt":"2022-11-04T14:09:37.684Z","userIds":[281755]},{"id":760323,"title":"Try dragging issues to different columns to transition their status.","type":"story","status":"backlog","priority":"3","listPosition":3,"createdAt":"2022-11-03T02:44:49.786Z","updatedAt":"2022-11-03T02:44:49.786Z","userIds":[]},{"id":760324,"title":"You can use rich text with images in issue descriptions.","type":"story","status":"backlog","priority":"1","listPosition":4,"createdAt":"2022-11-03T02:44:49.808Z","updatedAt":"2022-11-03T02:44:49.808Z","userIds":[281757]},{"id":760325,"title":"Try leaving a comment on this issue.","type":"task","status":"done","priority":"3","listPosition":7,"createdAt":"2022-11-03T02:44:49.812Z","updatedAt":"2022-11-03T02:44:49.812Z","userIds":[281756]},{"id":760326,"title":"You can track how many hours were spent working on an issue, and how many hours remain.","type":"task","status":"inprogress","priority":"1","listPosition":7,"createdAt":"2022-11-03T02:44:49.815Z","updatedAt":"2022-11-03T02:44:49.815Z","userIds":[]},{"id":760327,"title":"Each issue has a single reporter but can have multiple assignees.","type":"story","status":"selected","priority":"4","listPosition":6,"createdAt":"2022-11-03T02:44:49.829Z","updatedAt":"2022-11-03T02:44:49.829Z","userIds":[281756,281757]},{"id":761194,"title":"trtr","type":"task","status":"backlog","priority":"3","listPosition":1,"createdAt":"2022-11-04T14:26:48.858Z","updatedAt":"2022-11-06T03:48:44.362Z","userIds":[]},{"id":760328,"title":"Each issue can be assigned priority from lowest to highest.","type":"task","status":"selected","priority":"5","listPosition":5,"createdAt":"2022-11-03T02:44:49.829Z","updatedAt":"2022-11-06T06:46:40.351Z","userIds":[]}]}
  // if (!data) return <PageLoader />;
  // if (error) return <PageError />;
  const data = {
    project: {
      id: 93671,
      name: 'singularity 1.0',
      url: 'https://www.atlassian.com/software/jira',
      description:
        'Plan, track, and manage your agile and software development projects in Jira. Customize your workflow, collaborate, and release great software.',
      category: 'software',
      createdAt: '2022-11-03T02:44:49.776Z',
      updatedAt: '2022-11-03T02:44:49.776Z',
      users: [
        {
          id: 281755,
          name: 'Pickle Rick',
          email: 'rick@jira.guest',
          avatarUrl: 'https://i.ibb.co/7JM1P2r/picke-rick.jpg',
          createdAt: '2022-11-03T02:44:49.763Z',
          updatedAt: '2022-11-03T02:44:49.776Z',
          projectId: 93671,
        },
        {
          id: 281756,
          name: 'Baby Yoda',
          email: 'yoda@jira.guest',
          avatarUrl: 'https://i.ibb.co/6n0hLML/baby-yoda.jpg',
          createdAt: '2022-11-03T02:44:49.766Z',
          updatedAt: '2022-11-03T02:44:49.776Z',
          projectId: 93671,
        },
        {
          id: 281757,
          name: 'Lord Gaben',
          email: 'gaben@jira.guest',
          avatarUrl: 'https://i.ibb.co/6RJ5hq6/gaben.jpg',
          createdAt: '2022-11-03T02:44:49.770Z',
          updatedAt: '2022-11-03T02:44:49.776Z',
          projectId: 93671,
        },
      ],
      issues: [
        {
          id: 760328,
          title: 'Each issue can be assigned priority from lowest to highest.',
          type: 'task',
          status: 'selected',
          priority: '5',
          listPosition: 5,
          createdAt: '2022-11-03T02:44:49.829Z',
          updatedAt: '2022-11-06T06:46:40.351Z',
          userIds: [],
        },
        {
          id: 760322,
          title: "Click on an issue to see what's behind it.",
          type: 'task',
          status: 'backlog',
          priority: '2',
          listPosition: 2,
          createdAt: '2022-11-03T02:44:49.786Z',
          updatedAt: '2022-11-03T02:44:49.786Z',
          userIds: [281755],
        },
        {
          id: 760321,
          title: 'This is an issue of type: Task.',
          type: 'task',
          status: 'selected',
          priority: '4',
          listPosition: 7,
          createdAt: '2022-11-03T02:44:49.786Z',
          updatedAt: '2022-11-04T14:09:37.684Z',
          userIds: [281755],
        },
        {
          id: 760323,
          title: 'Try dragging issues to different columns to transition their status.',
          type: 'story',
          status: 'backlog',
          priority: '3',
          listPosition: 3,
          createdAt: '2022-11-03T02:44:49.786Z',
          updatedAt: '2022-11-03T02:44:49.786Z',
          userIds: [],
        },
        {
          id: 760324,
          title: 'You can use rich text with images in issue descriptions.',
          type: 'story',
          status: 'backlog',
          priority: '1',
          listPosition: 4,
          createdAt: '2022-11-03T02:44:49.808Z',
          updatedAt: '2022-11-03T02:44:49.808Z',
          userIds: [281757],
        },
        {
          id: 760325,
          title: 'Try leaving a comment on this issue.',
          type: 'task',
          status: 'done',
          priority: '3',
          listPosition: 7,
          createdAt: '2022-11-03T02:44:49.812Z',
          updatedAt: '2022-11-03T02:44:49.812Z',
          userIds: [281756],
        },
        {
          id: 760326,
          title:
            'You can track how many hours were spent working on an issue, and how many hours remain.',
          type: 'task',
          status: 'inprogress',
          priority: '1',
          listPosition: 7,
          createdAt: '2022-11-03T02:44:49.815Z',
          updatedAt: '2022-11-03T02:44:49.815Z',
          userIds: [],
        },
        {
          id: 760327,
          title: 'Each issue has a single reporter but can have multiple assignees.',
          type: 'story',
          status: 'selected',
          priority: '4',
          listPosition: 6,
          createdAt: '2022-11-03T02:44:49.829Z',
          updatedAt: '2022-11-03T02:44:49.829Z',
          userIds: [281756, 281757],
        },
        {
          id: 761194,
          title: 'trtr',
          type: 'task',
          status: 'backlog',
          priority: '3',
          listPosition: 1,
          createdAt: '2022-11-04T14:26:48.858Z',
          updatedAt: '2022-11-06T03:48:44.362Z',
          userIds: [],
        },
        {
          id: 761195,
          title: 'Code giao diện trang chủ',
          type: 'story',
          status: 'inprogress',
          priority: '3',
          listPosition: 10,
          createdAt: '2022-11-04T14:26:48.858Z',
          updatedAt: '2022-11-06T03:48:44.362Z',
          userIds: [],
        },
      ],
    },
  };

  const { project } = data;

  const updateLocalProjectIssues = (issueId, updatedFields) => {
    setLocalData(currentData => ({
      project: {
        ...currentData.project,
        issues: updateArrayItemById(currentData.project.issues, issueId, updatedFields),
      },
    }));
  };

  return (
    <ProjectPage>
      <NavbarLeft
        issueSearchModalOpen={issueSearchModalHelpers.open}
        issueCreateModalOpen={issueCreateModalHelpers.open}
      />

      <Sidebar project={project} />

      {issueSearchModalHelpers.isOpen() && (
        <Modal
          isOpen
          testid="modal:issue-search"
          variant="aside"
          width={600}
          onClose={issueSearchModalHelpers.close}
          renderContent={() => <IssueSearch project={project} />}
        />
      )}

      {issueCreateModalHelpers.isOpen() && (
        <Modal
          isOpen
          testid="modal:issue-create"
          width={800}
          withCloseIcon={false}
          onClose={issueCreateModalHelpers.close}
          renderContent={modal => (
            <IssueCreate
              project={project}
              fetchProject={fetchProject}
              onCreate={() => history.push(`${match.url}/board`)}
              modalClose={modal.close}
            />
          )}
        />
      )}

      <Route path={`${match.path}/test-board`} render={() => <ProjectBoard />} />

      <Route
        path={`${match.path}/settings`}
        render={() => <ProjectSettings project={project} fetchProject={fetchProject} />}
      />

      <Route path={`${match.path}/grantt`} render={() => <Grantt />} />

      <Route path={`${match.path}/project-create`} render={() => <ProjectCreate />} />

      <Route path={`${match.path}/backlog`} render={() => <Backlog />} />
      <Route path={`${match.path}/list-issues`} render={() => <ListIssues />} />
      {match.isExact && <Redirect to={`${match.url}/test-board`} />}
    </ProjectPage>
  );
};

export default Project;
