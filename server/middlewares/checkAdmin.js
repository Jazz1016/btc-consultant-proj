module.exports = (req, res, next) => {
  console.log("hit checkAdmin");
  if (req.session.user) {
    if (req.session.user.isadmin === true) {
      return res.status(200).send(req.session.user);
    } else {
      return res.sendStatus(401);
    }
  } else {
    next();
  }
};
