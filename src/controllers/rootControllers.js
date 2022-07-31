const { NOT_FOUND, SERVER_ERROR } = require('../utils/statusCode');

exports.pathWrongPath = async (req, res) => {
  try {
    res.status(NOT_FOUND).send({ message: 'Запрашиваемый ресурс не найден' });
  } catch (err) {
    res.status(SERVER_ERROR).send({ message: err.message });
  }
};
