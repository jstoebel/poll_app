import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import { Link } from 'react-router';
import Show from '../../public/js/components/polls/show';
import factory from '../factories';

describe("<SHOW />", () => {

  var wrapper;

  beforeEach( () => {
    wrapper = shallow(<Show />);
  })

  it("contains an h1", (done) => {
    // expect(wrapper.find('h1').at(0)
  });

  // it("contains poll a container-fluid", (done) => {
  //
  // });

  // it("contains poll a ", (done) => {
  //
  // });




  // use setProps on wrapper element to inject react router params
});
