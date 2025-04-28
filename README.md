# Habigotchi Back-End API

This is a RESTful API built with **Node.js**, **Express**, and **PostgreSQL**.

Go to the endpoints.json file to see the functionality of each endpoint. You can run this API locally using your browser for GET methods or programs such as [insomnia](https://insomnia.rest/download) to test out all the other methods

## 📦 Requirements

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [PostgreSQL](https://www.postgresql.org/) (installed and running)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/habigotchi-back-end.git
cd habigotchi-back-end
```
### 2. Install dependencies 
```
npm install
```

### 3. Set up environment variables
_(create .ENV files for dev or production and insert this)_
```
DATABASE_URL=your_local_database_url_here
```

### 4. Set up the databases
```
npm run setup-dbs
```

### 5. Seed the database for dev
```
npm run seed
```
or 
### Seed the database for prod
```
npm run seed-prod
```

### 6. Start the server
```
npm start
```
### 7. Run the tests
```
npm test
```
