import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { IssueStatus, IssueStatusCopy } from 'constants/issues';
import { Select, Icon } from 'components';

import { Status } from './Styles';

const propTypes = {
  issue: PropTypes.object.isRequired,
  updateIssue: PropTypes.func.isRequired,
};

const ProjectBoardIssueDetailsStatus = ({ issue, updateIssue }) => (
  <Fragment>
    <Select
      variant="empty"
      dropdownWidth={150}
      withClearValue={false}
      name="status"
      value={issue.status}
      options={Object.values(IssueStatus).map(status => ({
        value: status,
        label: IssueStatusCopy[status],
      }))}
      onChange={status => updateIssue({ status })}
      renderValue={({ value: status }) => (
        <Status isValue color={status}>
          <div>{IssueStatusCopy[status]}</div>
          <Icon type="chevron-down" size={18} />
        </Status>
      )}
      renderOption={({ value: status }) => (
        <Status color={status}>{IssueStatusCopy[status]}</Status>
      )}
    />
  </Fragment>
);

ProjectBoardIssueDetailsStatus.propTypes = propTypes;

export default ProjectBoardIssueDetailsStatus;
