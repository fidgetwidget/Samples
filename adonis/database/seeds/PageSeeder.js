'use strict'

/*
|--------------------------------------------------------------------------
| PageSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const Page = use('App/Models/Page')

class PageSeeder {
  async run () {
    const pages = await Page.all()
    console.log(pages.toJSON())
  }
}

module.exports = PageSeeder
