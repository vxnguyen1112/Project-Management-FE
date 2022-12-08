const filterFeild = (list, id) => {
    if (id === "#backlog")
        return list.map((issue, index) => ({
            id: issue.id,
            position: index
        }))

    return list.map((issue, index) => ({
        id: issue.id,
        position: index,
        boardId: issue.boardId
    }));
}

const getFirstBoardId = (list, sprintId) => {
    if(sprintId !== "#backlog") {
        const res = list.sprints.filter(sprint => sprint.id === sprintId)[0];
        return res.boardIds[0]; 
    }
    return null;
} 

export const reorder = (list, id, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);

    result.splice(endIndex, 0, removed);
    console.log(startIndex, endIndex);

    const updatedPostion = filterFeild(result, id);
    return [
        {
            id,
            issuesList: updatedPostion
        }
    ];
};

/**
 * Moves an item from one list to another list.
 */
export const move = (list, source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    console.log(removed);
    const boardId = getFirstBoardId(list, droppableDestination.droppableId);

    destClone.splice(droppableDestination.index, 0, {boardId, ...removed});

    const result = [];
    result.push({
        id: droppableSource.droppableId,
        issuesList: filterFeild(sourceClone, droppableSource.droppableId)
    })

    result.push({
        id: droppableDestination.droppableId,
        issuesList: filterFeild(destClone, droppableDestination.droppableId)
    })

    return result;
};

export const getList = (list, id) => {
    if(id === '#backlog') return [...list.backlog];

    const res = list.sprints.filter(sprint => sprint.id === id)[0];
    return [...res.issuesList];
};


