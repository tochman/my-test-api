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

  class Model {}
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
    // DescribedModel.associate({Lecture})
    subject = await factory.create('User')
    lecture = await factory.create('Lecture')
  })

  // It's important you do this
  after(() => {
    DescribedModel.init.resetHistory()
  })

  // it('is expected to ....', () => {
  //   checkModelName(DescribedModel)('User2')
  // });

  // it.only("is expected to have many lectures", async () => {
  //   await subject.addLecture(lecture)
  //   await subject.save()
  //   expect(await subject.countLectures()).to.equal(1)
  // })

  describe.only('is expected to respond to ', () => {
    it('getLectures', () => {
      expect(subject.getLectures).to.be.an('function');
    });

    it('setLectures', () => {
      expect(subject.setLectures).to.be.an('function');
    });

    it('addLecture', () => {
      expect(subject.addLecture).to.be.an('function');
    });
  });



  it('called User.init with the correct parameters', () => {
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


  it('has a valid factory', () => {
    expect(subject).to.include({
      firstName: 'Kalle',
      lastName: 'Karlsson',
      role: 'student'
    })
  });
});