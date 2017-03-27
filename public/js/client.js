import React, {Component} from 'react';
import { render } from 'react-dom'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'

import Main from "./components/main";
import Index from "./components/polls/index";
import New from "./components/polls/new";
import Show from "./components/polls/show";
import PollAdmin from "./components/polls/poll_admin"

render((
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={Index}/>
      <Route component={New} path="/new" />
      <Route component={PollAdmin} path="/poll/admin" />
      <Route component={Show} path="/poll/:pollId" />
    </Route>

  </Router>
), document.getElementById('app'))
