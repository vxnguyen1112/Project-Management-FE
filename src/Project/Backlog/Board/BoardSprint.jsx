import React, { useEffect, useState } from 'react';
import { uuid } from 'uuidv4';
import Select from 'react-select';
import api from 'Services/api';
import { store } from 'store';
import { Button } from 'components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { toast } from 'react-project-management';
import DropdownSelect from 'components/DropdownSelect';
import CustomStatus from 'Project/TestBoard/IssueDetails/CustomStatus';
import ModalCustom from 'components/ModalCustom/ModalCustom';
import Divider from '../Divider';
import './Board.css';

const addIssue = async newIssue => {
  const res = await api.post(`/api/issues`, JSON.stringify(newIssue));
  return res;
};

const deleteIssue = async issueId => {
  const res = await api.delete(`/api/issues/${issueId}`);
  return res;
};

const deleteSprint = async sprintId => {
  const res = await api.delete(`/api/sprints/${sprintId}`);
  return res;
};

const startSprint = async (projectId, sprintId) => {
  const res = await api.put(
    `/api/sprints/${sprintId}`,
    JSON.stringify({
      projectId,
      position: 1,
      status: 'STARTING',
    }),
  );
  return res;
};

const BoardSprint = props => {
  const {
    sprint,
    getListStyle,
    getItemStyle,
    setDoCreateIssue,
    setDoDeleteIssue,
    setDoDeleteSprint,
  } = props;
  const [isCreateIssue, setIsCreateIssue] = useState(false);
  const [issueContent, setIssueContent] = useState('');
  const [isOpenDeleteIssueModal, setIsOpenDeleteIssueModal] = useState(false);
  const [isOpenDeleteSprintModal, setIsOpenDeleteSprintModal] = useState(false);
  const [issueTypeList, setIssueTypeList] = useState([]);
  const [issueStatusList, setIssueStatusList] = useState([]);
  const [id, setId] = useState(null);
  const [selectedOption, setSelectedOption] = useState(issueTypeList[0]);
  const [isStartSprint, setIsStartSprint] = useState(false);
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
    getAllIssueType();
    getAllIssueStatus();
  }, []);

  const onCreateIssue = () => {
    if (issueContent.trim() === '') {
      toast.error('Vui lòng nhập tên issue');
    } else {
      const boardId = sprint.boardDtoList.filter(board => board.name === 'TO DO')[0].id;
      const issuesStatusId = issueStatusList.map(issueStatus => issueStatus.name === 'TO DO')[0].id;

      const body = {
        issueTypeId: selectedOption.id,
        name: issueContent,
        description: '',
        projectId,
        startDate: null,
        dueDate: null,
        estimatedHours: 0,
        priority: 0,
        issuesStatusId,
        doneRatio: 0,
        isPublic: true,
        organizationId,
        boardId,
      };

      addIssue(body)
        .then(res => {
          setDoCreateIssue(prev => !prev);
          toast.success('Create issue successfully!');
        })
        .catch(err => {
          toast.success(err);
        });
      setIsCreateIssue(false);
    }
  };

  const doStartSprint = sprintId => {
    startSprint(projectId, sprintId)
      .then(res => {
        setIsStartSprint(true);
        toast.success('Start sprint successfully!');
      })
      .catch(err => {
        toast.error(err);
      });
  };

  const doCompleteSprint = sprintId => {};

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
        setIsOpenDeleteIssueModal(true);
      },
    },
  ];

  const boardItems = [
    {
      id: uuid(),
      content: 'Edit sprint',
      callback: () => {},
    },
    {
      id: uuid(),
      content: 'Delete sprint',
      callback: () => {
        setIsOpenDeleteSprintModal(true);
      },
    },
  ];

  return (
    <React.Fragment>
      <Droppable droppableId={sprint.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
            className="droppable"
          >
            <details open>
              <summary className="collopse">
                {sprint.name}
                <div className="groupButton">
                  {sprint.status === 'UNSTART' ? (
                    <Button
                      type="submit"
                      variant={isStartSprint ? 'primary' : 'dark'}
                      className="btnSprint"
                      onClick={() => doStartSprint(sprint.id)}
                    >
                      {isStartSprint ? 'Complete sprint' : 'Start sprint'}
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="primary"
                      className="btnSprint"
                      onClick={() => doCompleteSprint(sprint.id)}
                    >
                      Complete sprint
                    </Button>
                  )}

                  <DropdownSelect onSelect={() => {}} items={boardItems} />
                </div>
              </summary>

              {sprint.issuesList !== undefined &&
                sprint.issuesList.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        className="issueArea"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
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
                            issueStatusName={item.issuesStatusDto.name}
                            updateIssue={() => {}}
                          />
                          <DropdownSelect onSelect={() => setId(item.id)} items={items} />
                        </div>
                      </div>
                    )}
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
                        onClick={() => {
                          setIssueContent('');
                          setIsCreateIssue(false);
                        }}
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

      {isOpenDeleteIssueModal && (
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
                toast.success(err);
              });
          }}
          setModalOpen={setIsOpenDeleteIssueModal}
        />
      )}

      {isOpenDeleteSprintModal && (
        <ModalCustom
          title={`Delete ${sprint.id}?`}
          content={[
            "You're about to permanently delete this issue, its comments and attachments, and all of its data.",
            "If you're not sure, you can resolve or close this issue instead.",
          ]}
          onConfirm={() => {
            deleteSprint(sprint.id)
              .then(res => {
                setDoDeleteSprint(prev => !prev);
                toast.success(`Delete ${sprint.id} succesfully`);
              })
              .catch(err => {
                toast.success(err);
              });
          }}
          setModalOpen={setIsOpenDeleteSprintModal}
        />
      )}
    </React.Fragment>
  );
};

export default BoardSprint;
