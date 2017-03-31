import React, {Component} from 'react';
import { Link } from 'react-router';

class Main extends Component {
    render(){
        return(
            <div>
                <nav className="navbar navbar-default">
                    <div className="container">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">Home</a>
                            <a className="navbar-brand" href="#/new">New Poll</a>
                            <a className="navbar-brand" href="#/poll/admin">My Polls</a>
                        </div>
                    </div>
                </nav>
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Main
