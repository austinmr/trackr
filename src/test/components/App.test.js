// Basic example of smoke test using enzyme shallow render to avoid 'document undefined' error from ReactDOM.render() test

import React from 'react';
import { shallow } from 'enzyme'
import App from '../../components/App';

const enzymeWrapper = shallow(<App/>); 

describe('App', () => {
  it('renders without crashing', () => {
    expect(enzymeWrapper).toHaveLength(1); 
  });
});