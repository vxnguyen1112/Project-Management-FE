import React from 'react';
import PropTypes from 'prop-types';
import { useRouteMatch } from 'react-router-dom';
import { Draggable } from 'react-beautiful-dnd';

import { IssuePriorityIcon } from 'components';

import {
  IssueLink,
  Issue,
  Title,
  Bottom,
  IssueType,
  AssigneeAvatar,
  IssueTypeIcon,
} from './Styles';

const propTypes = {
  issue: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

const ProjectBoardListIssue = ({ issue, index }) => {
  const match = useRouteMatch();

  // const assignees = issue.userIds.map(userId => projectUsers.find(user => user.id === userId));

  return (
    <Draggable draggableId={issue.id} index={index}>
      {(provided, snapshot) => (
        <IssueLink
          to={`${match.url}/issues/${issue.id}`}
          ref={provided.innerRef}
          data-testid="list-issue"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Issue isBeingDragged={snapshot.isDragging && !snapshot.isDropAnimating}>
            <Title>{issue.name}</Title>
            <Bottom>
              <div>
                {/* <IssueTypeIcon type={issue.issuesTypeDto.name.toLowerCase()} /> */}
                <IssueType>
                  <IssueTypeIcon src={issue.issuesTypeDto.urlIcon} alt="" />
                </IssueType>
                {issue.priority !== undefined && (
                  <IssuePriorityIcon priority={issue.priority} top={-1} left={4} />
                )}
              </div>
              {/* <Assignees>
                {issue.assignees.map(user => (
                  <AssigneeAvatar
                    key={user.id}
                    size={24}
                    avatarUrl={user.avatarUrl}
                    name={user.name}
                  />
                ))}
              </Assignees> */}
            </Bottom>
          </Issue>
        </IssueLink>
      )}
    </Draggable>
  );
};

ProjectBoardListIssue.propTypes = propTypes;

export default ProjectBoardListIssue;
