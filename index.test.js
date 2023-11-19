const { readDataFromFile, checkFormat, parseLine } = require('./src/parseLine')
const { HandleKeyPress, Calculate } = require('./src/utilityFunctions')
const CalculatorState = require('./src/CalculatorState')


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

describe('Checking functions that work with the parsed expression', () => {
    describe('HandleKeyPress function : ', () => {
        let calcStateObj
        beforeEach(() => {
            calcStateObj = new CalculatorState()
        })
        test('The function must correctly specify two numbers and an operator | first_test', () => {
            HandleKeyPress(calcStateObj, '1')
            HandleKeyPress(calcStateObj, '1')
            HandleKeyPress(calcStateObj, '+')
            HandleKeyPress(calcStateObj, '5')
            HandleKeyPress(calcStateObj, '=')
            expect(calcStateObj.firstNum).toBe('11')
            expect(calcStateObj.op).toBe('+')
            expect(calcStateObj.secondNum).toBe('5')
            expect(calcStateObj.equal).toBe('=')

        })
        test('The function must correctly specify two numbers and an operator | second_test', () => {
            HandleKeyPress(calcStateObj, '4')
            HandleKeyPress(calcStateObj, '5')
            HandleKeyPress(calcStateObj, '*')
            HandleKeyPress(calcStateObj, '3')
            HandleKeyPress(calcStateObj, '3')
            HandleKeyPress(calcStateObj, '=')
            expect(calcStateObj.firstNum).toBe('45')
            expect(calcStateObj.op).toBe('*')
            expect(calcStateObj.secondNum).toBe('33')
            expect(calcStateObj.equal).toBe('=')

        })
        test('The function must correctly specify two numbers and an operator | third_test', () => {
            HandleKeyPress(calcStateObj, '1')
            expect(calcStateObj.firstNum).toBe('1')
            expect(calcStateObj.op).toBe('')
            expect(calcStateObj.secondNum).toBe('')
            expect(calcStateObj.equal).toBe('')
        })
        test('The function must correctly specify two numbers and an operator | fourth_test', () => {
            HandleKeyPress(calcStateObj, '1')
            HandleKeyPress(calcStateObj, '5')
            HandleKeyPress(calcStateObj, '+')
            expect(calcStateObj.firstNum).toBe('15')
            expect(calcStateObj.op).toBe('+')
            expect(calcStateObj.secondNum).toBe('')
            expect(calcStateObj.equal).toBe('')

        })
        test('The function must correctly specify two numbers and an operator | fifth_test', () => {
            HandleKeyPress(calcStateObj, '1')
            HandleKeyPress(calcStateObj, '1')
            HandleKeyPress(calcStateObj, '0')
            HandleKeyPress(calcStateObj, '/')
            HandleKeyPress(calcStateObj, '5')
            expect(calcStateObj.firstNum).toBe('110')
            expect(calcStateObj.op).toBe('/')
            expect(calcStateObj.secondNum).toBe('5')
            expect(calcStateObj.equal).toBe('')
        })
    })

    describe('Calculate function : ', () => {
        test('The function must correctly calculate the expression', () => {
            const first_data = ['1', '5', '*', '4']
            const second_data = ['1', '5', '0', '*', '8', '=']
            const third_data = ['3', '3', '/', '5', '=']
            const fourth_data = ['1', '5']
            const fifth_data = ['3', '3', '+']
            const six_data = ['7', '5', '-', '8', '2', '=']

            expect(Calculate(first_data)).toBe(4)
            expect(Calculate(second_data)).toBe(1200)
            expect(Calculate(third_data)).toBe(6)
            expect(Calculate(fourth_data)).toBe(15)
            expect(Calculate(fifth_data)).toBe(33)
            expect(Calculate(six_data)).toBe(-7)
        })
    })
})

