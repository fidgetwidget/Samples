'use strict'

/*
|--------------------------------------------------------------------------
| PostSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const Post = use('App/Models/Post')

class PostSeeder {
  async run () {
    const posts = await Post.all()
    console.log(posts.toJSON())
  }
}

module.exports = PostSeeder
