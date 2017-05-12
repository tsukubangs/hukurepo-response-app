function modify() {
  console.log('modify');
  var fs = require('fs');
  var cssPath = 'www/static/css/';
  var list = fs.readdirSync(cssPath);

  for (var i=0; i<list.length; i++){
    var fileString = fs.readFileSync(cssPath + list[i]).toString();
    console.log(cssPath + list[i]);
    fileString = fileString.replace(/url\(static\//g, 'url(..\/');
    fs.writeFile(cssPath + list[i], fileString, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('pathを修正しました。');
      }
    });
  }
}

module.exports = modify;
