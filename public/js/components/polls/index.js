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
          console.log(result.data.polls);
          _this.setState({
            polls: result.data.polls
          })
        })
        .catch(function(err){
          console.log(err);
        })

  }

  eachPoll(poll, i) {

      return(
        <div
          className="btn btn-info btn-block"
          key={poll._id}
          href={"/poll/" + poll._id}
        >
            {poll.name}
        </div>
      )
  }

  render() {
    return(
      <div id="poll-index">
        <h1>Polls</h1>
        <div className="btn btn-default">  <Link to="/new">New</Link>  </div>
        { this.state.polls.map(this.eachPoll) }

        { this.props.children}
      </div>
    )
  }

}

export default Index;
