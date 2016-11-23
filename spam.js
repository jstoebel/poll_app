var factory = require('./test/factories')

factory.create('user').then(function(user){
  console.log(user)
})
