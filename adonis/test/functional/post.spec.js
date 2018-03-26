'use strict'

const { test, trait } = use('Test/Suite')('Post')

const Post = use('App/Models/Post')

trait('Test/ApiClient')

test('get list of posts', async ({ client }) => {
  await Post.create({
    page_id: 1,
    user_id: 1,
    title: 'Post Title',
    content: 'Post content'
  })

  const response = await client.get('api/v1/pages/1/posts').end()

  response.assertStatus(200)
  response.assertJSONSubset([{
    title: 'Post Title',
    content: 'Post content'
  }])
})
