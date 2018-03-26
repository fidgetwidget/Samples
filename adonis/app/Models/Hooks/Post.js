'use strict'

const slugify = use('slugify')

const Page = use('App/Models/Page')

const PostHook = module.exports = {}

PostHook.createSlug = async (postInstance) => {
  if (postInstance.title) {
    postInstance.slug = slugify(postInstance.title)
  } else {
    const page = await Page.find(postInstance.page_id).with('posts')
    const count = page.posts.length + 1
    postInstance.slug = page.name + '-' + count
  }
}
