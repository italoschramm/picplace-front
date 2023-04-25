const express = require('express');
const path = require('path');

const app = express();
const publicPath = path.join(__dirname, 'dist'); // substitua 'dist' pelo nome da pasta onde estão seus arquivos de build

app.use(express.static(publicPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

const port = process.env.PORT || 80; // substitua 3000 pela porta que você deseja utilizar
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});