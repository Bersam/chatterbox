import React from 'react'
import { Form, Popup } from 'semantic-ui-react'
import { string, func } from 'prop-types';



const Panel = ({ handleChangeUsername, username, handleChangeEmail, email }) => (
  <Form reply>
    <Form.Field>
      <label>Username</label>
      <input onChange={handleChangeUsername} value={username} />
    </Form.Field>
    <Popup position='bottom center' content='Your email is used to show your gravatar!' trigger={
      <Form.Field>
        <label>Email</label>
        <input onChange={handleChangeEmail} value={email} />
      </Form.Field>
    } />
  </Form>
)

Panel.propTypes = {
  handleChangeEmail: func.isRequired,
  handleChangeEmail: func.isRequired,
  username: string.isRequired,
  email: string.isRequired,
};

export default Panel