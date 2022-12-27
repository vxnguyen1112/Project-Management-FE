import React, { useState, Fragment } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { InputDebounced } from 'components';
import { isNil } from 'lodash';
import moment from 'moment';
import { SectionTitle } from './Styles';

const CalendarCustom = ({ displayFieldName, val, setValue }) => {
  const [isClick, setIsClick] = useState(false);
  return (
    <Fragment>
      <SectionTitle>{displayFieldName}</SectionTitle>
      <InputDebounced
        placeholder={displayFieldName}
        value={isNil(val) ? '' : moment(val).format('ll')}
        onClick={() => setIsClick(!isClick)}
        onChange={() => {}}
      />
      {isClick && (
        <Calendar
          onChange={value => {
            setValue(value.toISOString());
          }}
          value={new Date()}
        />
      )}
    </Fragment>
  );
};

export default CalendarCustom;
