import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './css/all.css'
import { Input } from 'semantic-ui-react'

class SearchedJobs extends Component {
  render () {
    var jobs = this.props.alljobs.map((job) => {
      return (
        <div key={job._id} className='col-12 col-md-3 m-1'>
          <Card style={{ width: '18rem' }}>
            <Link className='noDecoration' to={`/available_jobs/${job._id}`}>
              <Card.Body>
                <Card.Title>{job.name}</Card.Title>
                <Card.Subtitle className='mb-2 text-muted'>Description</Card.Subtitle>
                <Card.Text>
                  {job.description}
                </Card.Text>
                <Card.Subtitle>TechStack Required</Card.Subtitle>
                <Card.Text>{job.technology.map((tech) => <p key={tech.id}>{tech.text}</p>)}</Card.Text>
              </Card.Body>
            </Link>
          </Card>
        </div>
      )
    })
    return (
      <>
        {jobs}
      </>
    )
  }
}

class Alljobs extends Component {
  constructor (props) {
    super(props)

    this.state = {
      search: '',
      alljobs: []
    }
  }

  handlechange (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  componentDidMount () {
    this.setState({
      alljobs: this.props.jobs.jobs
    })
  }

  dynamicSearch = () => {
    return this.state.alljobs.filter(job => JSON.stringify(job).toLowerCase().includes(this.state.search.toLowerCase()))
  }

  render () {
    if (this.props.jobs.isLoading) {
      return (
        <p>Loading...</p>
      )
    } else if (this.props.jobs.errMess) {
      return (
        <p>Error in Loading</p>
      )
    } else {
      return (
        <div className='container'>
          <Input className='col-md-10' placeholder='Anything...' style={{ padding: '20px' }} name='search' onChange={(e) => this.handlechange(e)} label='Search by' icon='search' />
          <div className='row'>
            <SearchedJobs alljobs={this.dynamicSearch()} />
          </div>
        </div>
      )
    }
  }
}

export default Alljobs