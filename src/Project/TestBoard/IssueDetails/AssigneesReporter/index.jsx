import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { Avatar, Select, Icon } from 'components';

import { SectionTitle } from '../Styles';
import { User, Username } from './Styles';

const propTypes = {
  issue: PropTypes.object.isRequired,
  updateIssue: PropTypes.func.isRequired,
  projectUsers: PropTypes.array.isRequired,
};

const ProjectBoardIssueDetailsAssigneesReporter = ({ issue, updateIssue, projectUsers }) => {
  const getUserById = id => projectUsers.find(user => user.id === id);

  const userOptions = projectUsers.map(user => ({ value: user.id, label: user.displayName }));

  return (
    <Fragment>
      <SectionTitle>Assignees</SectionTitle>
      <Select
        variant="empty"
        dropdownWidth={343}
        placeholder="Unassigned"
        name="assignees"
        value={issue.assignMemberId}
        options={userOptions}
        onChange={assignMemberId => {
          updateIssue({ assignMemberId });
        }}
        renderValue={({ value: id, removeOptionValue }) =>
          renderUser(getUserById(id), true, removeOptionValue)
        }
        renderOption={({ value: id }) => renderUser(getUserById(id), false)}
      />
      {/* 
      <SectionTitle>Reporter</SectionTitle>
      <Select
        variant="empty"
        dropdownWidth={343}
        withClearValue={false}
        name="reporter"
        value={issue.reporterId}
        options={userOptions}
        onChange={id => updateIssue({ reporterId: id })}
        renderValue={({ value: id }) => renderUser(getUserById(id), true)}
        renderOption={({ value: id }) => renderUser(getUserById(id))}
      /> */}
    </Fragment>
  );
};

const renderUser = (user, isSelectValue, removeOptionValue) => (
  <User
    key={user.id}
    isSelectValue={isSelectValue}
    withBottomMargin={!!removeOptionValue}
    onClick={() => removeOptionValue && removeOptionValue()}
  >
    <Avatar
      avatarUrl="https://pixlok.com/wp-content/uploads/2021/03/default-user-profile-picture.jpg"
      name={user.displayName}
      size={24}
    />
    <Username>{user.displayName}</Username>
    {removeOptionValue && <Icon type="close" top={1} />}
  </User>
);

ProjectBoardIssueDetailsAssigneesReporter.propTypes = propTypes;

export default ProjectBoardIssueDetailsAssigneesReporter;
