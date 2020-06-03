import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';

function Router({ isPrivate = false, component: Component, ...rest }) {
  const { loggedUser } = useContext(AuthContext);
  const logged = !!loggedUser.user;
  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <>
            {!isPrivate ? (
              <Component {...props} />
            ) : (
              <>
                {isPrivate === logged ? (
                  <Component {...props} />
                ) : (
                  <Redirect to={{ pathname: '/loginadm' }} />
                )}
              </>
            )}
          </>
        );
      }}
    />
  );
}

export default Router;
