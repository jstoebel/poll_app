import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import PollIndex from './components/polls/PollIndex'


render((
  <Router history={browserHistory}>
    <Route path="/" component={PollIndex}/>
  </Router>
), document.getElementById('app'))


// index all polls
// create a new poll
// edit a poll
