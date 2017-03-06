import React, {Component} from 'react';
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'

import Main from "./components/main";
import Index from "./components/polls/index";
import New from "./components/polls/new";
import Show from "./components/polls/show";

render((
  <Router history={browserHistory}>
    <Route component={Index} path="/" />
    <Route component={New} path="/new" />
    <Route component={Show} path="/poll/:pollId" />
  </Router>
), document.getElementById('app'))


// index all polls
// create a new poll
// edit a poll
