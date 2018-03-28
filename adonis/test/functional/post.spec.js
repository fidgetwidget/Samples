'use strict'

// includes
const { test, before, trait } = use('Test/Suite')('Post')
const Config = use('Config')
const Post = use('App/Models/Post')
const Page = use('App/Models/Page')
const User = use('App/Models/User')

trait('Test/ApiClient')

// global values used across multiple tests
let user_id, page_id

before(async () => {
  user_id = Config.get('testing.user_id')
  page_id = Config.get('testing.page_id')
  let user, page
  
  // Ensure we have a user for the given user_id
  user = await User.find(user_id)
  if (!user) {
    user = await User.create({
      username: `post-spec-user-${+Date.now()}`,
      email: `brandonbey+${+Date.now()}@gmail.com`,
      password: 'pwd'
    })
    user_id = user.id
  }

  // Ensure we have a page for the given page_id
  page = await Page.find(page_id)
  if (!page) {
    page = await Page.create({
      name: `post-spec-page-${+Date.now()}`,
      title: 'Post Spec Test Page',
      content: ''
    })
    page_id = page.id
  }

})

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
