import React from 'react';

import '../../../node_modules/@syncfusion/ej2-base/styles/material.css';
import '../../../node_modules/@syncfusion/ej2-buttons/styles/material.css';
import '../../../node_modules/@syncfusion/ej2-lists/styles/material.css';
import '../../../node_modules/@syncfusion/ej2-inputs/styles/material.css';
import '../../../node_modules/@syncfusion/ej2-popups/styles/material.css';
import '../../../node_modules/@syncfusion/ej2-react-calendars/styles/material.css';

import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';

const DatetimePicker = () => {
  return <DateTimePickerComponent id="datetimepicker" />;
};

export default DatetimePicker;
