import React, {Component} from 'react';

class New extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      pollName: ""
    }

    // methods that need access this `this`
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  sendFormData() {


  }

  handleChange(event) {
    // handle changing state of fields
    this.setState({pollName: event.target.value});
  }

  handleSubmit(event) {
    console.log('A poll was submitted: ' + this.state.pollName);
    event.preventDefault();
  }

  render() {
    return(

      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group row">
            <label className="col-2 col-form-label">Poll Name</label>
            <div className="col-10">
              <input className="form-control" name="pollName"  type="text" value={this.state.pollName} onChange={this.handleChange} />
            </div>
          </div>

          <input className="btn btn-info"  type="submit" value="Submit" />
        </form>
      </div>

    )
  }

}

export default New;
