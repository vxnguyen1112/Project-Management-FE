import React, { useState } from 'react';
import { uuid } from 'uuidv4';
import Select from 'react-select';
import { Button } from 'components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { addIssue, addSprint, deleteIssue } from 'store/reducers/backlogSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-project-management';
import DropdownSelect from 'components/DropdownSelect';
import DropdownMenu from 'components/DropdownMenu';
import ModalCustom from 'components/ModalCustom/ModalCustom';
import Divider from '../Divider';
import "./Board.css";

const options = [
    { value: 'task', label: 'Task' },
    { value: 'bug', label: 'Bug' },
    { value: 'error', label: 'Error' }
]

const BoardBacklog = (props) => {
    const dispatch = useDispatch();
    const {droppableId, boardState, getListStyle, getItemStyle} = props;
    const [isCreateIssue, setIsCreateIssue] = useState(false);
    const [issueContent, setIssueContent] = useState("")
    const [selectedOption, setSelectedOption] = useState(options[0]);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
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

    const onCreateSprint = () => {
        dispatch(addSprint());
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
                        dispatch(deleteIssue(id))
                    }}
                    setModalOpen={setIsOpenDeleteModal} />}
        </React.Fragment>
    );
}

export default BoardBacklog;