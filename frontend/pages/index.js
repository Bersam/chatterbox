import React from 'react'
import fetch from 'isomorphic-fetch'
import Head from 'next/head'
import { Container, Button, Comment, Form, Header } from 'semantic-ui-react'
import Gravatar from 'react-gravatar'
import Moment from 'react-moment'

class Home extends React.Component {
  state = {
    username: 'DefaultUser',
    input: '',
    messages: [],
  }

  // connect to WS server and listen event
  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:8000/chat/'+this.state.username)
    this.socket.onopen = () => {
      console.log("WebSocket open");
    };
    this.socket.onmessage = e => {
      console.log(e.data);
    };
    this.socket.onerror = e => {
      console.log(e.message);
    };
    this.socket.onclose = () => {
      console.log("WebSocket is closed");
    };
  }

  // close socket connection
  componentWillUnmount() {
    this.socket.close();
  }

  // add messages from server to the state
  handleMessage = (message) => {
    this.setState(state => ({ messages: state.messages.concat(message) }))
  }

  handleChange = event => {
    this.setState({ input: event.target.value });
  }

  // send messages to server and add them to the state
  handleSubmit = event => {
    event.preventDefault()

    const message = {
      timestamp: (new Date()).getTime(),
      message: this.state.input,
      username: this.state.username
    }

    // send object to WS server
    // this.socket.send(message)

    // add it to state and clean current input value
    this.setState(state => ({
      input: '',
      messages: state.messages.concat(message)
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
                  <Gravatar email="bersam.k@gmail.com" className="avatar" size={200} />
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
              <Button content='Add Reply' labelPosition='left' icon='edit' primary onClick={this.handleSubmit} />
            </Form>
          </Comment.Group>
        </Container>
      </React.Fragment>
    )
  }
}

export default Home;