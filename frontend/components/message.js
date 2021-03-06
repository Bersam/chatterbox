import React from 'react'
import Gravatar from 'react-gravatar'
import Moment from 'react-moment'
import Highlighter from "react-highlight-words";
import { Comment } from 'semantic-ui-react'

import { string, shape } from 'prop-types';


const Message = ({ message, filter }) => (
  <Comment>
    <div className="avatar">
      <Gravatar email={message.email || 'default'} className="avatar" size={200} />
    </div>
    <Comment.Content>
      <Comment.Author as='a'>{message.username}</Comment.Author>
      <Comment.Metadata>
        <Moment date={message.timestamp} fromNow />
      </Comment.Metadata>
      <Comment.Text>
        <Highlighter
          highlightClassName="highlight"
          searchWords={[filter]}
          autoEscape={true}
          textToHighlight={message.message}
        />
      </Comment.Text>
    </Comment.Content>
  </Comment>
)

Message.propTypes = {
  message: shape({
    username: string.isRequired,
    message: string.isRequired,
    timestamp: string.isRequired,
    email: string,
    filter: string
  })
};

export default Message