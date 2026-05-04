module.exports = (req, res) => {
  res.json({
    message: 'Hello from test endpoint',
    path: req.path,
    method: req.method,
    timestamp: Date.now()
  });
};