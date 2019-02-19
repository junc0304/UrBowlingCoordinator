const app = require('./app');

//port: import environmental variable or use 3000
const port = process.env.PORT || 3000;
app.listen(port);

console.log(`Server listening at ${port}`);