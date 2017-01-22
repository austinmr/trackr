import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'

import { Template } from '../../containers/Template/Template'
import configureStore from '../../store/configureStoreTest'

function setup() {
  const props = {
    username: 'riti',
    template: {},
    exercises: [],
    dispatchSaveTemplate: jest.fn(),
    store: {}
  }

  const store = configureStore()

  const enzymeWrapper = mount(
    <Provider store={store}>
      <Template {...props} />
    </Provider>
  )

  return {
    props,
    enzymeWrapper
  }
}

describe('components', () => {
  describe('Template', () => {
    it('should render self and components', () => {
      const { enzymeWrapper } = setup()
      expect(enzymeWrapper.find('h2').text()).toBe('New Trackr Workout')

      const AddExercise = enzymeWrapper.find('AddExercise')
      expect(AddExercise).toHaveLength(1); 

      const ExerciseList = enzymeWrapper.find('ExerciseList')
      expect(ExerciseList).toHaveLength(1); 
      // Testing b/c functional stateless component
      expect(ExerciseList.props().exercises).toBeDefined()

    })

    it('should call dispatchSaveTemplate onClick', () => {
      const { enzymeWrapper, props } = setup()
      const templateComponent = enzymeWrapper.find(Template)
      const button = enzymeWrapper.find('.saveTemplate')
      expect(templateComponent.props().dispatchSaveTemplate).toBeDefined()
      expect(props.dispatchSaveTemplate.mock.calls.length).toBe(0)
      button.simulate('click', { preventDefault() {} })
      expect(props.dispatchSaveTemplate.mock.calls.length).toBe(1)
    })
  })
})