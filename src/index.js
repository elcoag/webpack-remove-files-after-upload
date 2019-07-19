const ScpWebpackPlugin = require('scp-webpack-plugin')
const chalk = require('chalk')
const SCPClient = require('scp2/lib/scp')
const path = require('path')
const fs = require('fs')

// A JavaScript class.
class RemoveFilesAfterUpload extends ScpWebpackPlugin {
  constructor(localPath, host, port, username, password, remotePath, filesToDelete) {
      super(localPath, host, port, username, password, remotePath, filesToDelete).options = localPath, host, port, username, password, this.options.path = this.options.remotePath, filesToDelete 
      delete this.options.remotePath
  }

  // copied and edited following function to hook on after transfering all files and delete them
  apply(compiler) {
    compiler.hooks.done.tap('ScpWebpackPlugin', () => {
      console.log(chalk.green(`ScpWebpackPlugin: transfer to ${this.options.host}...`))
      console.log(chalk.green(`ScpWebpackPlugin: transfer start...`))

      let definedLocalPath = this.options.localPath
      let definedFilesToDelete = this.options.filesToDelete

      let scpStart = +new Date()
      SCPClient.scp(this.localPath, this.options, function(err) {
        if (err) {
          throw err
        }
        let spendTime = (+new Date() - scpStart) / 1000

        console.log(chalk.green(`ScpWebpackPlugin: It takes ${spendTime}s`))
        console.log(chalk.bgRed(chalk.black(` ELCO AG `)) + ' ' + chalk.bgBlue(chalk.white(` 2019 `)) + ' ' + chalk.bgWhite(chalk.black(` webpack-remove-files-after-upload `)));          

        function recursiveDirOperator(baseDir) {
          fs.readdir(baseDir, function(err, files) {
            if(err) throw err

            files.forEach((file) => {
              var filePath = path.resolve(baseDir + '/' + file)

              fs.stat(filePath, (err, singleFile) => {
                if(err) throw err
  
                if(singleFile.isFile() === true && definedFilesToDelete.split(',').includes(path.extname(filePath))) {
                  fs.unlink(filePath, (err) => {
                    if(err) throw err
                    console.log(chalk.green(`File successfully deleted: `) + filePath)
                  })
                } else if(singleFile.isFile() === false) {
                  recursiveDirOperator(path.resolve(__dirname, filePath))
                }
              })
            })
          });
        }
        recursiveDirOperator(definedLocalPath)
      })
    })
  }
}

module.exports = RemoveFilesAfterUpload
