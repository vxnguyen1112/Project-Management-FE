import React, { useState, useEffect } from 'react';
import api from 'Services/api';
import { store } from 'store';
import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom"
import {
  IssueType,
  IssueStatus,
  IssuePriority,
  IssueTypeCopy,
  IssuePriorityCopy,
} from 'constants/issues';
import { toast } from 'react-project-management';
import { Form, IssueTypeIcon, Icon, Avatar, IssuePriorityIcon } from 'components';
import Calendar from './Calendar';

import {
  FormHeading,
  FormElement,
  SelectItem,
  SelectItemLabel,
  Actions,
  ActionButton,
} from './Styles';

const propTypes = {
  onCreate: PropTypes.func.isRequired,
  modalClose: PropTypes.func.isRequired,
};

const filterType = (issuesType, issueTypeName) => {
  const res = issuesType.filter(issueType => issueType.name.toLowerCase() === issueTypeName);

  return res.length > 0 ? res[0].id : null;
};

const filterStatus = (issuesStatus, issueStatusName) => {
  const res = issuesStatus.filter(issueType => issueType.name === issueStatusName);

  return res.length > 0 ? res[0].id : null;
};

const ProjectIssueCreate = ({ onCreate, modalClose }) => {
  const history = useHistory();
  const [startDate, setStartDate] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const [members, setMembers] = useState([]);
  const [issueTypeList, setIssueTypeList] = useState([]);
  const [issueStatusList, setIssueStatusList] = useState([]);
  const { projectId } = store.getState().listproject;
  const { organizationId } = store.getState().auth.user;

  useEffect(() => {
    const getAllIssueType = async () => {
      const res = await api.get(`/api/issues-types?organizationId=${organizationId}`);
      setIssueTypeList(
        res.map(issueType => ({
          value: issueType.name,
          label: issueType.name,
          ...issueType,
        })),
      );
    };

    const getAllIssueStatus = async () => {
      const res = await api.get(`/api/issues-status?organizationId=${organizationId}`);
      setIssueStatusList(res);
    };

    const getMembers = async () => {
      const res = await api.get(`/api/members/projects/${projectId}/search`);
      console.log(res);
      setMembers(res);
    };
    getAllIssueType();
    getAllIssueStatus();
    getMembers();
  }, []);

  return (
    <Form
      enableReinitialize
      initialValues={{
        type: IssueType.TASK,
        name: '',
        description: '',
        userIds: null,
        priority: IssuePriority.MEDIUM,
        estimateHours: '',
      }}
      validations={{
        type: Form.is.required(),
        name: [Form.is.required(), Form.is.maxLength(200)],
        priority: Form.is.required(),
      }}
      onSubmit={async (values, form) => {
        try {
          // await createIssue({
          //   ...values,
          //   status: IssueStatus.BACKLOG,
          //   projectId: project.id,
          //   users: values.userIds.map(id => ({ id })),
          // });
          const body = {
            issueTypeId: filterType(issueTypeList, values.type),
            assignMemberId: values.userIds,
            name: values.name,
            description: values.description,
            projectId,
            issuesStatusId: filterStatus(issueStatusList, 'TO DO'),
            isPublic: true,
            organizationId,
            startDate,
            dueDate,
            estimatedHours: parseInt(values.estimateHours),
            priority: values.priority,
          };
          console.log(body);
          const res = await api.post(`/api/issues`, JSON.stringify(body));
          toast.success('Issue has been successfully created.');
          onCreate();
          history.push('/project/backlog');
        } catch (error) {
          Form.handleAPIError(error, form);
        }
      }}
    >
      <FormElement>
        <FormHeading>Create issue</FormHeading>
        <Form.Field.Input name="name" label="Name" />

        <Form.Field.Select
          name="type"
          label="Issue Type"
          options={typeOptions}
          renderOption={renderType}
          renderValue={renderType}
        />
        <Form.Field.TextEditor name="description" label="Description" />

        <Form.Field.Select
          name="userIds"
          label="Assignees"
          options={userOptions(members)}
          renderOption={renderUser(members)}
          renderValue={renderUser(members)}
        />
        <Form.Field.Select
          name="priority"
          label="Priority"
          options={priorityOptions}
          renderOption={renderPriority}
          renderValue={renderPriority}
        />

        <Form.Field.Input name="estimateHours" label="Estimate (Hours)" />

        <Calendar val={startDate} setValue={setStartDate} displayFieldName="Start date" />

        <Calendar val={dueDate} setValue={setDueDate} displayFieldName="Due date" />

        <Actions>
          <ActionButton type="submit" variant="primary">
            Create Issue
          </ActionButton>
          <ActionButton type="button" variant="empty" onClick={modalClose}>
            Cancel
          </ActionButton>
        </Actions>
      </FormElement>
    </Form>
  );
};

const typeOptions = Object.values(IssueType).map(type => ({
  value: type,
  label: IssueTypeCopy[type],
}));

const priorityOptions = Object.values(IssuePriority).map(priority => ({
  value: priority,
  label: IssuePriorityCopy[priority],
}));

const userOptions = project => project.map(user => ({ value: user.id, label: user.displayName }));

const renderType = ({ value: type }) => (
  <SelectItem>
    <IssueTypeIcon type={type} top={1} />
    <SelectItemLabel>{IssueTypeCopy[type]}</SelectItemLabel>
  </SelectItem>
);

const renderPriority = ({ value: priority }) => (
  <SelectItem>
    <IssuePriorityIcon priority={priority} top={1} />
    <SelectItemLabel>{IssuePriorityCopy[priority]}</SelectItemLabel>
  </SelectItem>
);

const renderUser = project => ({ value: userId, removeOptionValue }) => {
  const user = project.find(({ id }) => id === userId);

  return (
    <SelectItem
      key={user.id}
      withBottomMargin={!!removeOptionValue}
      onClick={() => removeOptionValue && removeOptionValue()}
    >
      <Avatar
        avatarUrl="https://pixlok.com/wp-content/uploads/2021/03/default-user-profile-picture.jpg"
        name={user.displayName}
        size={24}
      />
      <SelectItemLabel>{user.displayName}</SelectItemLabel>
      {removeOptionValue && <Icon type="close" top={2} />}
    </SelectItem>
  );
};

ProjectIssueCreate.propTypes = propTypes;

export default ProjectIssueCreate;
