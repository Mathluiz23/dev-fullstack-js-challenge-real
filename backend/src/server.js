const port = process.env.PORT || 3001;
const app = require('./App');

app.listen(port);
console.log(`Api rodando na porta ${port}`);