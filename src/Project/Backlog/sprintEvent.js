const filterFeild = (list, id) => {
  if (id === '#backlog')
    return list.map((issue, index) => ({
      id: issue.id,
      position: index,
    }));

  return list.map((issue, index) => ({
    id: issue.id,
    position: index,
    boardId: issue.boardId,
  }));
};

const getFirstBoardId = (list, sprintId, boardName) => {
  if (sprintId !== '#backlog') {
    const sprintRes = list.sprints.filter(sprint => sprint.id === sprintId)[0];
    const boardId = sprintRes.boardDtoList.filter(board => board.name === boardName)[0].id;
    return boardId;
  }
  return null;
};

export const reorder = (list, id, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);

  result.splice(endIndex, 0, removed);

  const updatedPostion = filterFeild(result, id);
  return [
    {
      id,
      issuesList: updatedPostion,
    },
  ];
};

/**
 * Moves an item from one list to another list.
 */
export const move = (list, source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);
  const boardId = getFirstBoardId(
    list,
    droppableDestination.droppableId,
    removed.issuesStatusDto.name,
  );

  destClone.splice(droppableDestination.index, 0, { ...removed, boardId });

  const result = [];
  result.push({
    id: droppableSource.droppableId,
    issuesList: filterFeild(sourceClone, droppableSource.droppableId),
  });

  result.push({
    id: droppableDestination.droppableId,
    issuesList: filterFeild(destClone, droppableDestination.droppableId),
  });

  return result;
};

export const getList = (list, id) => {
  if (id === '#backlog') return [...list.backlog];

  const res = list.sprints.filter(sprint => sprint.id === id)[0];
  return res.issuesList !== undefined ? [...res.issuesList] : [];
};
