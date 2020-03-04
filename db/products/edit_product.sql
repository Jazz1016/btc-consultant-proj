UPDATE products
SET product_name = $2, product_img = $3, price = $4, description = $5, available = $6
WHERE product_id = $1