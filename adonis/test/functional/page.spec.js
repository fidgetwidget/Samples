'use strict'

const { test, trait } = use('Test/Suite')('Page')

const Page = use('App/Models/Page')

trait('Test/ApiClient')

test('get list of pages', async ({ client }) => {
  await Page.create({
    name: 'example',
    title: 'Example Post',
    subtitle: 'Subtitle Example',
    content: 'Page content'
  })

  const response = await client.get('/api/v1/pages').end()

  response.assertStatus(200)
  response.assertJSONSubset([{
    name: 'example',
    title: 'Example Post',
    subtitle: 'Subtitle Example',
    content: 'Page content'
  }])
})
