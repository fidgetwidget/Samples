'use strict'

const slugify = use('slugify')

const Page = use('App/Models/Page')

const PageHook = module.exports = {}

PageHook.ensureName = async (pageInstance) => {
  
  if (pageInstance.name) {
    let query = Page.query().where('name', pageInstance.name)
    if (pageInstance.id) {
      query.where('id', '<>', pageInstance.id)
    }
    const count = await query.getCount()
    if (count > 0) {
      console.log('page named '+pageInstance.name+' changed.')
      pageInstance.name = `${pageInstance.name}-${count}`
    }
  } else {
    const count = Page.getCount()
    pageInstance.name = `page-${count}`
  }
}
