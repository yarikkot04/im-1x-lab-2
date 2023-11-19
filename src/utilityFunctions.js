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

module.exports =  {
    HandleKeyPress,
}