export default (req, res, next) => {
  res.locals.login = req.session.user?.login;
  next();
};
