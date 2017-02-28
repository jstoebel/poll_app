### `TypeError: Super expression must either be null or a function, not undefined`

this is the right way to set up a components

    import React, {Component} from 'react';


    class App extends React.Component {

if you get `TypeError: Super expression must either be null or a function, not undefined`

it means the thing you are trying to extend from is undefined. Either you imported the base class wrong or misspelled
