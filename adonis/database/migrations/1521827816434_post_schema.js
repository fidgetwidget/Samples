'use strict'

const Schema = use('Schema')

class PostSchema extends Schema {
  up () {
    this.create('posts', (table) => {
      table.increments()
      table.integer('user_id').nullable().unsigned().references('users.id')
      table.integer('page_id').nullable().unsigned().references('pages.id')

      table.string('slug', 80).notNullable().unique()
      table.string('title').notNullable()

      table.text('content').notNullable()
      table.json('raw_tags').defaultTo("{}")

      table.timestamps()
    })
  }

  down () {
    this.drop('posts')
  }
}

module.exports = PostSchema
