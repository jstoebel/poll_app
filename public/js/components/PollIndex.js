import React from 'react'

export default React.createClass({
  render() {

    fetch( "/polls")
      .then(data => console.log(data))
    return(<div>My Polls</div>)
  }
})
