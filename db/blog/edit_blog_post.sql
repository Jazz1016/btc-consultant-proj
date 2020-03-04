UPDATE blog_posts
SET blog_img = $2, title = $3, body = $4
WHERE blog_id = $1