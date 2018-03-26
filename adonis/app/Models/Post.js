'use strict'

const Model = use('Model')

class Post extends Model {
  static boot () {
    super.boot()
    this.addHook('beforeCreate', 'Datestamp.createdAt')
    this.addHook('beforeSave', 'Datestamp.updatedAt')
  }

  page () {
    return this.belongsTo('App/Models/Page')
  }

  owner () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Post
