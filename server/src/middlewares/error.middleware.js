export const errorHandler = (err, req, res, next) => {
  console.error(err.message);
  if (res.headersSent) return;

  res.status(400).json({
    error: err.message
  });
};
