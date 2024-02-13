# Tech Store Server

## With Express Js, Prisma and MongoDB

<samp>This project is to showcase my ability to use prisma. The server consists CRUD APIs that will help you to run a online store, like an local video game store.</samp>

### Project Structure

```bash
prisma
    - schema.prisma # DB model structure is defined here.
src
    - config
        - index.js # Reused variables and libs.
    - controllers
        - <filename>.controller.js # Routers.
    - models
        # Handle functions netween prisma and mongodb.
        - <filename>.model.js
    - middleware
        - <filename>.middleware.js
    - repositories
        # Routes funstions from the model.
        - <filename>.repository.js
    - services
        - <filename>.service.js # Handle logic for routers.
    - app.js
server.js
```

### Installation

1. <samp>Clone git repository</samp>

```bash
git clone --branch v0.1.0 https://github.com/Pathum312/Tech_Store_Backend.git
```

2. <samp>Install dependencies</samp>

```bash
npm i
```

3. <samp>Add .env file</samp>

```bash
# Server Port
PORT = 8000
# MongoDB URL
DATABASE_URL="<mongodb uri>"
# JWT Secret Key
# Used https://www.javainuse.com/jwtgenerator to generate secret key
JWT_SECRET = "<jwt secret key>"
```

4. <samp>Sync prisma schema with mongodb database</samp>

```bash
# Run this everytime changes are made to the prisma schema.
npx prisma generate
```

5. <samp>Run Server</samp>

```bash
# Development
npm run dev
# Production
npm run prod
```

6. <samp>Get API documentation: `http://localhost:8000/api-docs`</samp>

7. <samp>Also add `Authorization` to the `header` to use the other APIs, which aren't the `/auth` APIs.</samp>
