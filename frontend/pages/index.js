import React from 'react'
import fetch from 'isomorphic-fetch'
import Head from 'next/head'
import { Container, Button, Comment, Form, Header } from 'semantic-ui-react'
import Gravatar from 'react-gravatar'
import Moment from 'react-moment'

class Home extends React.Component {
  state = {
    username: 'DefaultUser',
    email: '',
    input: '',
    messages: [],
    loading: true,
  }

  // connect to WS server and listen event
  componentDidMount() {
    this.connect()
  }

  // close socket connection
  componentWillUnmount() {
    if (this.socket) {
      this.socket.close()
    }
  }

  connect = () => {
    if (this.socket) {
      return this.socket
    }

    console.log("trying to connect to websocket...")

    try {
      this.socket = new WebSocket(`ws://localhost:8000/chat/${this.state.username}/`)

      this.socket.onopen = () => {
        console.log("WebSocket open")
        this.setState({ loading: false })
      }

      this.socket.onmessage = e => {
        this.handleMessage(JSON.parse(e.data))
      }

      this.socket.onerror = e => {
        console.log(e.message)
      }

      this.socket.onclose = () => {
        console.log("WebSocket closed, trying to reconnect")
        this.setState({ loading: true })
        this.socket = null
        setTimeout(this.connect, 3000)
      }

    } catch (error) {
      setTimeout(this.connect, 3000)
    }

    return this.socket
  }


  // add messages from server to the state
  handleMessage = (message) => {
    this.setState(state => ({ messages: state.messages.concat(message) }))
  }

  handleChange = event => {
    this.setState({ input: event.target.value })
  }

  // send messages to server and add them to the state
  handleSubmit = event => {
    event.preventDefault()

    const message = {
      timestamp: (new Date()).getTime(),
      email: this.state.email,
      message: this.state.input,
      username: this.state.username
    }

    // send object to WS server
    this.socket.send(JSON.stringify(message))

    // add it to state and clean current input value
    this.setState(state => ({
      input: '',
    }))
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
          <meta charSet="utf-8" />
        </Head>
        <Container textAlign='left'>
          <Comment.Group size='massive' minimal>
            <Header as='h3' dividing>
              {this.state.username}
            </Header>
            {this.state.messages.map((message) => (
              <Comment key={message.timestamp}>
                <div className="avatar">
                  <Gravatar email={message.email} className="avatar" size={200} />
                </div>
                <Comment.Content>
                  <Comment.Author as='a'>{message.username}</Comment.Author>
                  <Comment.Metadata>
                    <Moment date={message.timestamp} fromNow/>
                  </Comment.Metadata>
                  <Comment.Text>{message.message}</Comment.Text>
                </Comment.Content>
              </Comment>
            ))}
            <Form reply>
              <Form.TextArea onChange={this.handleChange} value={this.state.input}/>
              <Button content='Add Reply' labelPosition='left' icon='edit' primary onClick={this.handleSubmit} disabled={this.state.loading}/>
            </Form>
          </Comment.Group>
        </Container>
      </React.Fragment>
    )
  }
}

export default Home