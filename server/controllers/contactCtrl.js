module.exports = {
  getAllMessages: async (req, res) => {
    const db = req.app.get("db").contact;
    let messages = await db.get_contact_msgs();
    try {
      return res.status(200).send(messages);
    } catch {
      err => {
        console.log(err);
        return res.sendStatus(500);
      };
    }
  },
  getOneMessage: async (req, res) => {
    const db = req.app.get("db").contact;
    const { id } = req.params;
    let message = await db.get_one_msg(id);
    try {
      return res.status(200).send(message);
    } catch {
      err => {
        console.log(err);
        return res.sendStatus(500);
      };
    }
  },
  newMessage: async (req, res) => {
    const db = req.app.get("db").contact;
    const { name, subject, email, message } = req.body;
    await db
      .new_contact_msg([name, subject, email, message])
      .then(() => {
        return res.sendStatus(200);
      })
      .catch(err => {
        console.log(err);
        return res.sendStatus(500);
      });
  },
  deleteMessage: async (req, res) => {
    const db = req.app.get("db").contact;
    const { id } = req.params;
    await db
      .delete_msg(id)
      .then(() => {
        return res.sendStatus(200);
      })
      .catch(err => {
        console.log(err);
        return res.sendStatus(500);
      });
  }
};
