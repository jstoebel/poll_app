import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import { Link } from 'react-router';
import PieChart from '../../public/js/components/polls/pie_chart';
import Arc from '../../public/js/components/polls/arc';
import factory from '../factories';
import sinon from 'sinon';

// https://github.com/airbnb/enzyme/issues/341
import jsdom from 'jsdom'
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.document = doc
global.window = doc.defaultView

describe("<PieChart />", () => {

  var wrapper,
    pieData;

  beforeEach( done => {

    factory.attrs('poll')
      .then( attrs => {

        pieData = attrs.options.map( (option, i) =>{
          return {value: option.votes, label: `${option.name}: ${option.votes}`}
        } )

        const colorsStub = (i) => {
          return "#000000"
        }

        wrapper = shallow(<PieChart
          x={100} y={100}  data={pieData} outerRadius={100} innerRadius={100}
          colors={colorsStub}
        />);

        done();
      }).catch( err => {
        done(err)
      })
  })

  it("contains an Arc", done => {
    expect(wrapper.find(Arc)).to.have.length(1);
    done();
  })

});
