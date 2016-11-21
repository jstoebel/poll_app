// use it like this.
var factory = require('./spam');
// console.log(factory)
console.log("here!")

factory.build('user').then(function(user){
  console.log(user);
});
