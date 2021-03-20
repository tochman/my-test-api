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
const {
  checkModelName,
  sequelize,
  Sequelize,
  dataTypes: DataTypes } = require('sequelize-test-helpers')

describe('User', () => {

  class Model { }
  Model.init = spy()
  Model.hasMany = spy()

  const mockSq = {
    Model,
    DataTypes
  }


  const Lecture = proxyquire('../../models/lecture', {
    sequelize: mockSq
  })
  const User = proxyquire('../../models/user', {
    sequelize: mockSq
  })

  let DescribedModel, subject

  before(async () => {
    DescribedModel = User(sequelize)
  })

  // It's important you do this
  after(() => {
    DescribedModel.init.resetHistory()
  })

  beforeEach(async () => {
    subject = await factory.create('User')
    lecture = await factory.create('Lecture', { title: 'A lecture on NodeJS testing' })
    await subject.addLecture(lecture)
  })

  it("is expected to have many lectures", async () => {
    expect(await subject.countLectures()).to.equal(1)
  })

  it('is exprected to include the lecture', async () => {
    let collection = await subject.getLectures()
    expect(collection[0].title).to.equal('A lecture on NodeJS testing')
  })

  describe('is expected to respond to ', () => {
    it('getLectures', () => {
      expect(subject.getLectures).to.be.an('function');
    })

    it('setLectures', () => {
      expect(subject.setLectures).to.be.an('function');
    })

    it('addLecture', () => {
      expect(subject.addLecture).to.be.an('function');
    })
  });


  it('is expected to call User.init with the correct parameters', () => {
    expect(DescribedModel.init).to.have.been.calledWith(
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

  it('is expectted to have a valid factory', () => {
    expect(subject).to.include({
      firstName: 'Kalle',
      lastName: 'Karlsson',
      role: 'student'
    })
  });
});