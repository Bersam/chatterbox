/* eslint-env jest */

import React from 'react'
import renderer from 'react-test-renderer'

import Home from '../pages/index.js'

describe('With Snapshot Testing', () => {
  it('Home shows messages component and panel"', () => {
    const component = renderer.create(<Home />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
