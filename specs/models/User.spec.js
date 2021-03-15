const { expect, factory } = require('../helpers')
// const {
//   sequelize,
//   dataTypes,
//   checkModelName,
//   checkPropertyExists
// } = require('sequelize-test-helpers')

// const User  = require('../../models/user')

// describe.only('User', () => {
//   const DescribedModel = User(sequelize, dataTypes)
//   const subject = new DescribedModel()

// });

const { spy } = require('sinon')
const proxyquire = require('proxyquire')
const { sequelize, Sequelize, dataTypes: DataTypes } = require('sequelize-test-helpers')

describe.only('User', () => {
  const User = proxyquire('../../models/user', {
    sequelize: Sequelize
  })


  let DescriberModel, subject

  before( async() => {
    DescriberModel = User(sequelize, DataTypes)
    subject = await factory.create('User')
  })

  // It's important you do this
  after(() => {
    DescriberModel.init.resetHistory()
  })

  it('called User.init with the correct parameters', () => {
    expect(DescriberModel.init).to.have.been.calledWith(
      {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        role: DataTypes.STRING
      },
      {
        sequelize,
        modelName: 'User'
      }
    )
  })


  it('has a valid factory', () => {
    expect(subject).to.include({
      firstName: 'Kalle',
      lastName: 'Karlsson',
      role: 'student'
    })
  });
});