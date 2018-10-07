'use strict'

const { test, trait, before } = use('Test/Suite')('Page')
const Config = use('Config')

const Page = use('App/Models/Page')
const Post = use('App/Models/Post')
const User = use('App/Models/User')

trait('Test/ApiClient')
// trait('DatabaseTransactions')
trait(function (suite) {
  const Chance = use('chance')
  const chance = new Chance()
  suite.Context.getter('chance', () => {
    return chance
  })
})

before(async () => {
  // TODO: setup any cross test data
})

test('getting a list of pages', async ({ chance, client }) => {
  const uniqueName = `page-spec-${+Date.now()}`
  const blob = {
    name: uniqueName,
    title: chance.word(),
    subtitle: chance.word(),
    content: chance.paragraph(),
  }
  await Page.create(blob)

  const response = await client.get('/api/v1/pages').end()

  response.assertStatus(200)
  response.assertJSONSubset([blob])
})

test('getting a page from the shorthand route', async ({ client }) => {
  const uniqueName = `page-spec-${+Date.now()}`
  const blob = {
    name: uniqueName,
    title: 'Example Page',
    subtitle: 'Subtitle Example',
    content: 'Page content'
  }
  await Page.create(blob)

  const response = await client.get(`/api/v1/p/${uniqueName}`).end()
  response.assertStatus(200)
  response.assertJSONSubset(blob)
})
