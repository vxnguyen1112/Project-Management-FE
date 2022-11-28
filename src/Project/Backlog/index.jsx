import React from 'react';
import { Breadcrumbs } from 'components';
import { DragDropContext } from 'react-beautiful-dnd';
import { changeIssuesOrder, selectBacklog } from 'store/reducers/backlogSlice';
import { useSelector, useDispatch } from 'react-redux';
import { FormHeading } from '../ProjectSettings/Styles';
import BoardSprint from './Board/BoardSprint';
import BoardBacklog from './Board/BoardBacklog';

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: 0,
    border: '1px solid #EBECF0',
    // change background colour if dragging
    background: isDragging ? 'lightgreen' : '#fff',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? 'lightgrey' : 'lightgrey',
    padding: grid,
    width: '100%'
});

const Backlog = () => {
    const boards = useSelector(selectBacklog);
    const dispatch = useDispatch();

    const onDragEnd = (result) => {
        dispatch(changeIssuesOrder(result))
    }

    return (
        <div
            style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}>

            <Breadcrumbs items={['Projects', "singularity 1.0", 'Backlog']} />
            <FormHeading>Backlog</FormHeading>

            <DragDropContext onDragEnd={onDragEnd}>
                { boards.map(board => {
                    if(board.isBacklog) {
                        return (
                            <BoardBacklog
                                key={board.id}
                                droppableId={board.id}
                                boardState={board.issues}
                                boardName={board.name}
                                getListStyle={getListStyle}
                                getItemStyle={getItemStyle}
                            />
                        )
                    } 

                    return (
                        <BoardSprint
                            key={board.id}
                            droppableId={board.id}
                            boardState={board.issues}
                            boardName={board.name}
                            getListStyle={getListStyle}
                            getItemStyle={getItemStyle}
                        />
                    )
                })}
                
            </DragDropContext>            
        </div>
    );
    
}


export default Backlog;
