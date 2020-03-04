module.exports = {
  addSub: async (req, res) => {
    const db = req.app.get("db").subscriptions;
    const { email } = req.body;
    await db
      .add_sub(email)
      .then(() => {
        res.sendStatus(200);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  },
  getSubs: async (req, res) => {
    const db = req.app.get("db").subscriptions;
    let subs = await db.get_subs();
    try {
      res.status(200).send(subs);
    } catch {
      res.sendStatus(500);
    }
  }
};
