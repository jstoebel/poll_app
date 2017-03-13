import React, {Component} from 'react';
import { Link } from 'react-router';
import axios from 'axios';

class Index extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      polls: []
    }
  }

  componentDidMount() {
    var _this = this;

      axios('/api/polls')
        .then(function(result){
          _this.setState({
            polls: result.data.polls
          })
        })
        .catch(function(err){
        })

  }

  eachPoll(poll, i) {
      return(
          <Link to={"/poll/" + poll._id} key={poll._id}>
            <div className="btn btn-info btn-block">
              {poll.name}
            </div>
          </Link>
      )
  }

  render() {
    return(
      <div id="poll-index">
        <h1>Polls</h1>

        <Link to="/new">
          <div className="btn btn-default">
            New
          </div>
        </Link>
        { this.state.polls.map(this.eachPoll) }

        { this.props.children}
      </div>
    )
  }

}

export default Index;
