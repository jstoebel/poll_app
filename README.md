# voting
a voting app as an assignment with Freecodecamp.com. It was built using MERN stack (MongoDB, Express, React and Node).

This codebase is built using [this](https://github.com/sahat/hackathon-starter/tree/es5) as boilerplate

# User stories

  - User Story: As an authenticated user, I can keep my polls and come back later to access them.

  - User Story: As an authenticated user, I can share my polls with my friends.

  - User Story: As an authenticated user, I can see the aggregate results of my polls.

  - User Story: As an authenticated user, I can delete polls that I decide I don't want anymore.

  - User Story: As an authenticated user, I can create a poll with any number of possible items.

  - User Story: As an unauthenticated or authenticated user, I can see and vote on everyone's polls.

  - User Story: As an unauthenticated or authenticated user, I can see the results of polls in chart form. (This could be implemented using Chart.js or Google Charts.)

  - User Story: As an authenticated user, if I don't like the options on a poll, I can create a new option.

# Wireframe

The core features of this app are implemented in with React router. The specfic views are:

 - Index view (accessible to all users)
    - Users can select a poll to views

  - Show view (accessible to all users)
    - users can vote on the poll
    - users can submit new options for that poll
    - users can see a pie chart (in D3) displaying results
  - New view (accessible to authenticated users)
    - users can submit a poll name with some possible options
  - admin view (accessible to authenticated users)
    - users can see their own polls.
    - users can remove their own polls
    - users can share their own polls on twitter.

# Notes

Using D3 within a React component was a bit of a learning experience. [This blog post](http://www.jstoebel.com/getting-react-and-d3-to-play-nice/) outlines how I did it:
