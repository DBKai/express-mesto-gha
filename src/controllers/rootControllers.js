const { NOT_FOUND } = require('../utils/statusCode');

exports.useWrongPath = async (req, res) => {
  res.status(NOT_FOUND).send({ message: 'Запрашиваемый ресурс не найден' });
};
