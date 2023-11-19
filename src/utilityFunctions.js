const CalculatorState = require('./CalculatorState')

function HandleKeyPress(calcStateObject, keyPressed) {
    if (keyPressed == '=') {
        calcStateObject.equal = '='
    } else if (!calcStateObject.startSecondNumber) {
        if (!isNaN(keyPressed)) {
            calcStateObject.firstNum += keyPressed
        } else {
            calcStateObject.startSecondNumber = true
            calcStateObject.op = keyPressed
        }
    } else {
        calcStateObject.secondNum += keyPressed
    }
}

function Calculate(keyArray) {
    const calcStateObj = new CalculatorState()
    for (let i = 0; i < keyArray.length; i++) {
        HandleKeyPress(calcStateObj, keyArray[i])
    }
    if (!calcStateObj.firstNum) {
        calcStateObj.firstNum = 0
    }
    if(calcStateObj.secondNum == 0 && calcStateObj.secondNum != '') throw new Error('Division by 0 is impossible!') 
    if(!calcStateObj.secondNum) {
        return +calcStateObj.firstNum
    } else if(!calcStateObj.equal) {
        return +calcStateObj.secondNum
    } else {
        calcStateObj.calculate(calcStateObj.op)
        return calcStateObj.result
    }
}

module.exports =  {
    HandleKeyPress,
    Calculate
}