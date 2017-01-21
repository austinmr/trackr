import React from 'react'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux';

import Container, { AddExercise } from '../../containers/Template'
import configureStore from '../../store/configureStoreTest'

function setupComponent() {
  const props = {
    dispatchAddExercise: jest.fn(),
  }

  const componentWrapper = shallow(<AddExercise {...props}/>); 

  return {
    props,
    componentWrapper
  }
}

describe('Template', () => {
  it('should render self and components', () => {
    const { componentWrapper } = setupComponent()
    expect(componentWrapper).toHaveLength(1)
  })

  it('should call dispatchAddExercise onSubmit', () => {
    const { componentWrapper, props } = setupComponent()
    const form = componentWrapper.find('.AddExerciseForm')
    expect(componentWrapper.props().dispatchAddExercise).toBeDefined()
    expect(props.dispatchAddExercise.mock.calls.length).toBe(0)
    form.simulate('submit', { preventDefault() {} })
    expect(props.dispatchAddExercise.mock.calls.length).toBe(1)
  })
})

// function setupContainer() {
//   const props = {
//     username: 'riti',
//     template: {},
//     exercises: [],
//     dispatchSaveTemplate: jest.fn(),
//     store: {}
//   }

//   const store = configureStore()

//   const containerWrapper = mount(
//     <Provider store={store}>
//       <Container {...props} />
//     </Provider>
//   )

//   return {
//     props,
//     containerWrapper
//   }
// }


