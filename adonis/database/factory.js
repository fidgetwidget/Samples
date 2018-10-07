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

Factory.blueprint('App/Models/User', (faker, i, data) => {
  return {
    username: faker.username(),
    email: faker.email(),
    password: data.password ? data.password : 'password'
  }
})

Factory.blueprint('App/Models/Page', (faker, i, data) => {
  return {
    name: data.name ? data.name : faker.word(),
    title: faker.sentence(),
    subtitle: faker.sentence(),
    content: faker.paragraph()
  }
})

// Requires a user and page
Factory.blueprint('App/Models/Post', (faker, i, data) => {
  return {
    page_id: data.page_id,
    user_id: data.user_id,
    slug: data.slug ? data.slug : null,
    title: faker.sentence(),
    content: faker.paragraph(),
  }
})
