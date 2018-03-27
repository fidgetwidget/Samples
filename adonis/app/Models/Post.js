'use strict'

const Model = use('Model')

class Post extends Model {
  static boot () {
    super.boot()
    this.addTrait('Slugify', { target: 'title' })
    this.addTrait('Datestamp')
  }

  page () {
    return this.belongsTo('App/Models/Page')
  }

  owner () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Post
