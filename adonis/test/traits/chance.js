
'use strict'
const Chance = use('chance')
let chanceInstance

module.exports = function (suite) {
  if (!chanceInstance || !(chanceInstance instanceof Chance)) {
    chanceInstance = new Chance()
  }
  
  suite.Context.getter('chance', () => {
    return chanceInstance
  })
}
