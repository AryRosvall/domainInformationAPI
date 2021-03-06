/**
 * Middleware that receives the request and returns a uniform response for both successful responses and error responses
 * @param  {} req
 * @param  {} res
 * @param  {} message=''
 * @param  {} status=200
 */
exports.success = function (req, res, message = '', status = 200) {

  res.status(status).send({
    error: false,
    status,
    message,
  });
};

exports.fail = (req, res, message, status = 500, error) => {
  const _message = message || 'Internal server error';
  const _error = error || false;
  res.status(status).send({
    error: _error,
    status,
    message: _message,
  });
};
