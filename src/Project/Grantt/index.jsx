import React, { useState, useEffect } from 'react';

import '../../../node_modules/@syncfusion/ej2-base/styles/material.css';
import '../../../node_modules/@syncfusion/ej2-buttons/styles/material.css';
import '../../../node_modules/@syncfusion/ej2-calendars/styles/material.css';
import '../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css';
import '../../../node_modules/@syncfusion/ej2-gantt/styles/material.css';
import '../../../node_modules/@syncfusion/ej2-grids/styles/material.css';
import '../../../node_modules/@syncfusion/ej2-inputs/styles/material.css';
import '../../../node_modules/@syncfusion/ej2-layouts/styles/material.css';
import '../../../node_modules/@syncfusion/ej2-lists/styles/material.css';
import '../../../node_modules/@syncfusion/ej2-navigations/styles/material.css';
import '../../../node_modules/@syncfusion/ej2-popups/styles/material.css';
import '../../../node_modules/@syncfusion/ej2-richtexteditor/styles/material.css';
import '../../../node_modules/@syncfusion/ej2-treegrid/styles/material.css';
import { GanttComponent, Inject, Edit } from '@syncfusion/ej2-react-gantt';
import useMergeState from 'hooks/mergeState';
import { store } from 'store';
import api from 'Services/api';
import Filters from 'Project/TestBoard/Filters';

const defaultFilters = {
  searchTerm: '',
  sprintId: null,
};

const taskFields = {
  id: 'id',
  name: 'name',
  startDate: 'startDate',
  endDate: 'endDate',
  progress: 'progress',
};

const editSettings = {
  allowTaskbarEditing: true,
};

const fetchSprints = res => {
  const sprints = [];

  res.sprints.forEach(sprint => {
    if (sprint.status === 'STARTING') {
      sprints.push({
        id: sprint.id,
        name: sprint.name,
        value: sprint.name,
        label: sprint.name,
      });
    }
  });

  sprints.sort((a, b) => a.name.localeCompare(b.name));

  return sprints;
};

const refactorIssues = (list, sprintId) => {
  const filteredSprint = list.sprints.filter(sprint => sprint.id === sprintId)[0];
  const filteredIssues = [];

  filteredSprint.issuesList.forEach(issue => {
    if (issue.startDate !== undefined && issue.dueDate !== undefined) {
      const { id, name, startDate, endDate } = issue;

      filteredIssues.push({
        id,
        name,
        startDate,
        endDate,
        progress: 50,
      });
    }
  });

  return filteredIssues;
};

// eslint-disable-next-line react/prefer-stateless-function
const Grantt = () => {
  const [filters, mergeFilters] = useMergeState(defaultFilters);
  const [sprints, setSprints] = useState([]);
  const [issues, setIssues] = useState([]);
  const { projectId } = store.getState().listproject;

  useEffect(() => {
    const getBoards = async () => {
      const res = await api.get(`/api/backlogs?project_id=${projectId}`);
      const fetchedSprint = fetchSprints(res);

      setSprints(fetchedSprint);

      if (filters.sprintId === null) {
        filters.sprintId = fetchedSprint[0].id;
      }

      const filteredIssues = refactorIssues(res, filters.sprintId);
      setIssues(filteredIssues);
    };

    getBoards();
  }, [filters]);
  return (
    <React.Fragment>
      <Filters
        sprints={sprints}
        defaultFilters={defaultFilters}
        filters={filters}
        mergeFilters={mergeFilters}
      />

      <GanttComponent dataSource={issues} taskFields={taskFields} editSettings={editSettings}>
        <Inject services={[Edit]} />
      </GanttComponent>
    </React.Fragment>
  );
};

export default Grantt;
