import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import { Filters, SearchInput } from './Styles';

const propTypes = {
  sprints: PropTypes.array.isRequired,
  defaultFilters: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  mergeFilters: PropTypes.func.isRequired,
};

const ProjectBoardFilters = ({ sprints, defaultFilters, filters, mergeFilters }) => {
  const { searchTerm, sprintId } = filters;

  return (
    <Filters data-testid="board-filters">
      <SearchInput icon="search" value={searchTerm} onChange={() => {}} />
      <Select
        value={sprints.filter(sprint => sprint.id === filters.sprintId)[0]}
        onChange={sprint => mergeFilters({ sprintId: sprint.id })}
        options={sprints}
      />
      {/* <Avatars>
        {projectUsers.map(user => (
          <AvatarIsActiveBorder key={user.id} isActive={userIds.includes(user.id)}>
            <StyledAvatar
              avatarUrl={user.avatarUrl}
              name={user.name}
              onClick={() => mergeFilters({ userIds: xor(userIds, [user.id]) })}
            />
          </AvatarIsActiveBorder>
        ))}
      </Avatars>
      <StyledButton
        variant="empty"
        isActive={myOnly}
        onClick={() => mergeFilters({ myOnly: !myOnly })}
      >
        Only My Issues
      </StyledButton>
      <StyledButton
        variant="empty"
        isActive={recent}
        onClick={() => mergeFilters({ recent: !recent })}
      >
        Recently Updated
      </StyledButton>
      {!areFiltersCleared && (
        <ClearAll onClick={() => mergeFilters(defaultFilters)}>Clear all</ClearAll>
      )} */}
    </Filters>
  );
};

ProjectBoardFilters.propTypes = propTypes;

export default ProjectBoardFilters;
