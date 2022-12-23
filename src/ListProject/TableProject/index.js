/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { toast } from 'react-project-management';
import history from 'browserHistory';
import { store } from 'store';
import {  useDispatch } from 'react-redux';
import { getListProject, selectProject } from 'store/reducers/listprojectSlide';
import './styles.css';

const TableProject = () => {
  const [listProject, setListProject] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListProject())
      .unwrap()
      .then(() => {
        setListProject(store.getState().listproject.listproject);
      })
      .catch(() => {
        toast.error(store.getState().message.message);
      });
  }, []);
  const[filter,setFilter]=useState("")
  const handleChange = event => {
    setFilter(event.target.value);
  };

  const onClickRow = (id) => {
    dispatch(selectProject(id));
    history.push('/project');
  };
  return (
    <div className="listproject">
      <div className="main" style={{ padding: '30px 70px' }}>
        <p style={{ fontFamily: 'CircularStdMedium', fontWeight: 'normal' }}>Project</p>
        <div className="wrapper">
          <img
            className="search-icon"
            src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU2Ljk2NiA1Ni45NjYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDU2Ljk2NiA1Ni45NjY7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4Ij4KPHBhdGggZD0iTTU1LjE0Niw1MS44ODdMNDEuNTg4LDM3Ljc4NmMzLjQ4Ni00LjE0NCw1LjM5Ni05LjM1OCw1LjM5Ni0xNC43ODZjMC0xMi42ODItMTAuMzE4LTIzLTIzLTIzcy0yMywxMC4zMTgtMjMsMjMgIHMxMC4zMTgsMjMsMjMsMjNjNC43NjEsMCw5LjI5OC0xLjQzNiwxMy4xNzctNC4xNjJsMTMuNjYxLDE0LjIwOGMwLjU3MSwwLjU5MywxLjMzOSwwLjkyLDIuMTYyLDAuOTIgIGMwLjc3OSwwLDEuNTE4LTAuMjk3LDIuMDc5LTAuODM3QzU2LjI1NSw1NC45ODIsNTYuMjkzLDUzLjA4LDU1LjE0Niw1MS44ODd6IE0yMy45ODQsNmM5LjM3NCwwLDE3LDcuNjI2LDE3LDE3cy03LjYyNiwxNy0xNywxNyAgcy0xNy03LjYyNi0xNy0xN1MxNC42MSw2LDIzLjk4NCw2eiIgZmlsbD0iIzAwMDAwMCIvPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K"
          />
          <input className="search" 
          onChange={handleChange}
          />
        </div>
        <div className="container">
          {listProject.filter(x=>x.name.toLowerCase().includes(filter.toLocaleLowerCase()) || x.domain.toLowerCase().includes(filter.toLowerCase())||x.projectStatus.toLowerCase().includes(filter.toLocaleLowerCase()) ).map(item => (
            <div className="item" style={{ cursor: 'pointer' }} onClick={() => onClickRow(item.id)}>
              <div style={{ display: 'flex' }}>
                <h2 style={{ width: '250px' }}>{item.name}</h2>
                <img style={{}}
                  src="https://levanket.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10315?size=medium"
                  alt="new"
                />
              </div>
              <p style={{ marginTop: '5px' }}>Domain : {item.domain}</p>
              <div style={{ display: 'flex' }}>
                <p>Public : </p>
                <input
                  type="checkbox"
                  className="checkbox"
                  style={{ marginLeft: '10px', marginTop: '3px' }}
                  checked={item.isPublic}
                  readOnly
                />
              </div>
              <p>Status : {item.projectStatus}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableProject;
