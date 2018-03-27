'use strict'

const Page = use('App/Models/Page')

const { validate } = use('indicative')
const validParams = ['name', 'title', 'subtitle', 'content']

class PageController {

  async form ({ params, view, response }) {
    let page
    if (params.id) {
      try {
        page = await Page.findOrFail(params.id)  
      } catch(e) {
        console.error(e)
        return response.status(404).send(e)
      }
    } else {
      page = new Page()
    }

    return view.render('page.form', { page })
  }

  async submit ({params, request, response, view }) {
    let page
    if (params.id) {
      try {
        page = await Page.findOrFail(params.id)  
      } catch(e) {
        console.error(e)
        return response.status(404).send(e)
      }
    } else {
      page = new Page()
    }

    const rules = {} // TODO: add validation
    const inputs = request.only(validParams)
    try {
      await validate(inputs, rules)
    } catch(e) {
      console.error(e)
      return response.send(e)
    }

    page.merge(inputs)

    try {
      await page.save()
    } catch(e) {
      console.error(e)
      return response.send(e)
    }
    
    return view.render('page.form', { 
      page, 
      notification: {
        success: true,
        message: "Save Success!"
      } 
    })
  }


  async index () {
    const pages = await Page.all()
    return pages.toJSON()
  }

  async store ({ request, response }) {
    const rules = {
      // TODO: add validation
    }
    const inputs = request.only(validParams)
    try {
      await validate(inputs, rules)
    } catch(e) {
      console.error(e)
      response.send(e)
    }
    
    let page
    try {
      page = await Page.create(inputs)
    } catch(e) {
      console.error(e)
      return response.send(e)
    }

    return response.send({success: true, id: page.id})
  }

  async show ({ params, response }) {
    const { name } = params
    const page = await Page.query().where('name', name).first()
    
    if (!page) {
      return response.send({ message: 'Page Not Found'})
    }

    return response.send(page.toJSON())
  }

  async update ({ params, request, response }) {
    const { id } = params
    const page = await Page.find(id)

    if (!page) {
      return response.send({ message: 'Page Not Found'})
    }

    const rules = {} // TODO: add validation
    const inputs = request.only(validParams)
    try {
      await validate(inputs, rules)
    } catch(e) {
      console.error(e)
      return response.send(e)
    }

    page.merge(inputs)

    try {
      await page.save()
    } catch(e) {
      console.error(e)
      return response.send(e)
    }

    return response.send({ success: true, page: page.toJSON()})
  }

  async destroy ({ params, response }) {
    const { id } = params
    const page = await Page.find(id)

    if (!page) {
      return response.send({ message: 'Page Not Found'})
    }
    if (await page.posts().getCount()) {
      return response.send({ message: 'Page has Posts. Delete Posts before deleting Page.'})
    }

    await page.delete()
    return response.send({ success: true })
  }
}

module.exports = PageController
