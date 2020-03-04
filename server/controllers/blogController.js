module.exports = {
  allBlogPosts: async (req, res) => {
    //gets all blog posts for display
    const db = req.app.get("db").blog;
    let posts = await db.get_all_blogs();
    posts;
    if (posts) {
      // console.log(posts);
      res.status(200).send(posts);
    } else {
      res.sendStatus(500);
    }
  },
  newBlogPost: async (req, res) => {
    //posts new blog posts to the db
    const db = req.app.get("db").blog;
    const { blog_img, title, body } = req.body;
    try {
      await db.new_blog_post([blog_img, title, body]);
      res.sendStatus(200);
    } catch {
      res.sendStatus(500);
    }
  },
  editBlogPost: async (req, res) => {
    //edits blog post will pass in blog_id to find it
    const db = req.app.get("db").blog;
    const { id } = req.params;
    const { blog_img, title, body } = req.body;
    try {
      await db.edit_blog_post([id, blog_img, title, body]);
      return res.sendStatus(200);
    } catch {
      err => {
        console.log(err);
        return res.sendStatus(500);
      };
    }
  },
  deleteBlogPost: async (req, res) => {
    //used to delete blog from db
    const db = req.app.get("db").blog;
    const { id } = req.params;
    try {
      await db.delete_blog_post(id);
      return res.sendStatus(200);
    } catch {
      err => {
        console.log(err);
        return res.sendStatus(500);
      };
    }
  },
  oneBlogPost: async (req, res) => {
    console.log("hit");
    //used to get one Blog post and send it to the front end, may go in tandem with edit
    const db = req.app.get("db").blog;
    const { id } = req.params;
    try {
      let post = await db.get_one_blog(id);
      return res.status(200).send(post);
    } catch {
      err => {
        console.log(err);
        return res.sendStatus(500);
      };
    }
  }
};
