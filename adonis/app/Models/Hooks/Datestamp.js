'use strict'

const DatestampHook = module.exports = {}

DatestampHook.createdAt = async (instance) => {
  instance.created_at = Date.now()
}

DatestampHook.updatedAt = async (instance) => {
  instance.updated_at = Date.now()
}
