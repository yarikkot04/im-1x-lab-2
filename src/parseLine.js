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


function checkFormat(dataArr) {
    const opArr = ['+', '-', '*', '/', '=']
    let opCount = 0
    let dataEmpty = true
    for(const key of dataArr) {
        if(key != ' ') {
            dataEmpty = false
        }
    }
    if(!dataEmpty) {
        if ((isNaN(dataArr[0]) || dataArr[0] == ' ')) {
            return ['The first character must be a number!', false]
        }
        for (let i = 0; i < dataArr.length; i++) {
            if (opArr.includes(dataArr[i]) && dataArr[i] != '=') {
                opCount++
            }
            if (opCount > 1) {
                return ['There should be only one action!', false]
            }
            if (!opArr.includes(dataArr[i]) && isNaN(dataArr[i])) {
                return ['You have entered an incorrect data type, only integers should be entered!', false]
            }
            if (dataArr[i] == ' ' && dataArr[i + 1] == ' ') {
                return ['You have entered too many spaces!', false]
            }
            if ((dataArr[i] != ' ' && !opArr.includes(dataArr[i])) && (dataArr[i + 1] != ' ') && (dataArr[i] != dataArr[dataArr.length - 1])) {
                return ['Missing delimiter, put a space between the symbols!', false]
            }
            if (opArr.includes(dataArr[i]) && dataArr[i + 1] != ' ' && opArr.includes(dataArr[i]) && (dataArr[i] != dataArr[dataArr.length - 1])) {
                return ['Missing delimiter, put a space between the symbols!', false]
            }
            if (opArr.includes(dataArr[i]) && dataArr[i + 2] == '=') {
                return ['Missing digit!', false]
            }
            if(dataArr[i].includes('\n')) {
                return ['The expression must be on one line!', false]
            }
        }
        if(dataArr.includes('=') && opCount == 0) {
            return ['Incorrect entry of operators!', false]
        } 
    }
    return ['Everything is correct!', true]
}


module.exports = {
    readDataFromFile,
    checkFormat
}