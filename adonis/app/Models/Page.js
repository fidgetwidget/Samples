'use strict'

const Model = use('Model')

class Page extends Model {
  static boot () {
    super.boot()
    this.addHook('beforeCreate', 'Datestamp.createdAt')
    this.addHook('beforeSave', 'Datestamp.updatedAt')
  }

  posts () {
    return this.hasMany('App/Models/Post')
  }
}

module.exports = Page
