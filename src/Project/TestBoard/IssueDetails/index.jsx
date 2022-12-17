import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from 'Services/api';
import { CopyLinkButton, Button, AboutTooltip } from 'components';
import CustomStatus from 'Project/TestBoard/IssueDetails/CustomStatus';
import Divider from 'Project/Backlog/Divider';
import { toast } from 'react-project-management';
import Type from './Type';
import Delete from './Delete';
import Title from './Title';
import Description from './Description';
import AssigneesReporter from './AssigneesReporter';
import Priority from './Priority';
import EstimateTracking from './EstimateTracking';
import Calendar from './Calendar';
import { TopActions, TopActionsRight, Content, Left, Right } from './Styles';

const propTypes = {
  issueId: PropTypes.string.isRequired,
  projectUsers: PropTypes.array.isRequired,
  fetchProject: PropTypes.func.isRequired,
  updateLocalProjectIssues: PropTypes.func.isRequired,
  modalClose: PropTypes.func.isRequired,
};

const statusMap = {
  todo: 'TO DO',
  inprogress: 'IN PROGRESS',
  done: 'DONE',
};

const updateIssueDetail = async (issueId, issue, modalClose) => {
  const { issuesStatusDto, issuesTypeDto, ...rest } = issue;
  const updatedIssue = { ...rest, issueStatusId: issuesStatusDto.id, issueTypeId: issuesTypeDto.id };
  console.log(updatedIssue);
  try {
    const res = await api.put(`/api/issues/${issueId}`, updatedIssue);
    console.log(res);
    modalClose();
    toast.success('Update issue successfully');
  } catch (err) {
    toast.success(err);
  }
};

const ProjectBoardIssueDetails = ({ issueId, projectUsers, fetchProject, modalClose }) => {
  const [issue, setIssue] = useState();
  const [issueStatusList, setIssueStatusList] = useState([]);

  const updateIssue = updatedFields => {
    const feildName = Object.keys(updatedFields)[0];

    setIssue(prev => ({
      ...prev,
      [feildName]: updatedFields[feildName],
    }));
  };

  const updateIssueStatus = obj => {
    const statusName = statusMap[obj.status];
    const status = issueStatusList.filter(issueStatus => issueStatus.name === statusName)[0];

    setIssue(prev => ({
      ...prev,
      issuesStatusDto: status,
    }));
  };

  useEffect(() => {
    const getIssueDetail = async () => {
      const res = await api.get(`/api/issues/${issueId}`);
      setIssue(res);
    };

    const getAllIssueStatus = async () => {
      const organizationId = 'fbecadea-273c-48cb-bbbe-04ddaa12d0a7';
      const res = await api.get(`/api/issues-status?organizationId=${organizationId}`);
      setIssueStatusList(res);
    };
    getIssueDetail();
    getAllIssueStatus();
  }, []);

  return (
    <Fragment>
      {issue !== undefined && (
        <React.Fragment>
          <TopActions>
            {console.log(issue)}
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
            </Left>
            <Right>
              <CustomStatus
                issueStatusName={issue.issuesStatusDto.name}
                updateIssue={obj => {
                  updateIssueStatus(obj);
                }}
              />
              <AssigneesReporter
                issue={issue}
                updateIssue={updateIssue}
                projectUsers={projectUsers}
              />
              <Priority issue={issue} updateIssue={updateIssue} />
              <EstimateTracking issue={issue} updateIssue={updateIssue} />
              <Calendar
                issue={issue}
                updateIssue={updateIssue}
                displayFieldName="Start date"
                fieldName="startDate"
              />
              <Calendar
                issue={issue}
                updateIssue={updateIssue}
                displayFieldName="Due date"
                fieldName="dueDate"
              />
              <Divider />
              <Button
                type="submit"
                variant="primary"
                onClick={() => updateIssueDetail(issueId, issue, modalClose)}
              >
                Create sprint
              </Button>
            </Right>
          </Content>
        </React.Fragment>
      )}
    </Fragment>
  );
};

ProjectBoardIssueDetails.propTypes = propTypes;

export default ProjectBoardIssueDetails;
