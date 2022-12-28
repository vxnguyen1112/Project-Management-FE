/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { useTable, useSortBy, useAsyncDebounce, useGlobalFilter } from 'react-table';
import { store } from 'store';
import { toast } from 'react-project-management';
import { Button, Icon } from 'components';
import ModalCustom from 'components/ModalCustom/ModalCustom';
import history from 'browserHistory';
import api from 'Services/api';

const ListMemberInOrganition = () => {
  const GlobalFilter = ({ filter, setFilter }) => {
    const [value, setValue] = useState(filter);
    const onChange = useAsyncDebounce(value => {
      setFilter(value || undefined);
    }, 1000);
    return (
      <div className="wrapper">
        <img
          className="search-icon"
          src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU2Ljk2NiA1Ni45NjYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDU2Ljk2NiA1Ni45NjY7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4Ij4KPHBhdGggZD0iTTU1LjE0Niw1MS44ODdMNDEuNTg4LDM3Ljc4NmMzLjQ4Ni00LjE0NCw1LjM5Ni05LjM1OCw1LjM5Ni0xNC43ODZjMC0xMi42ODItMTAuMzE4LTIzLTIzLTIzcy0yMywxMC4zMTgtMjMsMjMgIHMxMC4zMTgsMjMsMjMsMjNjNC43NjEsMCw5LjI5OC0xLjQzNiwxMy4xNzctNC4xNjJsMTMuNjYxLDE0LjIwOGMwLjU3MSwwLjU5MywxLjMzOSwwLjkyLDIuMTYyLDAuOTIgIGMwLjc3OSwwLDEuNTE4LTAuMjk3LDIuMDc5LTAuODM3QzU2LjI1NSw1NC45ODIsNTYuMjkzLDUzLjA4LDU1LjE0Niw1MS44ODd6IE0yMy45ODQsNmM5LjM3NCwwLDE3LDcuNjI2LDE3LDE3cy03LjYyNiwxNy0xNywxNyAgcy0xNy03LjYyNi0xNy0xN1MxNC42MSw2LDIzLjk4NCw2eiIgZmlsbD0iIzAwMDAwMCIvPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K"
        />
        <input
          className="search"
          value={value || ''}
          onChange={e => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
        />
        <div
          className="add-project"
          onClick={() => {
            history.push('/admin/add-member');
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' ,cursor:'pointer'}}>
            <Icon type="github" size={20} left={15} top={2} />
            <p style={{ paddingLeft: '24px', fontStyle: 'italic' }}>Add member</p>
          </div>
        </div>
      </div>
    );
  };
  const [listMember, setListMember] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [memberID, setMemberID] = useState();
  useEffect(() => {
    api.get(`/api/members/organization/${store.getState().auth.user.organizationId}/search`).then(
      data => {
        console.log(data);
        setListMember(data.filter(x=>x.displayName!=null));
      },
      error => {
        toast.error(error);
      },
    );
  }, [isLoading]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'User Name',
        accessor: 'username',
      },
      {
        Header: 'Display Name',
        accessor: 'displayName',
      },
      {
        Header: 'First Name',
        accessor: 'firstName',
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
      },
      {
        Header: 'EMail',
        accessor: 'mailNotification',
      },
      {
        Header: 'Remove',
        accessor: 'id',
        id: 'remove',
        Cell: ({ cell: { value } }) => (
          <Button icon="trash" iconSize={19} variant="empty" onClick={() => onClickRemove(value)} />
        ),
        width: 15,
        minWidth: 5,
        padding: 0,
        paddingLeft: 5,
      },
    ],
    [],
  );
  const onClickRemove = async id => {
    setMemberID(id);
    setIsOpenDeleteModal(true);
  };
  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable({ columns, data: listMember }, useGlobalFilter, useSortBy);
  const { globalFilter } = state;
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className="listproject">
      <div className="header" />
      <div className="main" style={{ padding: '30px 70px' }}>
        <p style={{ fontFamily: 'CircularStdMedium', fontWeight: 'normal' }}>Member</p>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <table className="styled-table" {...getTableProps()}>
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
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        {isOpenDeleteModal && (
          <ModalCustom
            title="Remove"
            content={['Do you want remove member?']}
            onConfirm={async () => {
              try {
                await api.delete(`/api/users/${memberID}`);
                await delay(700);
                toast.success('Delete member successfully');
                setIsLoading(current => !current);
              } catch (error) {
                toast.error(error);
              }
            }}
            setModalOpen={setIsOpenDeleteModal}
          />
        )}
      </div>
    </div>
  );
};

export default ListMemberInOrganition;
