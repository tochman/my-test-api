module.exports = (factory, Models) => {
  factory.define('User', Models.User, {
    firstName: 'Kalle',
    lastName: 'Karlsson',
    age: 40,
    role: 'student',
    createdAt: new Date(),
    updatedAt: new Date()
  });
};