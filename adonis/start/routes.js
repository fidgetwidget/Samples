'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

const Route = use('Route')
const Config = use('Config')

/*
 | Api Rotues
*/

Route.group(() => {
  // name/slug shorthand routes : GET only
  Route.get('p', 'PageController.index')
  Route.get('p/:name', 'PageController.show')
  Route.get('p/:name/all', 'PostController.index')
  Route.get('p/:name/:slug', 'PostController.show')

  // more standard rest-ish routes
  Route.resource('pages', 'PageController').apiOnly()
  Route.resource('pages.posts', 'PostController').apiOnly()

}).prefix('api/v1')

/*
 | Test Pages
*/

Route.on('/').render('welcome')

// Page
Route.on('/pages').render('pages')
Route.get('/page', 'PageController.form')
Route.post('/page', 'PageController.submit')
Route.get('/page/:id', 'PageController.form')
Route.post('/page/:id', 'PageController.submit')

// Post
Route.on('/posts').render('posts')
Route.get('/page/:page_id/post', 'PostController.form')
Route.post('/page/:page_id/post', 'PostController.submit')
Route.get('/page/:page_id/post/:id', 'PostController.form')
Route.post('/page/:page_id/post/:id', 'PostController.submit')
