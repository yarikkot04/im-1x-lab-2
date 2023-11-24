const { readDataFromFile, checkFormat, parseLine } = require('./src/parseLine')
const { HandleKeyPress, Calculate } = require('./src/utilityFunctions')
const CalculatorState = require('./src/CalculatorState')
const writeFile = require('./src/writeFile')


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
        test('If the input format is correct, it should return parsed data', async () => { 
            const expected_correct_first_data = ['1', '2', '-', '4', '=']
            const expected_correct_second_data = ['1', '5', '*', '4']

            const first__correct_data = await parseLine('./testfiles/parseLine/input_1.txt')
            const second__correct_data = await parseLine('./testfiles/parseLine/input_2.txt')
            expect(first__correct_data).toEqual(expected_correct_first_data)
            expect(second__correct_data).toEqual(expected_correct_second_data)
        })
        test('If the input format is incorrect, it should throw an error', () => {
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
        describe('The function must correctly calculate the expression', () => {
            describe('Must correctly calculate when there is a complete expression', () => {
                test('Checking the correctness of the "+" sign', () => {
                    const first_data = ['1', '5', '0', '+', '8', '=']
                    const second_data = ['3', '3', '+', '5', '=']
                    const third_data = ['7', '5', '+', '8', '2', '=']

                    expect(Calculate(first_data)).toBe(158)
                    expect(Calculate(second_data)).toBe(38)
                    expect(Calculate(third_data)).toBe(157)
                })
                test('Checking the correctness of the "-" sign', () => {
                    const first_data = ['1', '4', '1', '-', '8', '=']
                    const second_data = ['3', '3', '-', '5', '=']
                    const third_data = ['2', '6', '5', '-', '8', '2', '=']

                    expect(Calculate(first_data)).toBe(133)
                    expect(Calculate(second_data)).toBe(28)
                    expect(Calculate(third_data)).toBe(183)
                })
                test('Checking the correctness of the "*" sign', () => {
                    const first_data = ['3', '3', '3', '*', '3', '7', '=']
                    const second_data = ['6', '3', '*', '1', '5', '=']
                    const third_data = ['3', '7', '*', '8', '1', '=']

                    expect(Calculate(first_data)).toBe(12321)
                    expect(Calculate(second_data)).toBe(945)
                    expect(Calculate(third_data)).toBe(2997)
                })
                test('Checking the correctness of the "/" sign', () => {
                    const first_data = ['3', '5', '0', '/', '7', '=']
                    const second_data = ['6', '3', '/', '1', '5', '=']
                    const third_data = ['1', '7', '5', '/', '8', '2', '=']

                    expect(Calculate(first_data)).toBe(50)
                    expect(Calculate(second_data)).toBe(4)
                    expect(Calculate(third_data)).toBe(2)
                })
            })
            test('Must return a second expression argument if there is no "=" sign', () => {
                const first_data = ['1', '5', '*', '4']
                const second_data = ['3', '7', '+', '1', '8']
                const third_data = ['4', '2', '/', '7']

                expect(Calculate(first_data)).toBe(4)
                expect(Calculate(second_data)).toBe(18)
                expect(Calculate(third_data)).toBe(7)
            })
            test('If only the first argument is specified, then must return it as a result', () => {
                const first_data = ['6', '7', '*']
                const second_data = ['1', '5']
                const third_data = ['3', '3', '+']

                expect(Calculate(first_data)).toBe(67)
                expect(Calculate(second_data)).toBe(15)
                expect(Calculate(third_data)).toBe(33)
            })

            test('If there is a division by zero throws error', () => {
                const first_data = ['6', '7', '/', '0']
                expect(() => Calculate(first_data)).toThrow(Error('Division by 0 is impossible!'))
            })
        })
    })
})

describe('Checking the function that writes the result to a file', () => {
    describe('writeFile function : ', () => {

        test('The function must correctly write the result to a file', async () => {
            const first_result = 15
            const second_result = 7
            const third_result = -30
            const fourth_result = 0
            writeFile('testfiles/writeFile/output-1.txt',first_result)
            writeFile('testfiles/writeFile/output-2.txt',second_result)
            writeFile('testfiles/writeFile/output-3.txt',third_result)
            writeFile('testfiles/writeFile/output-4.txt',fourth_result)
            expect(await readDataFromFile('./testfiles/writeFile/output-1.txt')).toBe('15')
            expect(await readDataFromFile('./testfiles/writeFile/output-2.txt')).toBe('7')
            expect(await readDataFromFile('./testfiles/writeFile/output-3.txt')).toBe('-30')
            expect(await readDataFromFile('./testfiles/writeFile/output-4.txt')).toBe('0')
        })
    })
})


