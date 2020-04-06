const bcrypt = require("bcryptjs");

module.exports = {
  login: async (req, res) => {
    const db = req.app.get("db").auth;
    const { email, password } = req.body;

    let user = await db.check_user(email);
    user = user[0];
    if (!user) {
      return res.status(400).send("Email not found");
    }
    const authenticated = bcrypt.compareSync(password, user.password);
    if (authenticated) {
      delete user.password;
      req.session.user = user;
      return res.status(202).send(req.session.user);
    } else {
      return res.status(400).send("Incorrect email or password");
    }
  },
  register: async (req, res) => {
    const db = req.app.get("db").auth;
    const { email, password, first_name, last_name } = req.body;
    let user = await db.check_user([email]);
    user = user[0];
    if (user) {
      return res.status(400).send("Email already in use");
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    try {
      let newUser = await db.register_user([
        email,
        hash,
        first_name,
        last_name,
        false
      ]);
      newUser = newUser[0];
      req.session.user = newUser;
      return res.status(201).send(req.session.user);
    } catch (err) {
      return res.sendStatus(500);
    }
  },
  logout: (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  }
};
