const readDataFromFile  = require('./src/parseLine')

describe('Checking functions that read and parse data from files', () => {
    describe('readDataFromFile function : ', () => {
        test('Should correctly return the contents of the read file', async () => {
            const first_expectedData = '1 0 + 15 ='
            const second_expectedData = '1 2 * 4 = '
            const third_expectedData = '5 - 10'
            const fourth_expectedData = '19 / 3 '

            const first_data = await readDataFromFile('./testfiles/readDataFromFile/input_1.txt')
            const second_data = await readDataFromFile('./testfiles/readDataFromFile/input_2.txt')
            const third_data = await readDataFromFile('./testfiles/readDataFromFile/input_3.txt')
            const fourth_data = await readDataFromFile('./testfiles/readDataFromFile/input_4.txt')

            expect(first_data).toBe(first_expectedData)
            expect(second_data).toBe(second_expectedData)
            expect(third_data).toBe(third_expectedData)
            expect(fourth_data).toBe(fourth_expectedData)
        })
    })
})