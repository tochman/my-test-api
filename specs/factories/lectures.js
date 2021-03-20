module.exports = (factory, Models) => {
  factory.define('Lecture', Models.Lecture, {
    title: 'NodeJs',
    description: 'Whatever....',
    createdAt: new Date(),
    updatedAt: new Date()
  });
};