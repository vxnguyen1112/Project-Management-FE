import React, { Fragment } from 'react';
import { Route, Redirect, useRouteMatch } from 'react-router-dom';
import ProjectCreate from 'Project/ProjectCreate';
import NavBar from './Navbar';
import TableProject from './TableProject';

const ListProject = () => {
  const match = useRouteMatch();
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <Fragment>
      <NavBar />
      <Route
        path={`${match.path}/listproject`}
        render={() => (
         <TableProject />
        )}
      />
      <Route
        path={`${match.path}/project-create`}
        render={() => <ProjectCreate/>}
      />

      {match.isExact && <Redirect to={`${match.url}/listproject`} />}
    
    </Fragment>
  );
};
export default ListProject;
