'use strict'

const Schema = use('Schema')

class PageSchema extends Schema {
  up () {
    this.create('pages', (table) => {
      table.increments()
      table.string('name').notNullable().unique()

      table.string('title').notNullable()
      table.string('subtitle').nullable()

      table.text('content').notNullable()

      table.timestamps()
    })
  }

  down () {
    this.drop('pages')
  }
}

module.exports = PageSchema
