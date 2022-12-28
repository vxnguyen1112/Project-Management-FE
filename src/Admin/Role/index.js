/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import api from 'Services/api';
import { Icon } from 'components';
import { toast } from 'react-project-management';
import history from 'browserHistory';
import './styles.css';

const Role = () => {
  const [listRoles, setListRoles] = useState([]);
  const [roleSelect, setRoleSelect] = useState({ id: '', name: '' });
  const [listPermissions, setListPermissions] = useState([]);
  const [more, setMore] = useState(false);
  const [state, setState] = useState(false);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    await api.get('/api/roles/list').then(
      data => {
        setListRoles(data.data);
        setRoleSelect({ ...roleSelect, ...data.data[0] });
      },
      error => {
        toast.error(error);
      },
    );
  };
  useEffect(() => {
    if (roleSelect.id) {
      api.get(`/api/permissions/${roleSelect.id}`).then(
        data => {
          setListPermissions(data.data);
        },
        error => {
          toast.error(error);
        },
      );
    }
  }, [roleSelect,state]);
  const onCheckboxChange = async event => {
    const target = event.currentTarget;
    console.log(target.id);
    console.log(target.checked);
    const data = { permissions: [{ id: target.id, enable: target.checked }] };
    try {
      await api.post(`/api/permissions/${roleSelect.id}`, JSON.stringify(data));
      toast.success('Change successfully');
      setState(curent=>!curent);
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <div className="listproject">
      <div className="roles" style={{ display: 'flex' }}>
        <input
          className="input-role"
          value={roleSelect.name}
          onClick={() => setMore(current => !current)}
          readOnly
        />
        <Icon className="icon-more" type="chevron-down" size={20} left={15} top={2} />
        {more ? (
          <div className="list-roles">
            {listRoles.map(item => (
              <p
                key={item.id}
                className="item-role"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setRoleSelect(item);
                  setMore(current => !current);
                }}
              >
                {' '}
                {item.name}
              </p>
            ))}
          </div>
        ) : null}
        <div
          className="add-project"
          style={{margin:"40px"}}
          onClick={() => {
          history.push('/admin/add-role');
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <Icon type="component" size={20} left={15} top={2} />
            <p style={{ paddingLeft: '24px', fontStyle: 'italic' }}>Add Role</p>
          </div>
        </div>
      </div>
      <div className="main" style={{ padding: '30px 70px' }}>
        <div className="containerPer">
          {listPermissions.map(item =>
            item.screens.map(screen => (
              <React.Fragment>
                {screen.permissions.length > 0 && (
                  <p
                    style={{
                      fontStyle: 'oblique',
                      fontSize: '20px',
                      fontWeight: '800',
                      padding: '10px',
                    }}
                  >
                    {screen.screenName}
                  </p>
                )}
                {screen.permissions.length > 0 && (
                  <div className="itemPer">
                    {screen.permissions.map(per => (
                      <div style={{ display: 'flex', padding: '16px 10px' }}>
                        <p className="item-p">{per.functionName} :</p>
                        <input
                          type="checkbox"
                          className="checkbox-role"
                          style={{ marginTop: '3px' }}
                          checked={per.enable}
                          id={per.id}
                          onChange={onCheckboxChange}
                          readOnly
                        />
                      </div>
                    ))}
                  </div>
                )}
              </React.Fragment>
            )),
          )}
        </div>
      </div>
    </div>
  );
};

export default Role;
