/* eslint-disable no-shadow */
/* eslint-disable react/react-in-jsx-scope */

import React, { useState } from 'react';
import { InputDebounced, Avatar } from 'components';
import styled from 'styled-components';
import { color, font } from 'react-project-management';
import { useAsyncDebounce } from 'react-table';

export const SearchInput = styled(InputDebounced)`
  margin-right: 18px;
  width: 160px;
`;
export const Type = styled.div`
  display: flex;
  align-items: center;
`;
export const AssigneeAvatar = styled(Avatar)`
  margin-left: -2px;
  box-shadow: 0 0 0 2px #fff;
`;
export const Username = styled.div`
  display: inline-block;
  text-align: center;
  padding-right: 12px;
  color: ${color.textDark};
  ${font.medium}
`;
export const User = styled.div`
  display: flex;
  align-items: center;
`;
export const Table = styled.table`
  /* &:tr td:first-child { width: 10px; } */
`;

export const GlobalFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter);
  const onChange = useAsyncDebounce(value => {
    setFilter(value || undefined);
  }, 1000);
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div style={{ display: 'flex' }}>
      <p
        style={{
          textAlign: 'center',
          fontStyle: 'italic',
          fontFamily: 'fantasy',
          color: 'black',
          fontSize: '15px',
          marginRight: '15px',
        }}
      >
        Search:
      </p>
      <input
        style={{ boxShadow: '-2px 2px 8px 0px rgb(0 0 0 / 30%)', borderRadius: '8px' }}
        value={value || ''}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
    </div>
  );
};
