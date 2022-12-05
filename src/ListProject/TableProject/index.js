/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { useTable, useSortBy } from 'react-table';
import { toast } from 'react-project-management';
import api from 'Services/api';
import { InputDebounced}  from 'components';
import styled from 'styled-components';
import history from 'browserHistory';
import './styles.css';

const TableProject = () => {
  const SearchInput = styled(InputDebounced)`
    margin-right: 18px;
    width: 160px;
  `;
  const [listProject, setListProject] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    await api.get('/api/organizations/fbecadea-273c-48cb-bbbe-04ddaa12d0a7/projects').then(
      data => {
        setListProject(data);
      },
      error => {
        toast.error(error);
      },
    );
  };
  console.log(listProject);
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name', // accessor is the "key" in the data
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Domain',
        accessor: 'domain', // accessor is the "key" in the data
      },
      {
        Header: 'Public',
        accessor: 'isPublic',
        Cell: ({ cell: { value } }) => (
          <input type="checkbox" className="checkbox"  checked={value}/>
        ), // accessor is the "key" in the data
      },
      {
        Header: 'Status',
        accessor: 'projectStatus', // accessor is the "key" in the data
      },
    ],
    [],
  );
const onClickRow=()=>{
  history.push('/project');
}
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    { columns, data: listProject },
    useSortBy,
  );
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className="listproject">
      <div className="header" />
      <div className="main">
        <p style={{fontFamily: "CircularStdMedium",fontWeight:"normal"}}>Project</p>
        <SearchInput
          icon="search"
          // value={searchTerm}
          // onChange={value => mergeFilters({ searchTerm: value })}
        />
        <table className="styled-table" {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
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
                <tr {...row.getRowProps()}  onClick={onClickRow}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableProject;
