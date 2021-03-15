const factoryGirl = require('factory-girl')
const adapter = new factoryGirl.SequelizeAdapter()
const factory = factoryGirl.factory
const chai = require('chai')
const expect = chai.expect
const sinonChai = require('sinon-chai')

chai.use(sinonChai)


factory.setAdapter(adapter)

const Models = require('../../models')

factory.cleanUp()
factory.factories = []

require('../factories')(factory, Models)

beforeEach(done => {
  Models.sequelize.sync({ force: true })
    .finally(() => {
      done()
    })
})

module.exports = { expect, factory, Models }