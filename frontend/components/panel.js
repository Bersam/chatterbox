import React from 'react'
import { Form, Popup, Divider, Button } from 'semantic-ui-react'
import { string, func } from 'prop-types';



const Panel = ({ handleChangeUsername, username, handleChangeEmail, email, handleChangeFilter, filter, handleSearch, handleReset }) => (
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
    <Divider />
    <Form.Field>
      <label>Filter</label>
      <input onChange={handleChangeFilter} value={filter} />
    </Form.Field>
    <Button content='Search' labelPosition='left' icon='search' primary onClick={handleSearch} />
    <Button content='Reset' labelPosition='left' icon='edit' primary onClick={handleReset} />

  </Form>
)

Panel.propTypes = {
  handleChangeEmail: func.isRequired,
  handleChangeUsername: func.isRequired,
  handleChangeFilter: func.isRequired,
  handleSearch: func.isRequired,
  handleReset: func.isRequired,
  username: string.isRequired,
  email: string.isRequired,
  filter: string.isRequired,
};

export default Panel