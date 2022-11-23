import React, { Component } from "react";

import "../../../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-calendars/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-gantt/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-grids/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-layouts/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-lists/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-navigations/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-popups/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-richtexteditor/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-treegrid/styles/material.css";
import { GanttComponent, Inject, Edit } from "@syncfusion/ej2-react-gantt";

const data = [
    {
        TaskID: 1,
        TaskName: "Project Initiation",
        StartDate: new Date("04/02/2019"),
        EndDate: new Date("04/21/2019"),
        subtasks: [
            {
                TaskID: 2,
                TaskName: "Identify Site location",
                StartDate: new Date("04/02/2019"),
                Duration: 4,
                Progress: 50
            },
            {
                TaskID: 3,
                TaskName: "Perform Soil test",
                StartDate: new Date("04/02/2019"),
                Duration: 4,
                Progress: 50,
                Predecessor: "2FS"
            },
            {
                TaskID: 4,
                TaskName: "Soil test approval",
                StartDate: new Date("04/02/2019"),
                Duration: 4,
                Progress: 50
            }
        ]
    },
    {
        TaskID: 5,
        TaskName: "Project Estimation",
        StartDate: new Date("04/02/2019"),
        EndDate: new Date("04/21/2019"),
        subtasks: [
            {
                TaskID: 6,
                TaskName: "Develop floor plan for estimation",
                StartDate: new Date("04/04/2019"),
                Duration: 3,
                Progress: 50
            },
            {
                TaskID: 7,
                TaskName: "List materials",
                StartDate: new Date("04/04/2019"),
                Duration: 3,
                Progress: 50
            },
            {
                TaskID: 8,
                TaskName: "Estimation approval",
                StartDate: new Date("04/04/2019"),
                Duration: 3,
                Progress: 50,
                Predecessor: "7SS"
            }
        ]
    }
];
const taskFields = {
    id: "TaskID",
    name: "TaskName",
    startDate: "StartDate",
    duration: "Duration",
    progress: "Progress",
    child: "subtasks",
    dependency: "Predecessor"
};

const editSettings = {
    allowTaskbarEditing: true
};

class Grantt extends Component {
    render() {
        return (
            <GanttComponent
                dataSource={data}
                taskFields={taskFields}
                editSettings={editSettings}
                height="800px"
            >
                <Inject services={[Edit]} />
            </GanttComponent>
        );
    }
}

export default Grantt;