import React, { useState } from 'react';
import { uuid } from 'uuidv4';
import Select from 'react-select';
import api from 'Services/api';
import { store } from 'store';
import { Button, Modal } from 'components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { toast } from 'react-project-management';
import DropdownSelect from 'components/DropdownSelect';
import ModalCustom from 'components/ModalCustom/ModalCustom';
import CustomStatus from 'Project/TestBoard/IssueDetails/CustomStatus';
import { useRouteMatch, useHistory } from 'react-router-dom';
import Divider from '../Divider';
import './Board.css';

const statusMap = {
  todo: 'TO DO',
  inprogress: 'IN PROGRESS',
  done: 'DONE',
};

const addIssue = async newIssue => {
  const res = await api.post(`/api/issues`, JSON.stringify(newIssue));
  return res;
};

const deleteIssue = async issueId => {
  const res = await api.delete(`/api/issues/${issueId}`);
  return res;
};

const addSprint = async newSprint => {
  const res = await api.post(`/api/sprints`, JSON.stringify(newSprint));
  return res;
};

const BoardBacklog = props => {
  const {
    droppableId,
    backlog,
    members,
    issueTypeList,
    issueStatusList,
    numSprint,
    getListStyle,
    getItemStyle,
    setDoCreateIssue,
    setDoDeleteIssue,
    setDoCreateSprint,
  } = props;

  const match = useRouteMatch();
  const history = useHistory();
  const [isCreateIssue, setIsCreateIssue] = useState(false);
  const [issueContent, setIssueContent] = useState('');
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [id, setId] = useState(null);
  const [selectedOption, setSelectedOption] = useState(issueTypeList[0]);
  const { organizationId } = store.getState().auth.user;
  const { projectId } = store.getState().listproject;

  const onCreateIssue = async () => {
    if (issueContent.trim() === '') {
      toast.error('Vui lòng nhập tên issue');
    } else {
      const issuesStatusId = issueStatusList.filter(issueStatus => issueStatus.name === 'TO DO')[0]
        .id;

      const body = {
        issueTypeId: selectedOption.id,
        name: issueContent,
        description: issueContent,
        projectId,
        issuesStatusId,
        isPublic: true,
        organizationId,
      };

      try {
        const res = await addIssue(body);
        setDoCreateIssue(prev => !prev);
        toast.success('Create issue successfully');
      } catch (err) {
        toast.err(err);
      }
      setIssueContent('');
      setIsCreateIssue(false);
    }
  };

  const onCreateIssueByKeyPress = async e => {
    if (e.key === 'Enter') {
      await onCreateIssue();
    }
  };

  const onCreateSprint = () => {
    const newSprint = {
      projectId,
      name: 'Sprint',
      description: 'This is sprint',
      position: numSprint + 1,
      status: 'UNSTART',
    };

    addSprint(newSprint)
      .then(res => {
        toast.success('Create sprint succesfully');
        setDoCreateSprint(prev => !prev);
      })
      .catch(err => {
        toast.error(err);
      });
  };

  const items = [
    {
      id: uuid(),
      content: 'Edit issue',
      callback: () => {},
    },
    {
      id: uuid(),
      content: 'Delete issue',
      callback: () => {
        setIsOpenDeleteModal(true);
      },
    },
  ];

  const viewIssueDetail = itemId => {
    history.push(`${match.url}/issues/${itemId}`);
  };

  return (
    <React.Fragment>
      <Droppable droppableId={droppableId}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
            className="droppable"
          >
            <details open>
              <summary className="collopse">
                Backlog
                <div className="groupButton">
                  <Button type="submit" variant="primary" onClick={onCreateSprint}>
                    Create sprint
                  </Button>
                </div>
              </summary>

              {backlog.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => {
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const [hover, setHover] = useState(false);
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const [issue, setIssue] = useState(item);

                    const updateIssueStatus = obj => {
                      const statusName = statusMap[obj.status];
                      const status = issueStatusList.filter(
                        issueStatus => issueStatus.name === statusName,
                      )[0];
                      console.log(status);
                      setIssue(prev => ({
                        ...prev,
                        issuesStatusDto: status,
                      }));
                    };

                    return (
                      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                      <div
                        className="issueArea"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                        onClick={() => viewIssueDetail(item.id)}
                        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                      >
                        <div className="issueTypeIcon">
                          <img src={item.issuesTypeDto.urlIcon} alt="" />
                        </div>
                        <div className="issueId">
                          <span>{item.issuesKey}</span>
                        </div>
                        <div className="issueContent">
                          <span>{item.name}</span>
                        </div>
                        <div className="issueStatusArea">
                          <CustomStatus
                            issueStatusName={issue.issuesStatusDto.name}
                            updateIssue={obj => {
                              updateIssueStatus(obj);
                            }}
                          />
                          {!hover && <div className="dropdown" />}

                          {hover && (
                            <DropdownSelect onSelect={() => setId(item.id)} items={items} />
                          )}
                        </div>
                      </div>
                    );
                  }}
                </Draggable>
              ))}

              <div className="createIssueArea">
                <span
                  aria-hidden="true"
                  className={isCreateIssue ? 'hidden' : undefined}
                  onClick={() => setIsCreateIssue(true)}
                >
                  + Create issue
                </span>
                {isCreateIssue && (
                  <div className="createIssueGroupInput">
                    <div className="createIssueGroupInputWrapper">
                      <div className="createIssueSelect">
                        <Select
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={issueTypeList}
                        />
                      </div>
                      <input
                        type="text"
                        autoFocus
                        value={issueContent}
                        onChange={e => setIssueContent(e.target.value)}
                        className="createIssueInput"
                        onKeyPress={onCreateIssueByKeyPress}
                      />
                    </div>
                    <div className="createIssueGroupButton">
                      <Button
                        type="submit"
                        variant="primary"
                        className="btn btnCreateIssue"
                        onClick={onCreateIssue}
                      >
                        Create Issue
                      </Button>
                      <Button
                        type="button"
                        variant="empty"
                        className="btn"
                        onClick={() => setIsCreateIssue(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </details>
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Divider />

      {isOpenDeleteModal && (
        <ModalCustom
          title={`Delete ${id}?`}
          content={[
            "You're about to permanently delete this issue, its comments and attachments, and all of its data.",
            "If you're not sure, you can resolve or close this issue instead.",
          ]}
          onConfirm={() => {
            deleteIssue(id)
              .then(res => {
                setDoDeleteIssue(prev => !prev);
                toast.success(`Delete ${id} succesfully`);
              })
              .catch(err => {
                toast.error(err);
              });
          }}
          setModalOpen={setIsOpenDeleteModal}
        />
      )}
    </React.Fragment>
  );
};

export default BoardBacklog;
