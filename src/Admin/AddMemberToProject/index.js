/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/button-has-type */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { useTable, useSortBy } from 'react-table';
import api from 'Services/api';
import ModalCustom from 'components/ModalCustom/ModalCustom';
import { store } from 'store';
import { Button } from 'components';
import { toast } from 'react-project-management';
import './styles.css';

const AddMemberToProject = () => {
  const [listMember, setListMember] = useState([]);
  const [listMemberAll, setListMemberAll] = useState([]);
  const [filter, setFilter] = useState('');
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [memberID, setMemberID] = useState();
  const [isSelect, setisSelect] = useState('');
  const [state, setState] = useState(true);
  const handleChange = event => {
    setFilter(event.target.value);
  };
  useEffect(() => {
    getData();
  }, [state]);
  const getData = async () => {
    await api.get(`/api/members/projects/${store.getState().listproject.projectId}/search`).then(
      data => {
        setListMember(data);
      },
      error => {
        toast.error(error);
      },
    );
    await api
      .get(`/api/members/organization/${store.getState().auth.user.organizationId}/search`)
      .then(
        data => {
          setListMemberAll(data);
        },
        error => {
          toast.error(error);
        },
      );
  };
  const addMember = async () => {
    if (isSelect) {
      console.log(store.getState().listproject.projectId);
      console.log(isSelect);
      try {
        await api.post(
          '/api/members',
          JSON.stringify({
            projectId: store.getState().listproject.projectId,
            usernames: isSelect,
          }),
        );
        toast.success('Add member successfully');
        setState(current => !current);
        setisSelect('');
      } catch (error) {
        toast.error(error);
        setisSelect('');
      }
    } else {
      toast.error('Please select member');
    }
  };
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'displayName',
      },
      {
        Header: 'Email',
        accessor: 'mailNotification',
      },
      {
        Header: 'Remove',
        accessor: 'id',
        id: 'remove',
        Cell: ({ cell: { value } }) => (
          <Button icon="trash" iconSize={19} variant="empty" onClick={() => onClickRemove(value)} />
        ),
        width: 10,
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
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    { columns, data: listMember },
    useSortBy,
  );
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className="listproject">
      <div className="header" />
      <div className="main" style={{ padding: '30px 70px' }}>
        <p
          style={{
            fontFamily: 'CircularStdMedium',
            fontWeight: 'normal',
            paddingBottom: '18px',
            fontStyle: 'italic',
            fontSize: '40px',
          }}
        >
          {store.getState().listproject.name}{' '}
        </p>

        <div className="wrapper">
          <div className="search-member">
            <img
              className="search-icon-member"
              src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU2Ljk2NiA1Ni45NjYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDU2Ljk2NiA1Ni45NjY7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4Ij4KPHBhdGggZD0iTTU1LjE0Niw1MS44ODdMNDEuNTg4LDM3Ljc4NmMzLjQ4Ni00LjE0NCw1LjM5Ni05LjM1OCw1LjM5Ni0xNC43ODZjMC0xMi42ODItMTAuMzE4LTIzLTIzLTIzcy0yMywxMC4zMTgtMjMsMjMgIHMxMC4zMTgsMjMsMjMsMjNjNC43NjEsMCw5LjI5OC0xLjQzNiwxMy4xNzctNC4xNjJsMTMuNjYxLDE0LjIwOGMwLjU3MSwwLjU5MywxLjMzOSwwLjkyLDIuMTYyLDAuOTIgIGMwLjc3OSwwLDEuNTE4LTAuMjk3LDIuMDc5LTAuODM3QzU2LjI1NSw1NC45ODIsNTYuMjkzLDUzLjA4LDU1LjE0Niw1MS44ODd6IE0yMy45ODQsNmM5LjM3NCwwLDE3LDcuNjI2LDE3LDE3cy03LjYyNiwxNy0xNywxNyAgcy0xNy03LjYyNi0xNy0xN1MxNC42MSw2LDIzLjk4NCw2eiIgZmlsbD0iIzAwMDAwMCIvPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K"
            />
            <input className="input-search" onChange={handleChange} value={filter} />
            {filter ? (
              <div className="list-member">
                {listMemberAll
                  .filter(x => x.mailNotification.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
                  .map(item => (
                    <p
                      key={item.id}
                      className="member"
                      style={{cursor: 'pointer'}}
                      onClick={() => {
                        setisSelect(item.mailNotification);
                        setFilter('');
                      }}
                    >
                      {' '}
                      {typeof item.mailNotification === 'string' ? item.mailNotification : item.username}
                    </p>
                  ))}
              </div>
            ) : null}
          </div>
          <button className="addMemberButton" onClick={addMember}>
            Add Member
          </button>
          {isSelect ? (
            <div className="isMemberSelect">
              <p style={{ paddingRight: '3px' }}>{isSelect}</p>
              <Button
                icon="trash"
                iconSize={19}
                variant="empty"
                style={{ backgroundColor: '#afb7b0' }}
                onClick={() => {
                  setisSelect('');
                }}
              />
            </div>
          ) : null}
        </div>
        <p
          style={{
            fontFamily: 'CircularStdMedium',
            fontWeight: 'normal',
            paddingTop: '18px',
            textAlign: 'center',
          }}
        >
          {' '}
          Member
        </p>
        <table className="styled-table" {...getTableProps()} style={{ border: '1px solid' }}>
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
            content={["Do you wan't remove user?"]}
            onConfirm={async () => {
              try {
                await api.delete(`/api/members/${memberID}`);
                toast.success('Delete member successfully');
                setState(!state);
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

export default AddMemberToProject;
