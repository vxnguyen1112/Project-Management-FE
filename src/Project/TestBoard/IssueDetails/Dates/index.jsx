import React from 'react';
import PropTypes from 'prop-types';

import { formatDateTimeConversational } from 'react-project-management';

import { Dates } from './Styles';

const propTypes = {
  issue: PropTypes.object.isRequired,
};

const ProjectBoardIssueDetailsDates = ({ issue }) => (
  <Dates>
    <div>Created at {formatDateTimeConversational(issue.createdAt)}</div>
    <div>Updated at {formatDateTimeConversational(issue.updatedAt)}</div>
  </Dates>
);

ProjectBoardIssueDetailsDates.propTypes = propTypes;

export default ProjectBoardIssueDetailsDates;
