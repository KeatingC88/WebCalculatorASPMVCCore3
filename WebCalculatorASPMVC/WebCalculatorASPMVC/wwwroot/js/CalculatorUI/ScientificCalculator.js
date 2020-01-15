class ScientificCalculator extends StandardCalculator {
    /*
     * Scientific (PEMDAS) Calculations.
     *
    */
    DisplayString = "";//Overriding for this.display() to use as the output.
    KeysPressed = [];//Used for pushing Numericals/Decimals into an array/object.
    KeysRecorder = [];//Used for pushing KeysPressed[] and a Math Operator. Segements are broken after every math operator.

    constructor() {
        super();
        //...
    }
    //...
    key(value) {
        this.number(value);
        this.decimal(value);        
        this.operation(value);
        this.equalsOperation(value);
    }
    //...
    //This handles the Scientfic Calculation Finalized-String Processes
    calculation() {
        console.log("Keys Recorder (raw): " + this.KeysRecorder);
        console.log("Keys Recorder (string): " + this.KeysRecorder.join(""));



        //(2(2^()2)) + 1 - 1 / 1
        //[*1](2[*](2^([1])[*]2)[*1])[*1] + 1 - 1 / 1

        //PEMDAS Rules
        //( ) ^ * / + -

        //If Paren (, check char before ( for a number and change it to be a "[number] * (".
        //If Paren (, check char before ( for a math operator and leave it.
        //If Paren ), check string for a ( otherwise do nothing
        //If Paren ), check char before it for a number only.

        //Calculate a Finalized String and push into the keys.recorder.

        //Calculate Finalized String for eval().

        //TestSite
        //this.calculate();
        //var x = "(2*(1*(1+1)*3)*-2)";
        //var x = Math.pow(2, 3);
        //var x = "(2*(1*(1+1)*3)*1)";//cant use zeroes obviously to fill the gaps.
        //var x = "123+-123"; Passed.
        //var x = "123+-"; Fails, must add a 0 after a negative that isn't deleted.
        //var x = "(2^(12))"; Fails, must use the pow() for every explonent including parentheses inside them.
        //var x = Math.pow(2, (12));
        //StandardCalculator.prototype.calculate();
    }
    //...
    //This section handles the revert to default properties and settings of the application.
    clearDisplay() {
        this.KeysPressed = [];//Empty the Object.
        this.KeysRecorder = [];//Empty the Object.
        document.getElementById("scientific-calculator-textarea-display").setAttribute("placeholder", "");//Empty the <textArea> to default.
        //document.getElementById("scientific-calculator-textarea-display").setAttribute("rows", 1);//Resize the <textArea> back to default.
    }
    //...
    //This section handles the setting of DisplayString & <TextArea>.
    display() {
        document.getElementById("scientific-calculator-textarea-display").setAttribute("placeholder", this.DisplayString);
        //document.getElementById("scientific-calculator-textarea-display").scrollTop = document.getElementById("scientific-calculator-textarea-display").scrollHeight;//Forces the scroll to the bottom of the latest User Input in the <TextArea>.
    }
    //...
    //This section handles the "=" Keypad Button and the Enter Button on the Keyboard.
    equalsOperation(value) {
        if (value === "=") {//User has Key/Mouse/Touch the = button.
            if (Object.keys(this.KeysPressed).length > 0) {//Begin emptying KeysPressed into KeysRecorder.
                this.KeysRecorder.push(this.KeysPressed.join(""));//append this.keyspressed into this.keysrecorder
            }
            this.calculation();//Begin Calculation on the Compiled String.
            this.KeysRecorder = []//Clear-Reset KeysRecorder.
            this.KeysPressed = []//Clear-Reset KeysPressed.
        }
    }
    //...
    //This handles the Scientific-Expression Calculator Protocol by compiling a String for eval();
    operation(value) {//Creates a Expression String for Equation Operation.
        //Setting User Typed Math Operators into a String for the Calculation Process then display data into the UI <TextArea>
        if (this.operatorMatch(value) !== false) {            
            if (Object.keys(this.KeysPressed).length > 0) {//Begin emptying KeysPressed into KeysRecorder.
                this.KeysRecorder.push(this.KeysPressed.join(""));
            }
            //Track Last Object in this.KeysRecorder.
            let lastObjChar = this.KeysRecorder[this.KeysRecorder.length - 1];
            //Decide Code Path based on User Selected Button.
            switch (this.operatorMatch(value)) {
                case "<-":
                    let removedLastChar = this.KeysRecorder.join("").slice(0, -1);//Remove Last Character from this.KeysRecorder main String.
                    this.KeysRecorder = [];//Reset/Empty the Recorder.
                    this.KeysRecorder.push(removedLastChar);//Append the remaining of the String back into the Recorder.
                    break;
                case "(":
                    this.KeysRecorder.push(value);//Append "(" to the String.
                    break;
                case ")":
                    let leftPar = this.KeysRecorder.join("").split("(").length - 1;//Count ( in the String.
                    let rightPar = this.KeysRecorder.join("").split(")").length - 1;//Count } in the String.
                    if (Object.keys(this.KeysRecorder).length > 0 && leftPar > rightPar) {// Something in the Recorder and (.count [>] ).count
                        this.KeysRecorder.push(value);//Append ")" to the String.
                    }
                    break;
                case "^":
                    if (Object.keys(this.KeysRecorder).length !== 0) {//Cannot be the first value to push into this.keysrecorder.
                        if (this.operatorMatch(lastObjChar) === false || this.operatorMatch(lastObjChar) === ")") {//Push value if there's a number within the last character of the keysrecorder object or ends with ).
                            this.KeysRecorder.push(value);//Append "^" to the String.
                        } else {//The Last Object Character is a Math Operator.
                            this.KeysRecorder.pop();//Remove Last Operator from the String.
                            this.KeysRecorder.push(value);//Append "^" to the String.
                        }
                    }
                    break;
                case "+/-":
                    if (this.operatorMatch(lastObjChar) === false) {//Last Object in this.keysrecorder is not a Math Operator.
                        let firstChar = lastObjChar.slice(0, 1);//First Character in the Last Object from this.keysrecorder. (Looking for "-" numbers).
                        if (isNaN(firstChar) && firstChar === "-") {//Last this.keysrecorder object is not a number and a negative sign I.e. [123],[+],[(-)123].
                            let getOnlyNumbers = lastObjChar.slice(1, lastObjChar.length);//Slice the Negative in the Object Element of Numbers I.e. -123.
                            this.KeysRecorder.pop();//Remove Old Negative Number. I.e. now it's 123
                            this.KeysRecorder.push(getOnlyNumbers);//Replace numbers without the Negative Sign. 123
                        } else {//Add a Negative in front of the Last Object String of Numbers.
                            this.KeysRecorder.pop();//Remove "123"
                            this.KeysRecorder.push("-" + lastObjChar);//Append "-123"
                        }
                    }
                    break;
                case "*":
                    this.standardProtocol();
                    break;
                case "/":
                    this.standardProtocol();
                    break;
                case "+":
                    this.standardProtocol();
                    break;
                case "-":
                    this.standardProtocol();
                    break;
            }
            //Ending Switch Code w/ these finalized processes.
            this.KeysPressed = [];
            this.DisplayString = this.KeysRecorder.join("");
            this.display();
        }
        //...
    }
    //...
    //This section handles finding the scientific Math Operator Match. (By Default returns false).
    operatorMatch(value) {
        switch (value) {
            case "(":
                return '(';
                break;
            case ")":
                return ')';
                break;
            case '^':
                return '^';
                break;
            case '-':
                return '-';
                break;
            case '+':
                return '+';
                break;
            case '*':
                return '*';
                break;
            case '/':
                return '/';
                break;
            case '<-':
                return '<-';
                break;
            case '+/-':
                return '+/-';
                break;
            default:
                return false;
                break;
        }
    }
    //...
    standardProtocol() {
        if (Object.keys(this.KeysRecorder).length !== 0) {
            if (this.operatorMatch(lastObjChar) === false || this.operatorMatch(lastObjChar) === ")") {//Push value if there's a number within the last character of the keysrecorder object or ends with ).
                this.KeysRecorder.push(value);
            } else {
                this.KeysRecorder.pop();
                this.KeysRecorder.push(value);
            }
        }
    }
}

var scientific = new ScientificCalculator();