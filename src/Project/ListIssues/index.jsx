/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { useTable, useSortBy, useGlobalFilter } from 'react-table';
import { IssuePriorityIcon } from 'components';
import api from 'Services/api';
import { store } from 'store';
import { toast } from 'react-project-management';
import moment from 'moment';
import { GlobalFilter, Table } from './Styles';

const ListIssues = () => {
  const [listIssues, setListIssues] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    await api.get(`/api/issues?project_id=${store.getState().listproject.projectId}`).then(
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
        accessor: 'issuesTypeDto',
        Cell: ({ cell: { value } }) => {
          console.log(value);
          return <img src={value.urlIcon} alt="new" />;
        },
      },
    ],
    [],
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable({ columns, data: listIssues }, useGlobalFilter, useSortBy);

  const onClickRow = id => {
    console.log(id);
  };
  const { globalFilter } = state;
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className="listproject">
      <div className="main">
        <p style={{textAlign:"center",fontStyle:'italic',fontFamily:'fantasy',color:"#150707de",fontSize:"30px"}}>Issues</p>
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
