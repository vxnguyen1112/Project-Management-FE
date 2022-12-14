/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { useTable, useSortBy,useGlobalFilter } from 'react-table';
import { IssueTypeIcon, IssuePriorityIcon } from 'components';
import api from 'Services/api';
import { toast } from 'react-project-management';
import moment from 'moment';
import { GlobalFilter, Table } from './Styles';


const ListIssues = () => {
  const [listIssues, setListIssues] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    await api.get('/api/issues?project_id=1a27f30a-7703-4b62-bc1e-d7c3e94c15ae').then(
      data => {
        setListIssues(data);
      },
      error => {
        toast.error(error);
      },
    );
  };
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Start Date',
        accessor: 'startDate',
        Cell: ({ cell: { value } }) => {
          if (value) {
            return moment(value).format('lll');
          }
          return '------------------------------';
        },
      },
      {
        Header: 'Due date',
        accessor: 'dueDate',
        Cell: ({ cell: { value } }) => {
          if (value) {
            return moment(value).format('lll');
          }
          return '------------------------------';
        },
      },
      {
        Header: 'Priority',
        accessor: 'priority',
        Cell: ({ cell: { value } }) => {
          const variable = value || '3';
          return <IssuePriorityIcon priority={variable} top={-1} left={4} />;
        },
      },
      {
        Header: 'Type',
        accessor: 'issuesStatusDto',
        Cell: ({ cell: { value } }) => <IssueTypeIcon type="task" />,
      },
    ],
    [],
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow ,state, setGlobalFilter} = useTable(
    { columns, data: listIssues },
    useGlobalFilter,
    useSortBy,
    
  );

  const onClickRow = id => {
    console.log(id);
  };
  const { globalFilter } = state
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className="listproject">
      <div className="main">
        <p>Issues</p>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <Table className="styled-table" {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps([
                      {
                        style: {
                          minWidth: column.minWidth,
                          width: column.width,
                          padding: column.padding,
                          paddingLeft: column.paddingLeft,
                        },
                      },
                      column.getSortByToggleProps(),
                    ])}
                  >
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
                <tr {...row.getRowProps()} onClick={() => onClickRow(row.original.id)}>
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
