'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const Hash = use('Hash')
const User = use('App/Models/User')

class UserSeeder {
  async run () {
    const adminExists = await User.query().where({ username: 'admin' }).getCount() > 0
    let admin
    if (adminExists) {
      admin = await User.query().where({ username: 'admin' }).first()
      admin.email = 'brandonbey@gmail.com'
    } else {
      admin = new User()
      admin.fill({ username: 'admin', email: 'brandonbey@gmail.com' })
    }
    admin.password = await Hash.make('tmpPassword')
    await admin.save()

    const users = await User.all()
    console.log(users.toJSON())
  }
}

module.exports = UserSeeder
