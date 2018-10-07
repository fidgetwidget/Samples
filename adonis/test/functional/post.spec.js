'use strict'

// includes
const { test, before, trait } = use('Test/Suite')('Post')
const Config = use('Config')
const Factory = use('Factory')

const Post = use('App/Models/Post')
const Page = use('App/Models/Page')
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

// global values used across multiple tests
let user_id, page_id

before(async () => {
  user_id = Config.get('testing.user_id')
  page_id = Config.get('testing.page_id')
  let user, page
  
  // Ensure we have a user for the given user_id
  user = await User.find(user_id)
  if (!user) {
    user = Factory.model('App/Models/User').make()
    await user.save()
    user_id = user.id
  }

  // Ensure we have a page for the given page_id
  page = await Page.find(page_id)
  if (!page) {
    page = Factory.model('App/Models/Page').make({
      name: `post-spec-page-${+Date.now()}`
    })
    await page.save()
    page_id = page.id
  }
})

test('getting a list of posts for a given page', async ({ chance, client, assert }) => {
  const blob = {
    name: `page-spec-${+Date.now()}`,
    title: chance.word(),
    content: chance.paragraph()
  }
  const page = await Page.create(blob)
  const pageExistsRes = await client.get(`/api/v1/pages/${page.id}`).end()
  pageExistsRes.assertStatus(200)
  pageExistsRes.assertJSONSubset(blob)

  const postsEmptyRes = await client.get(`/api/v1/pages/${page.id}/posts`).end()
  postsEmptyRes.assertStatus(200)
  postsEmptyRes.assertJSON([])

  const count = 5
  for (let i = 0; i < count; i++) {
    await Post.create({
      page_id: page.id,
      user_id: user_id,
      title: `Page ${page.id}'s Post ${i+1}`,
      content: chance.paragraph()
    })
  }

  const postsCheckRes = await client.get(`/api/v1/pages/${page.id}/posts`).end()
  postsCheckRes.assertStatus(200)
  assert.equal(postsCheckRes.body.length, count)
})

test('getting a post from the shorthand route', async ({ chance, client }) => {
  const page = await Page.find(page_id)
  const blob = {
    page_id,
    user_id,
    title: chance.word(),
    content: chance.paragraph(),
    slug: `shorthand-test-slug-${+Date.now()}`
  }
  await Post.create(blob)

  const response = await client.get(`api/v1/p/${page.name}/${blob.slug}`).end()
  response.assertStatus(200)
  response.assertJSONSubset(blob)
})

test('creating then deleting a post', async ({ client }) => {
  const blob = {
    page_id,
    user_id,
    title: `Unique Title ${+Date.now()}`,
    content: `Unique Content ${+Date.now()}`
  }
  const post = await Post.create(blob)

  const confirmCreateRes = await client.get(`api/v1/pages/${page_id}/posts`).end()

  confirmCreateRes.assertStatus(200)
  confirmCreateRes.assertJSONSubset([{
    id: post.id,
    ...blob
  }])

  const confirmDeleteRes = await client.delete(`api/v1/pages/${page_id}/posts/${post.id}`).end()

  confirmDeleteRes.assertStatus(200)
  confirmDeleteRes.assertJSONSubset({
    success: true,
  })
})
