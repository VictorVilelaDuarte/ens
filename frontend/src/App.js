import React from 'react';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import defaultLayout from './pages/_layout';
import Routes from './routes';
import history from './services/history';
import 'react-toastify/dist/ReactToastify.css';

import GlobalStyle from './styles/global';

function App() {
  const Layout = defaultLayout;

  return (
    <Router history={history}>
      <Layout>
        <Routes />
        <ToastContainer />
      </Layout>
      <GlobalStyle />
    </Router>
  );
}

export default App;
