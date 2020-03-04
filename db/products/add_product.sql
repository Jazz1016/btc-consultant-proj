INSERT INTO products(
    product_name, product_img, price, description, available
) VALUES (
    $1, $2, $3, $4, $5
)
RETURNING product_id, product_name, product_img, price, description, available