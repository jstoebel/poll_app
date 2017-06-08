import React from 'react';
import d3 from 'd3';
import {expect} from 'chai';
import {shallow, mount, render} from 'enzyme';
import {Link} from 'react-router';
import Legend from '../../public/js/components/polls/legend';
import factory from '../factories';
import sinon from 'sinon';
import _ from 'underscore';

// https://github.com/airbnb/enzyme/issues/341
import jsdom from 'jsdom';
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.document = doc;
global.window = doc.defaultView;

describe('<Legend />', () => {
  let pieData,
    legendProps,
    wrapper;

  beforeEach((done) => {
    pieData = [
      {label: 'spam', votes: 1},
      {label: 'eggs', votes: 2},
    ];

    legendProps = {
      data: pieData,
      colors: d3.scale.category10(),
    };

    wrapper = mount(<Legend {...legendProps} />);
    done();
  });

  it('has an ul', (done) => {
    expect(wrapper.find('ul')).to.have.length(1);
    done();
  });

  describe('legend elements', () => {
    it('has two li elements', (done) => {
      expect(wrapper.find('li')).to.have.length(2);
      done();
    });

    it('li elements have proper names', (done) => {
      wrapper.find('li').forEach( (node, i) => {
        expect(node.text()).to.equal(pieData[i].label);
      });
      done();
    });

    it('li elements have proper colors', (done) => {
      wrapper.find('li').forEach( (node, i) => {
        expect(node.props().style.color).to.equal(legendProps.colors(i));
      });
      done();
    });
  });
});
