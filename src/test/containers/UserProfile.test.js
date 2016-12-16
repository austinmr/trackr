import React from 'react'
import { mount } from 'enzyme'

// Component for testing 
import { UserProfile } from '../../containers/UserProfile'

// Testing unconnected COMPONENT 
function setupComponent() {
  const testFn = jest.fn(); 
  const enzymeWrapper = mount(<UserProfile dispatchCreateTemplate={testFn} username="riti"/>)
  return {
    enzymeWrapper,
    testFn
  }
}

describe('UserProfile Component', () => {
  it('should render self', () => {
    const { enzymeWrapper, } = setupComponent(); 
    expect(enzymeWrapper).toHaveLength(1); 
  })

  it('should call dispatchCreateTemplate on click', () => {
    const { enzymeWrapper, testFn } = setupComponent(); 
    const button = enzymeWrapper.find('.template-button')
    expect(button).toHaveLength(1); 

    // It should have dispatchLoginUser property with 0 calls
    expect(enzymeWrapper.props().dispatchCreateTemplate).toBeDefined()
    expect(testFn.mock.calls.length).toBe(0)

    // It should not be called when no username has been entered 
    button.simulate('click', { preventDefault() {} })
    expect(testFn.mock.calls.length).toBe(1)
  })

})

