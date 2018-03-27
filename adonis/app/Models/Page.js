'use strict'

const Model = use('Model')

class Page extends Model {
  static boot () {
    super.boot()
    this.addTrait('Slugify', { field: 'name', target: false })
    this.addTrait('Datestamp')
  }

  posts () {
    return this.hasMany('App/Models/Post')
  }
}

module.exports = Page
