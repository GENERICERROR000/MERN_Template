import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getIssues, displayIssue, clearIssues, clearDisplay } from '../actions/index'
import Issue from '../components/issue'
import FilterBar from '../components/filterBar'
import DisplayIssue from '../components/displayIssue'
import '../css/issues.css'

class Issues extends Component {
  componentWillUnmount = () => {
    this.props.clearIssues()
    this.props.clearDisplay()
  }

  loadingTweets = () => {
    if (this.props.issues[0]) return this.props.issues.map((issue, i) => { return <Issue key={i} index={i} data={issue} displayIssue={this.displayIssue}/> })
    return <h2>Please Select Filters and/or Click "Submit"</h2>
  }

  displayIssue = (data) => {
    this.props.displayIssue(data)
  }

  loadingMoreInfo = () => {
    if (this.props.issue) return <DisplayIssue data={this.props.issue}/>
    return <h2>Please Select A Tweet To See More Info</h2>
  }

  applyFilter = (filterInput) => {
    this.props.getIssues(filterInput, "new")
  }

  render = () => {
    return (
      <div className="grid">
        <h1 style={{color: "#267dc0"}}>New Issues</h1>
        <div className="filter">
          <FilterBar applyFilter={this.applyFilter} />
        </div>
          <div className="display-content">
            {this.loadingTweets()}
          </div>
        <div className="display-content">
          {this.loadingMoreInfo()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    issues: state.issues,
    issue: state.displayIssue
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getIssues: getIssues,
    displayIssue: displayIssue,
    clearIssues: clearIssues,
    clearDisplay: clearDisplay
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Issues)
