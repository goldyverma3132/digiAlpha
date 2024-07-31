
## Features

- **Register User**: Create a new user with first name, last name, email, and phone number.
- **Get User by ID**: Retrieve a user by their unique ID.
- **Update User**: Update a user's details.
- **Delete User**: Remove a user from the database.
- **get All list Users**: List all users with pagination and filtering options.


Start the Server*

 - npx nodemon app.js
 - The server will start on `http://localhost:5000`.

## API Endpoints

1. **Register User**
   - **Endpoint**: `POST /api/users/register`

2. **Get User by ID**
   - **Endpoint**: `GET /api/users/getUser/:id`

3. **Update User**
   - **Endpoint**: `PUT /api/users/updateUser/:id`

4. **Delete User**
   - **Endpoint**: `DELETE /api/users/delete/:id`

5. **List Users**
   - **Endpoint**: `GET /api/users`

