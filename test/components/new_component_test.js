import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import { Link } from 'react-router';
import New from '../../public/js/components/polls/new';
import factory from '../factories';
import sinon from 'sinon';

// https://github.com/airbnb/enzyme/issues/341
import jsdom from 'jsdom'
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.document = doc
global.window = doc.defaultView

describe("<NEW />", () => {

  var wrapper;

  beforeEach( done => {
    wrapper = mount(<New />);
    done();
  })

  describe("flashes", () => {
    it("contains flash messages", (done) => {
      const flashes = [
        {msg: "Test flash", success: true},
        {msg: "Another flash", success: false}
      ]
      wrapper.setState({flashes: flashes})
      expect(wrapper.find('.alert')).to.have.length(flashes.length);
      expect(wrapper.find('.alert').first().text()).to.equal("×Test flash")
      done();
    }); // it

    var statuses = [
      {success: true, append: "success"},
      {success: false, append: "danger"}
    ]

    statuses.forEach( (status) => {
      it(`displays as ${status.append} flash`, (done) => {
        const flashes = [
          {msg: "Test flash", success: status.success}
        ]
        wrapper.setState({flashes: flashes})
        expect(wrapper.find('.alert').hasClass(`alert-${status.append}`)).to.equal(true);
        done();
      }) // it
    })

  }) // describe flashes

  describe("form", () => {

    it("has a name submit box", done => {
      expect(wrapper.find('input').first().props().name).to.equal("pollName")
      done();
    })

    it("responds to name change", done => {

      const event = {target: {name: "pollName", value: "spam"}};
      wrapper.ref("pollName").simulate("change", event);
      expect(wrapper.state("pollName")).to.equal("spam");
      done();
    })

    it("renders name based on state", done => {
      wrapper.setState({
        pollName: "spam"
      })
      expect(wrapper.ref('pollName').props().value).to.equal("spam")
      done();
    })

    it("has an options box", done => {
      expect(wrapper.find('textarea').props().name).to.equal("pollOptions")
      done();

    })

    it("responds to options change", done => {
      const event = {target: {name: "pollOptions", value: "spam\neggs"}};
      wrapper.ref("pollOptions").simulate("change", event);
      expect(wrapper.state("pollOptions")).to.equal("spam\neggs");
      done();

    })

    it("renders options based on state", done => {
      wrapper.setState({
        pollOptions: "spam"
      })
      expect(wrapper.ref('pollOptions').props().value).to.equal("spam")
      done();
    })


    it("responds to submit", done => {
      sinon.spy(New.prototype, "handleSubmit");
      const newWrapper = mount(<New />);
      newWrapper.find(".btn").simulate('submit');
      expect(New.prototype.handleSubmit.calledOnce).to.equal(true);

      done();

    })

  })

});
