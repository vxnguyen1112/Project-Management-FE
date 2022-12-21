import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import api from 'Services/api';
import { CopyLinkButton, Button, AboutTooltip } from 'components';
import Type from './Type';
import Delete from './Delete';
import Title from './Title';
import Description from './Description';
import Comments from './Comments';
import Status from './Status';
import AssigneesReporter from './AssigneesReporter';
import Priority from './Priority';
import EstimateTracking from './EstimateTracking';
import Dates from './Dates';
import { TopActions, TopActionsRight, Content, Left, Right } from './Styles';

const propTypes = {
  issueId: PropTypes.string.isRequired,
  projectUsers: PropTypes.array.isRequired,
  fetchProject: PropTypes.func.isRequired,
  updateLocalProjectIssues: PropTypes.func.isRequired,
  modalClose: PropTypes.func.isRequired,
};

const ProjectBoardIssueDetails = ({
  issueId,
  projectUsers,
  fetchProject,
  updateLocalProjectIssues,
  modalClose,
}) => {
  const data = {
    issue: {
      id: 760323,
      title: 'Try dragging issues to different columns to transition their status.',
      type: 'story',
      status: 'backlog',
      priority: '3',
      listPosition: 3,
      description:
        '<p>An issue\'s status indicates its current place in the project\'s workflow. Here\'s a list of the statuses that come with&nbsp;JIRA products, depending on what projects you\'ve created on your site.</p><p><br></p><h3>Jira software issue statuses:</h3><p><br></p><h2><strong style="background-color: rgb(187, 187, 187);"> Backlog </strong></h2><p>The issue is waiting to be picked up in a future sprint.</p><p><br></p><h2><strong style="background-color: rgb(187, 187, 187);"> Selected </strong></h2><p>The issue is open and ready for the assignee to start work on it.</p><p><br></p><h2><strong style="background-color: rgb(0, 102, 204); color: rgb(255, 255, 255);"> In Progress </strong></h2><p>This issue is being actively worked on at the moment by the assignee.</p><p><br></p><h2><strong style="background-color: rgb(0, 138, 0); color: rgb(255, 255, 255);"> Done </strong></h2><p>Work has finished on the issue.</p>',
      descriptionText:
        "An issue's status indicates its current place in the project's workflow. Here's a list of the statuses that come with&nbsp;JIRA products, depending on what projects you've created on your site.Jira software issue statuses: Backlog The issue is waiting to be picked up in a future sprint. Selected The issue is open and ready for the assignee to start work on it. In Progress This issue is being actively worked on at the moment by the assignee. Done Work has finished on the issue.",
      estimate: 15,
      timeSpent: 12,
      timeRemaining: null,
      createdAt: '2022-11-03T02:44:49.786Z',
      updatedAt: '2022-11-03T02:44:49.786Z',
      reporterId: 281756,
      projectId: 93671,
      users: [],
      comments: [
        {
          id: 756799,
          body: 'In the twilight rain\nthese brilliant-hued hibiscus -\nA lovely sunset.',
          createdAt: '2022-11-03T02:44:49.842Z',
          updatedAt: '2022-11-03T02:44:49.842Z',
          userId: 281757,
          issueId: 760323,
          user: {
            id: 281757,
            name: 'Lord Gaben',
            email: 'gaben@jira.guest',
            avatarUrl: 'https://i.ibb.co/6RJ5hq6/gaben.jpg',
            createdAt: '2022-11-03T02:44:49.770Z',
            updatedAt: '2022-11-03T02:44:49.776Z',
            projectId: 93671,
          },
        },
      ],
      userIds: [],
    },
  };
  // if (!data) return <Loader />;
  // if (error) return <PageError />;

  const { issue } = data;

  const updateLocalIssueDetails = fields =>
    setLocalData(currentData => ({ issue: { ...currentData.issue, ...fields } }));

  const updateIssue = updatedFields => {
    api.optimisticUpdate(`/issues/${issueId}`, {
      updatedFields,
      currentFields: issue,
      setLocalData: fields => {
        updateLocalIssueDetails(fields);
        updateLocalProjectIssues(issue.id, fields);
      },
    });
  };

  return (
    <Fragment>
      <TopActions>
        <Type issue={issue} updateIssue={updateIssue} />
        <TopActionsRight>
          <AboutTooltip
            renderLink={linkProps => (
              <Button icon="feedback" variant="empty" {...linkProps}>
                Give feedback
              </Button>
            )}
          />
          <CopyLinkButton variant="empty" />
          <Delete issue={issue} fetchProject={fetchProject} modalClose={modalClose} />
          <Button icon="close" iconSize={24} variant="empty" onClick={modalClose} />
        </TopActionsRight>
      </TopActions>
      <Content>
        <Left>
          <Title issue={issue} updateIssue={updateIssue} />
          <Description issue={issue} updateIssue={updateIssue} />
          <Comments issue={issue} fetchIssue={fetchIssue} />
        </Left>
        <Right>
          <Status issue={issue} updateIssue={updateIssue} />
          <AssigneesReporter issue={issue} updateIssue={updateIssue} projectUsers={projectUsers} />
          <Priority issue={issue} updateIssue={updateIssue} />
          <EstimateTracking issue={issue} updateIssue={updateIssue} />
          <Dates issue={issue} />
        </Right>
      </Content>
    </Fragment>
  );
};

ProjectBoardIssueDetails.propTypes = propTypes;

export default ProjectBoardIssueDetails;
