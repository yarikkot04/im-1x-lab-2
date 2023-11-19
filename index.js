const { parseLine } = require('./src/parseLine')
const { Calculate } = require('./src/utilityFunctions')
const writeFile = require('./src/writeFile')

async function main() {
    const data = await parseLine('input.txt')
    let result = Calculate(data)
    console.log(writeFile('output.txt', result))
}
main()