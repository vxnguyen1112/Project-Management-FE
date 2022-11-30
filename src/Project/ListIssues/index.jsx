/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { useTable, useSortBy } from 'react-table';
import { IssueTypeIcon } from 'components';
import { User, Username, SearchInput, AssigneeAvatar,Table } from './Styles';

const ListIssues = () => {
  const data = React.useMemo(
    () => [
      {
        col1: 'bug',
        col2: '27',
        col3: 'https://i.ibb.co/6RJ5hq6/gaben.jpg',
        col4: 'oke',
      },
      {
        col1: 'story',
        col2: '30',
        col3: 'https://i.ibb.co/6RJ5hq6/gaben.jpg',
        col4: 'oke',
      },
      {
        col1: 'task',
        col2: '23',
        col3: 'https://i.ibb.co/6RJ5hq6/gaben.jpg',
        col4: 'oke',
      },
    ],
    [],
  );
  const columns = React.useMemo(
    () => [
      {
        Header: 'Type',
        accessor: 'col1',
        Cell: ({ cell: { value } }) => <IssueTypeIcon type={value} />,
        width:50,
        minWidth:5,
        padding:0,
        paddingLeft:5},
      {
        Header: 'Key',
        accessor: 'col2',
        width:50,
        minWidth:5,
        padding:0,
        paddingLeft:5
      },
      {
        Header: 'Assignee',
        accessor: 'col3',
        Cell: ({ cell: { value } }) => (
          <User>
            <AssigneeAvatar size={24} avatarUrl={value} />
            <Username>No one</Username>
          </User>
        ),
      },
      {
        Header: 'Reporter',
        accessor: 'col4',
      },
    ],
    [],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    { columns, data },
    useSortBy,
  );

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className="listproject">
      <div className="main">
        <p>Issues</p>
        <SearchInput
          icon="search"
          // value={searchTerm}
          // onChange={value => mergeFilters({ searchTerm: value })}
        />
        <Table className="styled-table" {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps([{
                    style: {minWidth: column.minWidth,width: column.width ,padding:column.padding,paddingLeft:column.paddingLeft}
                    },column.getSortByToggleProps()])} >
                    {column.render('Header')}
                    <span>{column.isSorted ? (column.isSortedDesc ? '🔽' : '🔼') : ''}</span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
export default ListIssues;
