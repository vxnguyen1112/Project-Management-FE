import React, { useEffect, useState } from 'react';
import { uuid } from 'uuidv4';
import Select from 'react-select';
import api from 'Services/api'; 
import { Button } from 'components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { addIssue, deleteIssue, deleteSprint } from 'store/reducers/backlogSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-project-management';
import DropdownSelect from 'components/DropdownSelect';
import CustomStatus from 'Project/Board/IssueDetails/CustomStatus';
import ModalCustom from 'components/ModalCustom/ModalCustom';
import Divider from '../Divider';
import "./Board.css";

const options = [
    { value: 'task', label: 'Task', linkImage: 'https://cdn-icons-png.flaticon.com/512/906/906334.png' },
    { value: 'bug', label: 'Bug', linkImage: 'https://cdn-icons-png.flaticon.com/512/785/785104.png' },
    { value: 'error', label: 'Error',linkImage: 'https://cdn0.iconfinder.com/data/icons/shift-interfaces/32/Error-512.png' },
    { value: 'story', label: 'Story',linkImage: 'https://cdn-icons-png.flaticon.com/512/1484/1484902.png' },
]

const BoardSprint = (props) => {
    const dispatch = useDispatch();
    const {sprint, getListStyle, getItemStyle} = props;
    const [isCreateIssue, setIsCreateIssue] = useState(false);
    const [issueContent, setIssueContent] = useState("")
    const [selectedOption, setSelectedOption] = useState(options[0]);
    const [isOpenDeleteIssueModal, setIsOpenDeleteIssueModal] = useState(false);
    const [isOpenDeleteSprintModal, setIsOpenDeleteSprintModal] = useState(false);
    const [issueTypeList, setIssueTypeList] = useState([]);
    const [id, setId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const organizationId = 'fbecadea-273c-48cb-bbbe-04ddaa12d0a7';
            const res = await api.get(`/api/issues-types?organizationId=${organizationId}`);
            setIssueTypeList(res.map((issueType) => ({
                value: issueType.name,
                label: issueType.name,
                ...issueType
            })));
        };
        fetchData();
    }, []);

    const onCreateIssue = () => {
        if (issueContent.trim() === "") {
            toast.error('Vui lòng nhập tên issue');
        } else {
            dispatch(addIssue({
                issueTypeId: selectedOption.id,
                name: issueContent,
                description: "",
                projectId: "765cb983-af6f-47d4-b9cd-845e2ac0c7f4",
                startDate: null,
                dueDate: null,
                estimatedHours: 0,
                priority:  0,
                issuesStatusId: "a3481f27-53d6-41d1-88f2-97a2cf72e2c9",
                doneRatio: 0,
                isPublic: true,
                organizationId: "341a1840-273d-4f8b-8565-c8c4029fe15d",
                boardId: sprint.id
            }))
            setIsCreateIssue(false);
        }
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
                setIsOpenDeleteIssueModal(true)
            }
        }
    ]

    const boardItems = [
        {
            id: uuid(),
            content: 'Edit sprint',
            callback: () => {}
        },
        {
            id: uuid(),
            content: 'Delete sprint',
            callback: () => {
                setIsOpenDeleteSprintModal(true)
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
            <Droppable droppableId={sprint.id}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                        className="droppable">

                        <details open>
                            <summary className="collopse">
                                {sprint.name}
                                <div className='groupButton'>
                                    <Button 
                                        type="submit" 
                                        variant="primary" 
                                        className="btnCreateBacklog">
                                        Start sprint
                                    </Button>

                                    <DropdownSelect onSelect={() => {}} items={boardItems}/>
                                </div>
                            </summary>

                            {sprint.issuesList !== undefined && sprint.issuesList.map((item, index) => (
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
                                                onClick={() => {
                                                    setIssueContent("")
                                                    setIsCreateIssue(false)
                                                }}
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

            {isOpenDeleteIssueModal && 
                <ModalCustom 
                    title="Delete TES-20?"
                    content={["You're about to permanently delete this issue, its comments and attachments, and all of its data.",
                            "If you're not sure, you can resolve or close this issue instead."]} 
                    onConfirm={() => {
                        dispatch(deleteIssue(id))
                    }}
                    setModalOpen={setIsOpenDeleteIssueModal} />}

            { isOpenDeleteSprintModal && 
                <ModalCustom 
                    title="Delete TES-20?"
                    content={["You're about to permanently delete this issue, its comments and attachments, and all of its data.",
                            "If you're not sure, you can resolve or close this issue instead."]} 
                    onConfirm={() => {
                        dispatch(deleteSprint(sprint.id))
                    }}
                    setModalOpen={setIsOpenDeleteSprintModal} />}

        </React.Fragment>
    );
}

export default BoardSprint;