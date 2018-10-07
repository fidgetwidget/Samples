'use strict'

const Page = use('App/Models/Page')
const Post = use('App/Models/Post')

const { validate } = use('indicative')
const validParams = ['page_id', 'slug', 'title', 'content']

class PostController {

  async form ({ params, view, response }) {
    let page, post
    try {
      page = await Page.findOrFail(params.page_id)
    } catch(e) {
      console.error(e)
      return response.status(404).send(e)
    }

    if (params.id) {
      try {
        post = await Post.findOrFail(params.id)
      } catch(e) {
        console.error(e)
        return response.status(404).send(e)
      }
    } else {
      post = new Post()
      post.page_id = page.id
    }

    return view.render('post.form', { page, post })
  }

  async submit ({ params, request, response, view }) {
    let page, post
    try {
      page = await Page.findOrFail(params.page_id)
    } catch(e) {
      console.error(e)
      return response.status(404).send(e)
    }

    if (params.id) {
      try {
        post = await Post.findOrFail(params.id)
      } catch(e) {
        console.error(e)
        return response.status(404).send(e)
      }
    } else {
      post = new Post()
    }

    const rules = {
      page_id: 'required',
      user_id: 'required'
    }
    const inputs = request.only(validParams)
    inputs.user_id = 1
    try {
      await validate(inputs, rules)
    } catch(e) {
      console.error(e)
      return response.send(e)
    }

    post.merge(inputs)

    try {
      await post.save()
    } catch(e) {
      console.error(e)
      return response.send(e)
    }
    
    return view.render('post.form', { 
      page,
      post, 
      notification: {
        success: true,
        message: "Save Success!"
      } 
    })
  }


  async index ({ params, response }) {
    let page
    if (params.name) {
      page = await Page.query().where('name', params.name).first()
    } else if (params.pages_id) {
      page = await Page.find(params.pages_id)
    }

    if (!page) {
      return response.status(404).send({ message: 'Page Not Found'})
    }

    const posts = await page.posts().fetch()
    return posts.toJSON()
  }

  async store ({ request, response }) {
    const rules = {
      page_id: 'required',
      user_id: 'required',
    }
    const inputs = request.only(validParams)
    inputs.user_id = 1 // NOTE: this shouldn't be a hard coded value
    try {
      await validate(inputs, rules)
    } catch(e) {
      console.error(e)
      response.send(e)
    }
    
    let post
    try {
      post = await Post.create(inputs)
    } catch(e) {
      console.error(e)
      return response.send(e)
    }

    return response.send({success: true, id: post.id})
  }

  async show ({ params, response }) {
    let page, post

    if (params.name) {
      page = await Page.query().where('name', params.name).first()
    } else if (params.page_id) {
      page = await Page.find(params.page_id)
    }

    if (!page) {
      return response.status(404).send({ message: 'Page Not Found'})
    }

    if (params.slug) {
      post = await page.posts().where('slug', params.slug).first()
    } else if (params.id) {
      post = await page.posts().where('id', params.id).first()
    }

    if (!post) {
      return response.status(404).send({ message: 'Post Not Found'})
    }

    return response.send(post.toJSON())
  }

  async update ({ params, response }) {
    const { id } = params
    const post = await Post.find(id)

    if (!post) {
      return response.send({ message: 'Page Not Found'})
    }

    const rules = {
      // TODO: add validation
    } 
    const inputs = request.only(validParams)
    try {
      await validate(inputs, rules)
    } catch(e) {
      console.error(e)
      return response.send(e)
    }

    post.merge(inputs)

    try {
      await post.save()
    } catch(e) {
      console.error(e)
      return response.send(e)
    }

    return response.send({ success: true, post: post.toJSON() })
  }

  async destroy ({ params, response }) {
    const { id } = params
    const post = await Post.find(id)

    if (!post) {
      return response.status(404).send({ success: false, message: 'Post Not Found' })
    }

    try {
      await post.delete()
    } catch (e) {
      console.error(e)
      return response.status(500).send({ success: false })
    }
    
    return response.send({ success: true })
  }
}

module.exports = PostController
