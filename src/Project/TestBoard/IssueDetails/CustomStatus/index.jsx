import React, { Fragment } from 'react';

import { IssueStatus, IssueStatusCopy } from 'constants/issues';
import { Select, Icon } from 'components';

import { Status } from './Styles';

// const issueStatus = [
//   {
//       id: "14c745ba-44b9-4857-a73b-846f74e7b33f",
//       name: "IN PROGRESS",
//       description: "This is task status in progress",
//       color: "BLUE"
//   },
//   {
//       id: "a3481f27-53d6-41d1-88f2-97a2cf72e2c9",
//       name: "TO DO",
//       description: "This is task status default",
//       color: "GRAY"
//   },
//   {
//       id: "c3a1e019-c9a0-47b0-8958-2d2a3628d69b",
//       name: "DONE",
//       description: "This is task status in progress",
//       color: "GREEN"
//   }
// ]

const statusMap = {
  'TO DO': 'todo',
  'IN PROGRESS': 'inprogress',
  DONE: 'done',
};

const ProjectBoardIssueDetailsStatus = props => {
  const { issueStatusName, updateIssue } = props;
  const issueStatus = {
    status: statusMap[issueStatusName],
  };

  return (
    <Fragment>
      <Select
        variant="empty"
        dropdownWidth={150}
        withClearValue={false}
        name="status"
        value={issueStatus.status}
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
};

export default ProjectBoardIssueDetailsStatus;
