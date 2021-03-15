const { User, Lecture } = require('../models')

const usersController = {
  async index(req, res) {
    const users = await User.findAll({
      attributes: ['firstName', 'lastName', 'role'],
      include: [
        { model: Lecture,
          as: 'lectures',
          attributes: ['title']
        }
      ]
    })
    res.send({ users: users })
  }
}

module.exports = usersController