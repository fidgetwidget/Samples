'use strict'

const { test, before, trait } = use('Test/Suite')('Post')

const Post = use('App/Models/Post')
const Page = use('App/Models/Page')
const User = use('App/Models/User')

let user_id = 1
let page_id = 1

trait('Test/ApiClient')

test('get list of posts', async ({ client }) => {
  await Post.create({
    page_id,
    user_id,
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

test('create then delete a post', async ({ client }) => {
  const post = await Post.create({
    page_id,
    user_id,
    title: 'Post Title',
    content: 'Post content'
  })

  const confirmCreateRes = await client.get(`api/v1/pages/${page_id}/posts`).end()

  confirmCreateRes.assertStatus(200)
  confirmCreateRes.assertJSONSubset([{
    id: post.id,
    title: 'Post Title',
    content: 'Post content'
  }])

  const confirmDeleteRes = await client.delete(`api/v1/pages/${page_id}/posts/${post.id}`).end()

  confirmDeleteRes.assertStatus(200)
  confirmDeleteRes.assertJSONSubset({
    success: true,
  })
})
