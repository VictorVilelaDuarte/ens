import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Eventos from '../pages/Eventos';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/register" component={Eventos} />
    </Switch>
  );
}
