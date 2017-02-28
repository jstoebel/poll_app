import React, {Component} from 'react';
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import App from "./components/polls/PollIndex";

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
    <Route path="/" component={App}/>
  </Router>
), document.getElementById('app'))



// index all polls
// create a new poll
// edit a poll
