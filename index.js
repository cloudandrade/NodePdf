var pdf = require('html-pdf');

var fs = require('fs');

function readModuleFile(path, callback) {
  try {
    var filename = require.resolve(path);
    fs.readFile(filename, 'utf8', callback);
  } catch (e) {
    callback(e);
  }
}

readModuleFile('./html-template.html', function (err, html) {
  //força a conversão para string caso não o tenha feito
  html = `${html}`;
  //variáveis a serem inseridas
  var title = 'PDF GERADO CONFORME LAYOUT!!';
  var author = 'Jan';
  var subtitle =
    'Esse pdf tem um oferecimento de Skincaroço, o creme que te faz parecer horroroso!';
  var paragraph =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

  //inserindo as variaveis dentro da string html antes de gerar o pdf
  html = html.replace('{title}', title);
  html = html.replace('{subtitle}', subtitle);
  html = html.replace('{paragraph}', paragraph);
  html = html.replace('{author}', author);
  const conteudo = html;

  pdf.create(conteudo, {}).toFile('./meupdf.pdf', (err, res) => {
    if (err) {
      console.log('Err: ', err);
    } else {
      console.log('## Arquivo gerado com Sucesso ##');
      console.log('Caminho do arquivo Gerado: ', res.filename);
    }
  });
});
