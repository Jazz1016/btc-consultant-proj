SELECT u.user_id, u.product_id, u.cart_id, p.product_name, p.product_img, p.price, p.description, p.available
FROM products p
JOIN users_products u ON p.product_id = u.product_id
WHERE u.user_id = $1