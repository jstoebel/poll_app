import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import { Link } from 'react-router';
import Index from '../../public/js/components/polls/index';
import factory from '../factories';


describe("<INDEX />", () => {
  it("contains poll index", (done) => {
    const wrapper = shallow(<Index />);
    expect(wrapper.find('#poll-index')).to.have.length(1);
    done()
  });

  it("contains an h1", (done) => {
    const wrapper = shallow(<Index />);
    expect(wrapper.find('h1')).to.have.length(1);
    done()
  })

  it("has three poll Links", (done) => {

    const wrapper = shallow(<Index />);

    factory.attrsMany('poll', 3).then(attrs => {
      // postAttrsArray is an array of 3 post json objects
      console.log("inside attrsMany");
      wrapper.setState({polls: attrs})
      expect(wrapper.find(Link)).to.have.length(3)
      done();
    }).catch(reason => {
      done(reason);
    });
  })



});
