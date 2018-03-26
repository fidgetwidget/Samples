'use strict'

const Page = use('App/Models/Page')
const Post = use('App/Models/Post')

const { validate } = use('indicative')

class PostController {

  async form ({ params, view, response }) {
    let page, post
    try {
      page = await Page.find(params.page_id)
    } catch(e) {
      return response.redirect('/')
    }

    if (params.id) {
      post = await Post.find(params.id)
    } else {
      post = new Post()
      post.page_id = page.id
    }

    return view.render('post.form', { page, post })
  }

  async submit ({params, request, response, view }) {
    let page, post
    try {
      page = await Page.find(params.page_id)
    } catch(e) {
      return response.redirect('/')
    }

    if (params.id) {
      post = await Post.find(params.id)
    } else {
      post = new Post()
    }

    const rules = {
      page_id: 'required',
      user_id: 'required'
    }
    const inputs = request.only(['page_id', 'title', 'content'])
    inputs.user_id = 1
    try {
      await validate(inputs, rules)
    } catch(e) {
      return response.send(e)
    }

    post.merge(inputs)

    try {
      await post.save()
    } catch(e) {
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


  async index () {
    const posts = await Post.all()
    return posts.toJSON()
  }

  async store () {
  }

  async show () {
  }

  async update () {
  }

  async destroy () {
  }
}

module.exports = PostController
