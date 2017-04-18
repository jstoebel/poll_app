// // TODO This component is trickier because it is wrapped in a react demensions
// // component. This seems to be complicating things emensly and I have no idea
// // how to test for it.
// // I submitted a question here: https://github.com/digidem/react-dimensions/issues/65
//
// import React from 'react';
// import { expect } from 'chai';
// import { shallow, mount, render } from 'enzyme';
// import { Link } from 'react-router';
// import Show from '../../public/js/components/polls/show';
// import factory from '../factories';
// import mongoose from 'mongoose'
//
// // https://github.com/airbnb/enzyme/issues/341
// import jsdom from 'jsdom'
// const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
// global.document = doc
// global.window = doc.defaultView
//
// describe("<SHOW />", () => {
//
//   var wrapper;
//
//   beforeEach( done => {
//
//     factory.attrs('poll').then(poll => {
//
//         wrapper = mount(<Show />)
//
//         var newData = poll.options.map(function(option, i){
//           return {value: option.votes, label: `${option.name}: ${option.votes}`}
//         })
//
//         wrapper.setState({
//           poll: poll,
//           pieData: newData
//         })
//
//         wrapper.setProps({
//           containerWidth: 100
//         })
//
//         done();
//       }).catch(reason => {
//         done(reason);
//       })
//   })
//
//   it("contains an h1 with right title", (done) => {
//
//     console.log(wrapper.html());
//     expect(wrapper.find('h1')).to.have.length(1);
//     done()
//   });
//
// });
