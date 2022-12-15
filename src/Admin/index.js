import React, { Fragment } from 'react';
import { Route, Redirect, useRouteMatch } from 'react-router-dom';
import ProjectCreate from 'Project/ProjectCreate';
import NavBar from './Navbar';
import AddMember from './AddMemberToOrganization'
import ListProjcectInOrganition from './ListProjectInOrganination'


const Admin = () => {
  const match = useRouteMatch();
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <Fragment>
      <NavBar />
    
      <Route
        path={`${match.path}/project-create`}
        render={() => <ProjectCreate />}
      />
     <Route
        path={`${match.path}/add-member`}
        render={() => <AddMember />}
      />
       <Route
        path={`${match.path}/list-projcect`}
        render={() => <ListProjcectInOrganition />}
      />
      {match.isExact && <Redirect to={`${match.url}/list-projcect`} />}
    
    </Fragment>
  );
};
export default Admin;