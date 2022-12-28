import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { isNil } from 'lodash';
import moment from 'moment';
import { InputDebounced } from 'components';
import { SectionTitle } from '../Styles';

const propTypes = {
  displayFieldName: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  issue: PropTypes.object.isRequired,
  updateIssue: PropTypes.func.isRequired,
};

const ProjectBoardIssueDetailsCalendar = ({ displayFieldName, fieldName, issue, updateIssue }) => {
  const [isClick, setIsClick] = useState(false);
  return (
    <Fragment>
      <SectionTitle>{displayFieldName}</SectionTitle>
      <InputDebounced
        placeholder={displayFieldName}
        value={isNil(issue[fieldName]) ? '' : moment(issue[fieldName]).format('ll')}
        onClick={() => setIsClick(!isClick)}
        onChange={() => {}}
      />
      {isClick && (
        <Calendar
          onChange={value => {
            updateIssue({ [fieldName]: value.toISOString() });
          }}
          value={new Date()}
        />
      )}
    </Fragment>
  );
};

ProjectBoardIssueDetailsCalendar.propTypes = propTypes;

export default ProjectBoardIssueDetailsCalendar;
