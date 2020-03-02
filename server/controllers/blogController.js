module.exports = {
  allBlogPosts: (req, res) => {
    //gets all blog posts for display
  },
  newBlogPost: (req, res) => {
    //posts new blog posts to the db
  },
  editBlogPost: (req, res) => {
    //edits blog post will pass in blog_id to find it
  },
  deleteBlogPost: (req, res) => {
    //used to delete blog from db
  },
  oneBlogPost: (req, res) => {
    //used to get one Blog post and send it to the front end, may go in tandem with edit
  }
};
