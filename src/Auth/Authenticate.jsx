import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import api from 'Services/api';
import { toast } from 'react-project-management';
import { getStoredAuthToken, storeAuthToken } from 'react-project-management';
import { PageLoader } from 'components';

const Authenticate = () => {
  const history = useHistory();

  useEffect(() => {
    const createGuestAccount = async () => {
      try {
        const { authToken } = await api.post('/authentication/guest');
        storeAuthToken(authToken);
        history.push('/');
      } catch (error) {
        toast.error(error);
      }
    };

    if (!getStoredAuthToken()) {
      createGuestAccount();
    }
  }, [history]);

  return <PageLoader />;
};

export default Authenticate;
