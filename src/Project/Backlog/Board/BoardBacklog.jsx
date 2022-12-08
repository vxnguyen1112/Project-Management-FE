import React, { useState, useEffect } from 'react';
import { uuid } from 'uuidv4';
import Select from 'react-select';
import api from 'Services/api'; 
import { Button } from 'components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
// import { addIssue, addSprint, deleteIssue } from 'store/reducers/backlogSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-project-management';
import DropdownSelect from 'components/DropdownSelect';
import ModalCustom from 'components/ModalCustom/ModalCustom';
import CustomStatus from 'Project/Board/IssueDetails/CustomStatus';
import Divider from '../Divider';
import "./Board.css";

const addIssue = async (newIssue) => {
    const res = await api.post(`/api/issues`, JSON.stringify(newIssue));
    return res;
}

const deleteIssue = async (issueId) => {
    const res = await api.delete(`/api/issues/${issueId}`);
    return res;
}

const addSprint = async (newSprint) => {
    const res = await api.post(`/api/sprints`, JSON.stringify(newSprint));
    return res;
}



const BoardBacklog = (props) => {
    const dispatch = useDispatch();
    const {droppableId, backlog, numSprint, getListStyle, getItemStyle, 
        setDoCreateIssue, setDoDeleteIssue, setDoCreateSprint} = props;
    const [isCreateIssue, setIsCreateIssue] = useState(false);
    const [issueContent, setIssueContent] = useState("")
    
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [id, setId] = useState(null);
    const [issueTypeList, setIssueTypeList] = useState([]);
    const [issueStatusList, setIssueStatusList] = useState([]);
    const [selectedOption, setSelectedOption] = useState(issueTypeList[0]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        const getAllIssueType = async () => {
            const organizationId = 'fbecadea-273c-48cb-bbbe-04ddaa12d0a7';
            const res = await api.get(`/api/issues-types?organizationId=${organizationId}`);
            setIssueTypeList(res.map((issueType) => ({
                value: issueType.name,
                label: issueType.name,
                ...issueType
            })));
        };

        const getAllIssueStatus = async () => {
            const organizationId = 'fbecadea-273c-48cb-bbbe-04ddaa12d0a7';
            const res = await api.get(`/api/issues-status?organizationId=${organizationId}`);
            setIssueStatusList(res.map((issueType) => ({
                value: issueType.name,
                label: issueType.name,
                ...issueType
            })));
        };
        getAllIssueType();
        getAllIssueStatus();
    }, []);

    const onCreateIssue = () => {
        if (issueContent.trim() === "") {
            toast.error('Vui lòng nhập tên issue');
        } else {
            console.log(selectedOption);
            addIssue({
                issueTypeId: selectedOption.id,
                name: issueContent, 
                description: issueContent,
                projectId: "1a27f30a-7703-4b62-bc1e-d7c3e94c15ae",
                issuesStatusId: "a3481f27-53d6-41d1-88f2-97a2cf72e2c9",
                isPublic: true,
                organizationId: "341a1840-273d-4f8b-8565-c8c4029fe15d"
            })
            .then((res) => {
                console.log(res);
                setDoCreateIssue(prev => !prev);
            })
            .catch((err) => {
                console.log(err);
            })
            setIsCreateIssue(false);
        }
        
    }

    const onCreateSprint = () => {
        const newSprint = {
            projectId: "1a27f30a-7703-4b62-bc1e-d7c3e94c15ae",
            name: `Sprint ${numSprint + 1}`,
            description: `This is sprint ${numSprint + 1}`,
            position: 1,
            status: "UNSTART"
          }
          console.log(newSprint);
        addSprint(newSprint)
        .then((res) => {
            console.log(res);
            setDoCreateSprint(prev => !prev);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const items = [
        {
            id: uuid(),
            content: 'Edit issue',
            callback: () => {}
        },
        {
            id: uuid(),
            content: 'Delete issue',
            callback: () => {
                setIsOpenDeleteModal(true)
            }
        }
    ]

    const issueStatus = {
        status: 'todo',
    };

    const updateIssueStatus = status => {
        console.log(status);
        issueStatus.status = status;
    }


    return (
        <React.Fragment>
            <Droppable droppableId={droppableId}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                        className="droppable">

                        <details open>
                            <summary className="collopse">
                                Backlog
                                <div className='groupButton'>
                                    <Button 
                                        type="submit" 
                                        variant="primary" 
                                        onClick={onCreateSprint}>
                                        Create sprint
                                    </Button>
                                </div>
                            </summary>

                            {backlog.map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            className="issueArea"
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}>
                                                <div className="issueTypeIcon">
                                                    <img src={item.issuesTypeDto.urlIcon} alt=""/>
                                                </div>
                                                <div className="issueId">
                                                    <span>{item.issuesKey}</span>    
                                                </div>    
                                                <div className="issueContent">
                                                    <span>{item.name}</span>
                                                </div>
                                                <div className="issueStatusArea">
                                                    <CustomStatus issue={issueStatus} updateIssue={updateIssueStatus} />
                                                    <DropdownSelect onSelect={() => setId(item.id)} items={items}/>
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
                                { isCreateIssue &&
                                    <div className="createIssueGroupInput">
                                        <div className="createIssueGroupInputWrapper">
                                            <div className="createIssueSelect">
                                            <Select 
                                                defaultValue={selectedOption}
                                                onChange={setSelectedOption}
                                                options={issueTypeList}/>
                                            </div>
                                            <input 
                                                type="text"
                                                autoFocus
                                                value={issueContent}
                                                onChange={(e) => setIssueContent(e.target.value)}
                                                className="createIssueInput" 
                                            />
                                        </div> 
                                        <div className="createIssueGroupButton">
                                            <Button 
                                                type="submit" 
                                                variant="primary" 
                                                className="btn btnCreateIssue"
                                                onClick={onCreateIssue}>
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
                                    </div>}
                            </div>
                        </details>
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

            <Divider/>

            {isOpenDeleteModal && 
                <ModalCustom 
                    title="Delete TES-20?"
                    content={["You're about to permanently delete this issue, its comments and attachments, and all of its data.",
                            "If you're not sure, you can resolve or close this issue instead."]} 
                    onConfirm={() => {
                        deleteIssue(id)
                        .then((res) => {
                            console.log(res);
                            setDoDeleteIssue(prev => !prev);
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                    }}
                    setModalOpen={setIsOpenDeleteModal} />}
        </React.Fragment>
    );
}

export default BoardBacklog;