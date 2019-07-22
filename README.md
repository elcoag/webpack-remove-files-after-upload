<h1 align="left">webpack-remove-files-after-upload</h1>
<p align="left"><img src="https://img.shields.io/badge/ELCO%20AG-SMS-red.svg" /> <img src="https://img.shields.io/badge/license-MIT-blue.svg" /> <img src="https://img.shields.io/badge/webpack-plugin-blue.svg" /></p>
<p>This Plugin extends the scp-webpack-plugin.<br />After uploading all files you can define if and when which files will be deleted after.</p>
<h2 align="left">Installation</h2>
<p>npm i -D webpack-remove-files-after-upload</p>
<h2 align="left">Usage</h2>
<p>In your webpack.config.js use the plugin as you would scp-webpack-plugin</p>

```javascript
const RemoveFilesAfterUpload = require('webpack-remove-files-after-upload');

module.exports = {
 plugins: [
  new RemoveFilesAfterUpload({
    localPath: 'dist', // local directory
    host: 'path.to.host',          
    port: '22', // default 22
    username: 'username',
    password: '########',
    remotePath: '/var/html/www', // target directory
    filesToDelete: '.html5, .js, .png' // if empty, no files will be deleted
  })
 ]
};
```
