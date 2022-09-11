const port = process.env.PORT;
const app = require("./App");

app.listen(port);
console.log(`Api rodando na porta ${port}`);
