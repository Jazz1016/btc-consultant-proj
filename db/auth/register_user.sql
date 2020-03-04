INSERT INTO users(
    email,
    password,
    first_name,
    last_name,
    isadmin
) VALUES (
    $1,
    $2,
    $3,
    $4,
    $5
)
RETURNING user_id, email, first_name, last_name, isAdmin