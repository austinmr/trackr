import React from 'react';
import { shallow } from 'enzyme'
import ExerciseList from '../../components/ExerciseList';

const enzymeWrapper = shallow(<ExerciseList exercises={[{id: 1}]}/>); 

describe('ExerciseList', () => {
  it('renders itself without crashing', () => {
    expect(enzymeWrapper).toHaveLength(1); 
  });

  it('renders its children crashing', () => {
    expect(enzymeWrapper.find('Exercise')).toHaveLength(1); 
  });
});