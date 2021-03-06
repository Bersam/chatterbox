import React from 'react'
import { Comment } from 'semantic-ui-react'
import { string, shape, arrayOf } from 'prop-types';

import Message from './message'


const Messages = ({ messages, filter }) => (
  <Comment.Group size='big' minimal style={{overflow: 'auto', maxHeight: '70vh', maxWidth: '100%'}}>
    {messages.map((message) => (
      <Message message={message} key={message.timestamp} filter={filter} />
    ))}
  </Comment.Group>
)

Message.propTypes = {
  messages: arrayOf({
    message: shape({
      username: string.isRequired,
      message: string.isRequired,
      timestamp: string.isRequired,
      email: string,
    })
  }),
  filter: string
};

export default Messages