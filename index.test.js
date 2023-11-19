const { readDataFromFile, checkFormat, parseLine } = require('./src/parseLine')

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
    describe('checkFormat function : ', () => {
        test('The function should check whether the condition is spelled correctly in the file', () => {
            const first_expr = '5 5 0 + 6 7 5 5 5 ='
            const second_expr = ' 5 + 1 ='
            const third_expr = '1 1 * 2 = '
            const fourth_expr = '2 34 + 8 ='
            const fifth_expr = '2 5 + + 17 ='
            const sixth_expr = '3 5 / 6 = '
            const seventh_expr = '2 5 + 5 - 2'
            const eighth_expr = '5 5 + '
            const ninth_expr = '5   5 + 5 ='
            const tenth_expr = '5 = 5'
            const eleventh_expr = `4 4 + 5 
             =
            `
            const twelfth_expr = '5 5 + ='
            const thirteenth = '5 a + 4 ='
            expect(checkFormat(first_expr)).toEqual(['Everything is correct!', true])
            expect(checkFormat(second_expr)).toEqual(['The first character must be a number!', false])
            expect(checkFormat(third_expr)).toEqual(['Everything is correct!', true])
            expect(checkFormat(fourth_expr)).toEqual(['Missing delimiter, put a space between the symbols!', false])
            expect(checkFormat(fifth_expr)).toEqual(['There should be only one action!', false])
            expect(checkFormat(sixth_expr)).toEqual(['Everything is correct!', true])
            expect(checkFormat(seventh_expr)).toEqual(['There should be only one action!', false])
            expect(checkFormat(eighth_expr)).toEqual(['Everything is correct!', true])
            expect(checkFormat(ninth_expr)).toEqual(['You have entered too many spaces!', false])
            expect(checkFormat(tenth_expr)).toEqual(['Incorrect entry of operators!', false])
            expect(checkFormat(eleventh_expr)).toEqual(['The expression must be on one line!', false])
            expect(checkFormat(twelfth_expr)).toEqual(['Missing digit!', false])
            expect(checkFormat(thirteenth)).toEqual(['You have entered an incorrect data type, only integers should be entered!', false])
        })
    })
    describe('parseLine function : ', () => {
        test('The function must return parsed data, if correct, otherwise return an error', async () => {
            const expected_correct_first_data = ['1', '2', '-', '4', '=']
            const expected_correct_second_data = ['1', '5', '*', '4']

            const first__correct_data = await parseLine('./testfiles/parseLine/input_1.txt')
            const second__correct_data = await parseLine('./testfiles/parseLine/input_2.txt')
            expect(first__correct_data).toEqual(expected_correct_first_data)
            expect(second__correct_data).toEqual(expected_correct_second_data)

            // If the input format is incorrect, it should throw an error
            expect(parseLine('./testfiles/parseLine/input_3.txt')).rejects.toThrow()
            expect(parseLine('./testfiles/parseLine/input_4.txt')).rejects.toThrow()
        })
    })
})