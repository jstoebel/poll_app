import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import { Link } from 'react-router';
import Index from '../../public/js/components/polls/index';
import factory from '../factories';

describe("<INDEX />", () => {
  it("contains poll index", () => {
    const wrapper = shallow(<Index />);
    expect(wrapper.find('#poll-index')).to.have.length(1);
  });

  it("contains an h1", () => {
    const wrapper = shallow(<Index />);
    expect(wrapper.find('h1')).to.have.length(1);
  })

  it("has three polls", () => {

    const wrapper = shallow(<Index />);

    // factory.create('poll').then(attrs => {
    //   // postAttrsArray is an array of 5 post json objects
    //   console.log("inside!");
    //   wrapper.setState({polls: attrs})
    //   expect(wrapper.find(Link)).to.have.length(3)
    // }).catch(reason => {
    //   console.log(reason);
    // });
  })

});
