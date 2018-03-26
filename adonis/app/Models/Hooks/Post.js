'use strict'

const slugify = use('slugify')

const Page = use('App/Models/Page')
const Post = use('App/Models/Post')

const PostHook = module.exports = {}

PostHook.createSlug = async (postInstance) => {
  const page = await Page.find(postInstance.page_id)

  if (postInstance.title) {
    let slug = slugify(postInstance.title)
    const count = await Post.query().where('slug', 'like', slug+'%').getCount()
    if (count > 0) {
      slug += `-${count}`
    }
    postInstance.slug = slug
  } else {
    const count = Post.query().where('page_id', page.id).getCount() + 1
    postInstance.slug = page.name + '-' + count
  }
}
