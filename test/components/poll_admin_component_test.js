import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import { Link } from 'react-router';
import PollAdmin from '../../public/js/components/polls/poll_admin';
import factory from '../factories';


describe("<PollAdmin />", () => {
  var wrapper;
  var createdPolls

  beforeEach( done => {
    wrapper = mount(<PollAdmin />)

    factory.create('user')
      .then( (user) => {
        factory.attrsMany('poll', 3, {user: user._id})
          .then( (polls) => {

            createdPolls = polls
            wrapper.setState({
              polls: polls
            })
            done();

          }).catch( err =>{
            done(err)
          })
      }).catch( err =>{
        done(err)
      })
  })

  it("has three polls", done => {
    expect(wrapper.find(Link)).to.have.length(3)
    done();
  })

  const icons = ['share', 'trash'];
  icons.forEach( icon => {
      it(`Has links with a ${icon} icon`, done => {
        expect(
            wrapper.find('.row').first().find(`.fa-${icon}`)
          ).to.have.length(1)
        done();
      })
  })

  it("displays the right poll name", done => {
    expect(
      wrapper.find(Link).first().text()
    ).to.equal(createdPolls[0].name)
    done();
  })

  it("links to the right poll", done => {
    expect(
      wrapper.find(Link).first().props().to
    ).to.equal( `/poll/${createdPolls[0]._id}` )
    done();
  })

});
