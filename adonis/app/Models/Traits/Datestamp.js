'use strict'

class Datestamp {
  register (Model, customOptions = {}) {
    const defaultOptions = {
      created_at: true,
      updated_at: true,
    }
    const options = Object.assign(defaultOptions, customOptions)

    if (options.created_at) {
      Model.addHook('beforeCreate', function (modelInstance) {
        modelInstance.created_at = Date.now()
      })  
    }
    
    if (options.updated_at) {
      Model.addHook('beforeSave', function (modelInstance) {
        modelInstance.updated_at = Date.now()
      })
    }
  }
}

module.exports = Datestamp
