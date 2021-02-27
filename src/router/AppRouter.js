import { useContext, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { AuthRouter } from './AuthRouter';
import { ChatPage } from '../pages/ChatPage';
import { AuthContext } from '../auth/AuthContext';

export const AppRouter = () => {

  const { auth, checkToken } = useContext(AuthContext);

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  if(auth.checking) {
    return(<h1>Por favor espere...</h1>);
  };

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/auth" component={AuthRouter} />
          <Route exact path="/" component={ChatPage} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};
