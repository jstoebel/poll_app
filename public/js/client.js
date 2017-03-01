import React, {Component} from 'react';
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'

import Main from "./components/main";
import Index from "./components/polls/index";


// class App extends React.Component {
//
//
//   render() {
//     return(
//       <div id="poll-index">
//         here are the polls
//       </div>
//     )
//   }
//
// }


render((
  <Router history={browserHistory}>
    <Route component={Main} path="app">
        <Route path="/" component={Index}/>
    </Route>
  </Router>
), document.getElementById('app'))



// index all polls
// create a new poll
// edit a poll
