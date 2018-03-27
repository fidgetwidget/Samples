'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

const Factory = use('Factory')

Factory.blueprint('App/Models/User', (faker) => {
  return {
    username: faker.username(),
    email: faker.email(),
    password: 'password'
  }
})

Factory.blueprint('App/Models/Page', (faker) => {
  return {
    name: faker.world(),
    title: faker.sentence(),
    subtitle: faker.sentence(),
    content: faker.paragraph()
  }
})

// Requires a user and page
Factory.blueprint('App/Models/Post', (faker) => {
  return {
    title: faker.sentence(),
    content: faker.paragraph()
  }
})
