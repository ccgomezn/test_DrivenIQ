# drivenIQ App

The "drivenIQ" app is a GraphQL-based application that allows you to interact with user data, including creating users, updating user information, and adding friends.

## Prerequisites

Before you begin, ensure you have the following software installed:

- Docker
- Docker Compose

## Getting Started

1. Clone the repository:

   ```bash
   git clone <repository_url>
   cd drivenIQ
   ```

2. Build the Docker containers:

   ```bash
   docker-compose build app
   ```

3. Start the Docker containers:

   ```bash
   docker-compose up app
   ```

   This will start the PostgreSQL database and the "drivenIQ" app.

4. Migrate the database schema:

   ```bash
   docker-compose run migrate
   ```

   This will set up the database schema for the app.

5. Access the GraphQL Playground:

   Open your web browser and navigate to `http://localhost:4000/graphql` to access the GraphQL Playground.

## GraphQL Queries and Mutations

You can use the GraphQL Playground to run queries and mutations. Here are some examples:

### Create a New User

```graphql
mutation createUser {
  createUser(input: {
    email: "john.doe@example.com",
    firstName: "John",
    lastName: "Doe",
    gender: "Male",
    imageUrl: "http://example.com/john.png"
  }) {
    id
    email
    firstName
    lastName
    gender
    imageUrl
    createdAt
  }
}
```

### Update User Information

```graphql
mutation updateUser {
  updateUser(id: "1", input: {
    firstName: "Updated First Name"
  }) {
    id
    firstName
  }
}
```

### Get a List of Users

```graphql
query getUsers {
  users {
    id
    email
    firstName
    lastName
    gender
  }
}
```

### Add a Friend

```graphql
mutation addFriend {
  addFriend(userId: "1", friendId: "2")
}
```

## Running Tests

To run tests, use the following command:

```bash
docker-compose run migrate-test
docker-compose run test
```
