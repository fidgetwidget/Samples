'use strict'

const slugify = use('slugify')

class Slugify {
  register (Model, customOptions = {}) {
    const defaultOptions = {
      field: 'slug',
      
      // slugify a target field to generate the slug
      // if target is false, use tmp-timestamp
      ensureExists: true,
      target: 'name',
      
      // check to ensure the slug is unique, 
      // and append a count of similar to the slug
      ensureUnique: true,
      primaryKey: 'id', // don't include self in the query to test uniqueness
    }
    const options = Object.assign(defaultOptions, customOptions)

    Model.addHook('beforeSave', async function (modelInstance) {
      let id, slug, name, query
      id = modelInstance[options.primaryKey]
      slug = modelInstance[options.field]
      name = options.target ? modelInstance[options.target] : false

      if (!slug && options.ensureExists) {
        if (name) {
          slug = slugify(name)
        } else {
          slug = `tmp-${+Date.now()}`
        }
      }
      
      if (slug && options.ensureUnique) {
        query = Model.query().where(function () {
          this.where(options.field, slug)
            .orWhere(options.field, 'like', `${slug}-%`)
        })
        if (id) {
          query.where(options.primaryKey, '<>', id)
        }
        const count = await query.getCount()
        if (count > 0) {
          slug += `-${count+1}`
        }
      }

      modelInstance[options.field] = slugify(slug)
    })
  }

}

module.exports = Slugify
