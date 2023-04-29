const express = require('express');
const { createSSRApp } = require('vue');
const { renderToString } = require('@vue/server-renderer');
const path = require('path');
const fs = require('fs');

const app = express();
const publicPath = path.join(__dirname, 'dist'); // substitua 'dist' pelo nome da pasta onde estão seus arquivos de build

app.use(express.static(publicPath));

app.get('*', async (req, res) => {
  const app = createSSRApp({
    template: fs.readFileSync(path.resolve(__dirname, './dist/index.html'), 'utf-8'),
  });

  const ctx = {
    url: req.url,
    title: 'Título da página',
    meta: `
      <meta property="og:title" content="Título para compartilhamento no Facebook">
      <meta property="og:image" content="URL da imagem para compartilhamento no Facebook">
      <meta property="og:description" content="Descrição para compartilhamento no Facebook">
    `,
  };

  const html = await renderToString(app, ctx);

  res.send(html);
});

const port = process.env.PORT || 80; // substitua 3000 pela porta que você deseja utilizar
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
