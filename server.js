const { app } = require('./app');
const { syncAndSeed } = require('./db') 
const port = process.env.port || 3000;

app.listen(port, console.log(`listening on port ${port}`))
syncAndSeed();