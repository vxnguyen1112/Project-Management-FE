import { createSlice } from '@reduxjs/toolkit';
import { uuid } from 'uuidv4';

const boards = [
    {
        id: uuid(),
        name: 'Sprint 1',
        isBacklog: false,
        status: 1,
        issues: [
            {
                id: uuid(),
                content: 'Code giao diện trang chủ',
                type: 'task'
            },
            {
                id: uuid(),
                content: 'Code giao diện đăng kí',
                type: 'task'
            },
            {
                id: uuid(),
                content: 'Thiết kê giao diện trang admin',
                type: 'task'
            },
        ]
    },
    {
        id: uuid(),
        name: 'Sprint 2',
        isBacklog: false,
        status: 1,
        issues: [
            {
                id: uuid(),
                content: 'Code giao diện trang thanh toán',
                type: 'task'
            },
            {
                id: uuid(),
                content: 'Code giao diện xem chi tiết đơn hàng',
                type: 'task'
            },
            {
                id: uuid(),
                content: 'Thiết kê giao diện trang thanh toán',
                type: 'task'
            },
        ]
    },
    {
        id: uuid(),
        name: 'Backlog',
        isBacklog: true,
        status: 1,
        issues:  [
            {
                id: uuid(),
                content: 'Thiết kế database',
                type: 'task'
            },
            {
                id: uuid(),
                content: 'Chuẩn bị môi trường phát triển',
                type: 'task'
            },
            {
                id: uuid(),
                content: 'Thiết kế giao diện đăng kí',
                type: 'task'
            },
            {
                id: uuid(),
                content: 'Thiết kế giao diện trang chủ',
                type: 'task'
            },
        ]
    }
]

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const getList = (list, id) => {
    const res = list.filter(board => board.id === id)[0];
    return [...res.issues];
};

const boardLength = boards.length;

export const backlogSlice = createSlice({
    name: 'backlog',
    initialState: {
        boards,
        boardLength 
    },
    reducers: {
        changeIssuesOrder: (state, action) => {
            const { source, destination } = action.payload;

            // dropped outside the list
            if (!destination) {
                return;
            }

            if (source.droppableId === destination.droppableId) {
                const items = reorder(
                    getList(state.boards, source.droppableId),
                    source.index,
                    destination.index
                );

                state.boards.forEach(board => {
                    if (board.id === source.droppableId) {
                        board.issues = items;
                    }
                })

            } else {
                const items = move(
                    getList(state.boards, source.droppableId),
                    getList(state.boards, destination.droppableId),
                    source,
                    destination
                );

                state.boards.forEach(board => {
                    if (board.id === source.droppableId) {
                        board.issues = items[source.droppableId];
                    }

                    if (board.id === destination.droppableId) {
                        board.issues = items[destination.droppableId];
                    }
                })
            }
        },
        addIssue: (state, action) => {
            const {boardId, issue} = action.payload;

            state.boards.forEach(board => {
                if(board.id === boardId) {
                    board.issues.push(issue);
                }
            })
        },
        deleteIssue: (state, action) => {
            const issueId = action.payload;

            state.boards.forEach(board => {
                board.issues = board.issues.filter(issue => issue.id !== issueId);
            })
        },
        addSprint: (state) => {
            state.boardLength += 1;

            const board = {
                id: uuid(),
                name: `Sprint ${state.boardLength - 1}`,
                isBacklog: false,
                status: 1,
                issues: []
            }

            state.boards.splice(state.boardLength - 2, 0, board);
        }
    }
})

export const { changeIssuesOrder, addIssue, addSprint, deleteIssue } = backlogSlice.actions;

export const selectBacklog = (state) => state.backlog.boards;

export default backlogSlice.reducer;