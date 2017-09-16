import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button, Dropdown, Image, Form, TextArea, Modal } from 'semantic-ui-react'
import ImageZoom from 'react-medium-image-zoom'
import GoogleMap from './googleMap'
import { updateIssue, deleteIssue, clearDisplay } from '../actions/index'

// TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO
// Also, reload list on update issues - needs to do a filter submit - changes filter options to store in redux state so can use those
// TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO

const options = [
  { key: 'n', value: 'new', text: 'NEW' },
  { key: 'a', value: 'active', text: 'ACTIVE' },
  { key: 'c', value: 'completed', text: 'COMPLETED' },
]

class MoreInfo extends Component {
  state = {
    editNotes: false,
    changeStatus: false,
    editReport: false,
    issue: {
      notes: '',
      status: '',
      report: ''
    }
  }

  imageZoom = (src, key) => {
    return (
      <ImageZoom
        key={key}
        image={{
          src: `${src}`,
          alt: 'Tweet/Image May Have Been Removed',
          className: 'pic',
        }}
        zoomImage={{
          src: `${src}`,
          alt: 'Tweet/Image May Have Been Removed'
        }}
      />
    )
  }

  images = () => {
    if (this.props.data.media[0]) return this.props.data.media.map((src, i) => this.imageZoom(src, i))
    return <h6 className="pic">[No Photos Provided]</h6>
  }

  convertDate = () => {
    return new Date(Date.parse(this.props.data.posted_on)).toUTCString().replace(/\s*(GMT|UTC)$/, "")
  }

  updateIssue = () => {
    this.props.updateIssue(this.props.data._id, this.props.data.index, this.state.issue)
    this.cancel()
  }

  deleteIssue = () => {
    this.props.deleteIssue(this.props.data)
    this.props.clearDisplay()
  }

  changeHandler = (e, input) => {
    this.setState({
      issue: {
        ...this.state.issue,
        [input.name]: input.value
      }
    })
  }

  edit = (event) => {
    this.setState ({ [event.target.name]: true })
  }

  cancel = () => {
    this.setState({
      editNotes: false,
      changeStatus: false,
      editReport: false
    })
  }

  notes = () => {
    if (this.state.editNotes) {
      return (
        <div>
          <Form>
            <TextArea type='text' name='notes' value={this.state.issue.notes} onChange={this.changeHandler} placeholder={this.props.data.notes} style={{ maxWidth:'400px', minHeight: '150px' }}/>
          </Form>
          <br />
          <Button className="alert-button" onClick={this.cancel}>Cancel</Button>
          <Button className="info-button" onClick={this.updateIssue}>Submit</Button>
        </div>
      )
    }

    return <p>{this.props.data.notes}</p>
  }

  status = () => {
    if (this.state.changeStatus) {
      return (
        <div>
          <Dropdown selection name='status' placeholder={this.props.data.status.toUpperCase()} options={options} onChange={this.changeHandler}/>
          <br />
          <Button className="alert-button" onClick={this.cancel}>Cancel</Button>
          <Button className="info-button" onClick={this.updateIssue}>Submit</Button>
        </div>
      )
    }

    return <p>{this.props.data.status.toUpperCase()}</p>
  }

  deleteModal = () => {
    return (
      <Modal
        size="mini"
        trigger={<Button className="alert-button">Delete</Button>}
        content='Are you sure you want to delete this issue?'
        actions={[
          { key: 'cancel', className: "info-button", content: 'Cancel', triggerClose: true },
          { key: 'delete', className: "alert-button", content: 'Delete', triggerClose: true, onClick: this.deleteIssue },
        ]}
      />
    )
  }

  render = () => {
    return (
      <div>
        <div className="divider" />
        <div className="display-grid">
          <div className="display">
            <div className="user">
              <Image avatar size="mini" className="head-img" src={this.props.data.profile_image} alt="" />
              <h2 className="head-h2">@{this.props.data.posted_by}</h2>
            </div>
            <div className="info">
              <h3>Posted on: {this.convertDate()}</h3>
              <p>{this.props.data.tweet_content}</p>
              {this.images()}
              <h4>Status:</h4>
              {this.status()}
              <h4>Issues/Notes:</h4>
              {this.notes()}
              <br />
              <Button name="editNotes" className="info-button" onClick={this.edit}>Notes/Issues</Button>
              <Button name="changeStatus" className="info-button" onClick={this.edit}>Status</Button>
              {/* <Button className="alert-button">Report</Button> */}
              {this.deleteModal()}
            </div>
          </div>
          <div className="map">
            <GoogleMap data={this.props.data} />
          </div>
        </div>
        <div className="divider" />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateIssue: updateIssue,
    deleteIssue: deleteIssue,
    clearDisplay: clearDisplay
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(MoreInfo)
