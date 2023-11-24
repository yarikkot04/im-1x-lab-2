class CalculatorState {
    result = 0
    firstNum = ''
    op = ''
    startSecondNumber = false
    secondNum = ''
    equal = ''

    calculate(op) {
        switch(op) {
            case '+' :
                this.result = +this.firstNum + +this.secondNum
                break
            case '-' : 
                this.result = this.firstNum - this.secondNum
                break
            case '*' : 
                this.result = this.firstNum * this.secondNum
                break
            case '/' :
                this.result = Math.floor(this.firstNum / this.secondNum)
                break
            default :
                return 'Invalid character!'
        }
    }
}

module.exports = CalculatorState