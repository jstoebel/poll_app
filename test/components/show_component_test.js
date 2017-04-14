import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import { Link } from 'react-router';
import Show from '../../public/js/components/polls/show';
import factory from '../factories';
import mongoose from 'mongoose'

describe("<SHOW />", () => {

  var wrapper;

  beforeEach( done => {

    factory.attrs('poll').then(poll => {
        wrapper = shallow(<Show />);

        var newData = poll.options.map(function(option, i){
          return {value: option.votes, label: `${option.name}: ${option.votes}`}
        })

        wrapper.setState({
          poll: poll,
          pieData: newData
        })

        wrapper.setProps({
          containerWidth: 100
        })

        done();
      }).catch(reason => {
        done(reason);
      })
  })

  it("contains an h1 with right title", (done) => {
    expect(wrapper.find('h1').at(0)).to.have.length(1)
    done();
  });

  describe("pie chart", () => {

    it("contains an svg with correct height and width", (done) => {
      var svg = wrapper.find('svg')

      expect((svg.props()).to.have.property('width', '40'));
      expect((svg.props()).to.have.property('height', '40'));
      done();
    })


  })





  // use setProps on wrapper element to inject react router params
});
