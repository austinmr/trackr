import React from 'react'
import { mount } from 'enzyme'

// Component for testing 
import { LandingPage } from '../containers/LandingPage'

// Testing unconnected COMPONENT 
function setupComponent() {
  const props = {
    dispatchLoginUser: jest.fn()
  }
  const testFn = jest.fn(); 
  const enzymeWrapper = mount(<LandingPage dispatchLoginUser={testFn}/>)
  return {
    props,
    enzymeWrapper,
    testFn
  }
}

describe('LandingPage Component', () => {
  it('should render self', () => {
    const { enzymeWrapper, } = setupComponent(); 
    expect(enzymeWrapper).toHaveLength(1); 
  })

  it('should call dispatchLoginUser if user logs in', () => {
    const { enzymeWrapper, testFn } = setupComponent(); 
    const logIn = enzymeWrapper.find('form')

    // It should have dispatchLoginUser property with 0 calls
    expect(enzymeWrapper.props().dispatchLoginUser).toBeDefined()
    expect(testFn.mock.calls.length).toBe(0)

    // It should not be called when no username has been entered 
    logIn.simulate('submit', { preventDefault() {} })
    expect(testFn.mock.calls.length).toBe(0)

    // It should be called when username has been entered 
    enzymeWrapper.setState({username: 'riti'})
    expect(enzymeWrapper.state('username')).toBe('riti')
    logIn.simulate('submit', { preventDefault() {} })
    expect(testFn.mock.calls.length).toBe(1)
  })

})

