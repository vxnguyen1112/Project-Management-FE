import React, { useState } from 'react';
import { uuid } from 'uuidv4';
import Select from 'react-select';
import { Button } from 'components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { addIssue, deleteIssue, deleteSprint } from 'store/reducers/backlogSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-project-management';
import DropdownMenu from 'components/DropdownMenu';
import DropdownSelect from 'components/DropdownSelect';
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
    const {droppableId, boardState, boardName, getListStyle, getItemStyle} = props;
    const [isCreateIssue, setIsCreateIssue] = useState(false);
    const [issueContent, setIssueContent] = useState("")
    const [selectedOption, setSelectedOption] = useState(options[0]);
    const [isOpenDeleteIssueModal, setIsOpenDeleteIssueModal] = useState(false);
    const [isOpenDeleteSprintModal, setIsOpenDeleteSprintModal] = useState(false);
    const [id, setId] = useState(null);

    const onCreateIssue = () => {
        if (issueContent.trim() === "") {
            toast.error('Vui lòng nhập tên issue');
        } else {
            dispatch(addIssue({
                boardId: droppableId,
                issue: {
                    id: uuid(),
                    content: issueContent,
                    type: selectedOption.value
                }
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

    const issueStatus=['To do', 'In progress', 'Done'];
    const prefix="PBL6";

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
                                {boardName}
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

                            {boardState.map((item, index) => (
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
                                                    <img src="https://cdn-icons-png.flaticon.com/512/1484/1484902.png" alt=""/>
                                                </div>
                                                <div className="issueId">
                                                    <span>{`${prefix}-${index}`}</span>        
                                                </div>    
                                                <div className="issueContent">
                                                    <span>{item.content}</span>
                                                </div>
                                                <div className="issueStatusArea">
                                                    <DropdownMenu items={issueStatus}/>
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
                                                    options={options}/>
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
                        dispatch(deleteSprint(droppableId))
                    }}
                    setModalOpen={setIsOpenDeleteSprintModal} />}

        </React.Fragment>
    );
}

export default BoardSprint;