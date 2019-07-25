const shell = require('shelljs');

shell.cp('tools/package.json', 'dist/package.json');
shell.mkdir('public');
shell.cp('-r', 'dist/views', 'public');
shell.mv('public/views/*', 'public');
shell.mv('public/index.html', 'public/index2.html');
shell.rm('-r', 'public/views');
shell.rm('-r', 'dist/views/assets');
