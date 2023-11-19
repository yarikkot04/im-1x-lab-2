const fs = require('fs')

function readDataFromFile(pathToFile) {
    return new Promise((resolve, reject) => {
        fs.readFile(pathToFile, 'utf-8', (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

module.exports = readDataFromFile;