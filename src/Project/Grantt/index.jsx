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
import {
  GanttComponent,
  Inject,
  Edit,
  DayMarkers,
  EventMarkersDirective,
  EventMarkerDirective,
} from '@syncfusion/ej2-react-gantt';
import useMergeState from 'hooks/mergeState';
import { store } from 'store';
import api from 'Services/api';
import { Breadcrumbs } from 'components';
import { FormHeading } from 'Project/ProjectSettings/Styles';
import Filters from 'Project/TestBoard/Filters';
import Header from './Header';

const defaultFilters = {
  searchTerm: '',
  sprintId: null,
};

const taskFields = {
  id: 'id',
  name: 'name',
  resourceInfo: 'assignee',
  startDate: 'startDate',
  endDate: 'endDate',
  progress: 'progress',
};

const columns = [
  { field: 'id', headerText: 'ID' },
  { field: 'name', headerText: 'Name' },
  { field: 'assignee', headerText: 'Assignee' },
  { field: 'startDate', headerText: 'Start Date' },
  { field: 'endDate', headerText: 'End Date' },
  { field: 'progress', headerText: 'Progress' },
];

const resourceFields = {
  id: 'resourceId',
  name: 'resourceName',
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

const getDisplayName = (members, memberId) => {
  const res = members.findIndex(member => member.id === memberId);
  return res;
};

const refactorIssues = (list, members, sprintId) => {
  const filteredSprint = list.sprints.filter(sprint => sprint.id === sprintId)[0];
  const filteredIssues = [];

  filteredSprint.issuesList.forEach(issue => {
    if (issue.startDate !== undefined && issue.dueDate !== undefined) {
      const { issuesKey, name, startDate, dueDate, doneRatio, assignMemberId } = issue;
      const index = getDisplayName(members, assignMemberId);
      console.log(index);

      filteredIssues.push({
        id: issuesKey,
        name,
        startDate: new Date(startDate),
        endDate: new Date(dueDate),
        progress: doneRatio,
        assignee: [index],
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
  const [resources, setResources] = useState([]);
  const { projectId } = store.getState().listproject;

  useEffect(() => {
    const getBoards = async () => {
      const members = await api.get(`/api/members/projects/${projectId}/search`);
      const mapedMember = members.map((member, index) => ({
        resourceId: index,
        resourceName: member.displayName,
      }));
      setResources(mapedMember);
      const res = await api.get(`/api/backlogs?project_id=${projectId}`);
      console.log(res);
      const fetchedSprint = fetchSprints(res);

      setSprints(fetchedSprint);

      if (filters.sprintId === null) {
        filters.sprintId = fetchedSprint[0].id;
      }

      const filteredIssues = await refactorIssues(res, members, filters.sprintId);
      setIssues(filteredIssues);
    };

    getBoards();
  }, [filters]);
  return (
    <React.Fragment>
      <Breadcrumbs items={['Projects', 'Grantt']} />
      <Header />
      <Filters
        sprints={sprints}
        defaultFilters={defaultFilters}
        filters={filters}
        mergeFilters={mergeFilters}
      />
      <div style={{ marginTop: 20 }} />

      <GanttComponent
        dataSource={issues}
        taskFields={taskFields}
        editSettings={editSettings}
        resourceFields={resourceFields}
        resources={resources}
        columns={columns}
      >
        <EventMarkersDirective>
          <EventMarkerDirective day={new Date()} cssClass="e-custom-event-marker" />
        </EventMarkersDirective>
        <Inject services={[Edit, DayMarkers]} />
      </GanttComponent>
    </React.Fragment>
  );
};

export default Grantt;
