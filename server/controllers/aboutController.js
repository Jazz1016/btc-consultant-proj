module.exports = {
  getAboutData: async (req, res) => {
    //gets about data for display
    const db = req.app.get("db");
    try {
      let info = await db.get_about_data();
      return res.status(200).send(info);
    } catch {
      err => {
        console.log(err);
        return res.sendStatus(500);
      };
    }
  },
  editAboutData: async (req, res) => {
    //edits about data (only admin can access)
    const db = req.app.get("db");
    const { id } = req.params;
  }
};
