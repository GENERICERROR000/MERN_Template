import React, { Component } from 'react'
import { Button, Header } from 'semantic-ui-react'

// TODO: USE REDUX STATE SO DON'T NEED TO PASS METHOD DOWN TO THIS AND THEN PASS DATA BACK UP...

class Issue extends Component {
  displayIssue = () => {
    let data = {...this.props.data}
    data.index = this.props.index
    this.props.displayIssue(data)
  }

  converDate = () => {
    return new Date(Date.parse(this.props.data.posted_on)).toUTCString().replace(/\s*(GMT|UTC)$/, "")
  }

  render = () => {
    return (
      <div>
        <div className="divider" />
        <div className="wrapper">
          <h2>@{this.props.data.posted_by}</h2>
          <h4>Posted on: {this.converDate()}</h4>
          <h4>{this.props.data.tweet_content}</h4>
          <Button className="submit-button" onClick={this.displayIssue}>More Info</Button>
        </div>
      </div>
    )
  }
}

export default Issue
