/* eslint-env jest */

import { shallow } from 'enzyme'
import React from 'react'

import Messages from '../components/messages.js'

describe('With Enzyme', () => {
  it('App shows "Hello world!"', () => {
    const messages = [{"timestamp":"2019-08-06T11:14:35.285000Z","message":"holla","username":"Loma Gibson","email":"Jaron61@yahoo.com"},{"timestamp":"2019-08-06T11:31:18.942000Z","message":"ss","username":"Annette Bins","email":"Summer47@gmail.com"}]
    const Wrapper = shallow(<Messages messages={messages}/>)

    expect(Wrapper.find('Message')).toBeDefined();
    expect(Wrapper.find('Message')).toHaveLength(messages.length);
  })
})