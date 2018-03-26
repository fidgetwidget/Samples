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
    }

    return view.render('post.form', { page, post })
  }

  async submit ({params, request, response, view }) {
    
  }


  async index () {
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
