import React from 'react'
import fetch from 'isomorphic-fetch'
import Head from 'next/head'
import { Container, Grid, Button, Form, Header, Divider } from 'semantic-ui-react'

import Messages from '../components/messages'
import Panel from '../components/panel'

class Home extends React.Component {
  static async getInitialProps({ req }) {
    const response = await fetch('http://localhost:8000/chat/')
    const messages = await response.json()
    return { messages }
  }

  static defaultProps = {
    messages: [],
  }

  state = {
    username: 'DefaultUser',
    email: '',
    input: '',
    messages: this.props.messages,
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
      this.socket = new WebSocket(`ws://localhost:8000/chat/`)

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

  handleChangeInput = event => {
    this.setState({ input: event.target.value })
  }

  handleChangeUsername = event => {
    this.setState({ username: event.target.value })
  }

  handleChangeEmail = event => {Panel
    this.setState({ email: event.target.value })
  }

  // send messages to server and add them to the state
  handleSendMessage = event => {
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
    this.setState({ input: '' })
  }


  render() {
    return (
      <React.Fragment>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
          <meta charSet="utf-8" />
        </Head>
        <Container style={{ marginTop: 10 }}>
          <Grid divided>
            <Grid.Row>
              <Grid.Column width={12}>
                <Header as='h3' dividing>
                  {this.state.username} {this.state.email && `<${this.state.email}>`}
                </Header>

                <Messages messages={this.state.messages} />

                <Divider />
                <Form reply>
                  <Form.TextArea name='message' onChange={this.handleChangeInput} value={this.state.input} />
                  <Button content='Add Reply' labelPosition='left' icon='edit' primary onClick={this.handleSendMessage} disabled={this.state.loading} />
                </Form>
              </Grid.Column>
              <Grid.Column width={4}>

                <Panel handleChangeUsername={this.handleChangeUsername}
                  username={this.state.username}
                  handleChangeEmail={this.handleChangeEmail}
                  email={this.state.email} />

              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </React.Fragment>
    )
  }
}

export default Home