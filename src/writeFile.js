const fs = require('fs')
const path = require('path')

function writeFile(pathToFile, data){
    const filteredPathTofile = path.resolve(__dirname, '../', pathToFile)
    fs.writeFile(filteredPathTofile, data.toString(), (err) => {
        if(err) {
            throw new Error(err)
        }
    })
    return `The result is saved to a file: ${path.basename(pathToFile)}`
}

module.exports = writeFile