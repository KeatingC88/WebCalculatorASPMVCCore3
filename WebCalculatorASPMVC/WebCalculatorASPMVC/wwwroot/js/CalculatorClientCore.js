class CalculatorEvents
{
    //Output to User (Result/Expression(s))
    DisplayString = "";
    //Storage for Single Characters that the User Types
    KeysPressed = [];
    //Storage for Strings from Single Characters that are assembled.
    KeysRecorder = [];

    key(value) {

        if (!isNaN(value)) {
            //Its a number
            //console.log("It's a Number: " + value);
            //Save the Key to the KeysPressed Object.
            this.KeysPressed.push(value);
            //Retrieve the Numbers after Assembling the String of Keys
            var numbers = this.assembleStringofKeys();
            console.log(numbers);
        }

        if (value === ".") {
            //Its a Decimal
            console.log("It's a Decimal: " + value);
            //if (first element in KeysPressed is a Decimal -- Apply the 0.) { }
            //if (there is a decimal in any KeysPressed elements, disable the decimal button) { }
            //Else Append the Decimal to KeysPressed, but do not assemble
            this.KeysPressed.push(value);
            console.log("KeysPressed: " + this.KeysPressed);
            //this.assembleStringofKeys();

            console.log("KeysRecorder: " + this.KeysRecorder);
        }

        if (this.arithmeticOperatorDetector(value) !== false) {
            //Its an Operator
            console.log("It's an Operator: " + value);
            //Save Current KeysPressed???
            //Clear the Previous KeysPressed???
            //Get Last Key ?????
            //Save the Operator in Keys.Pressed to KeyRecorder.
            this.KeysPressed.push(value);
            console.log("KeysPressed: " + this.KeysPressed);
            //this.assembleStringofKeys();

            //console.log("KeysRecorder: " + this.KeysRecorder);
        }

    }

    assembleStringofKeys() {
        var res = this.KeysPressed.join("");
        console.log("Assemble String of Keys: " + res);
        return res;        
    }

    decimalManager() {

    }

    getLastRecordedKey() {
        var lastItem = this.KeysRecorder[this.KeysRecorder.length - 1];
        //console.log("Last Key: " + lastItem);
        return lastItem;
    }

    arithmeticOperatorDetector(value) {
        switch (value) {
            case "+":
                return '+';
                break;
            case "-":
                return '-';
                break;
            case '*':
                return '*';
                break;
            case '/':
                return '/';
                break;
            case '=':
                return '=';
                break;
            default:
                return false;
                break;
        }
    }

    /*
    //Example
    //console.log(eval('2 * (2 + 2) / 0'));//
    DisplayString = "";
    KeysRecorder = [];
    KeysPressed = [];   

    //OnClick Event: For Calculator Keypad on the View. Inputs from User. Script Controller
    key(value) {
        
        if (!isNaN(value)) {
            this.userClickedNumber(value);
        } else if (this.arithmeticOperatorDetector(value) !== false) {
            this.userClickedOperator(value);
        } else if (this.decimalDetector(value) !== false) {
            this.userClickedDecimal(value);
        } else {
            //console.log("Error: Unassigned key");
            this.DisplayString = "Error!";
            this.stringDisplay();
        }
    }

    userClickedDecimal(value) {

        //
        this.KeysPressed.push(value);
        this.stringAssembler(this.KeysPressed);
        this.DisplayString = this.KeysRecorder[this.KeysRecorder.length - 1];
        this.stringDisplay();
        //
    }

    userClickedNumber(value) {        
        this.KeysPressed.push(value);
        this.stringAssembler(this.KeysPressed);
        this.DisplayString = this.KeysRecorder[this.KeysRecorder.length - 1];
        console.log(this.DisplayString);
        this.stringDisplay();
    }

    userClickedOperator(value) {

        var checkLastCharacter = this.KeysRecorder[this.KeysRecorder.length - 1][this.KeysRecorder.length - 1];
        var checkSomething = this.KeysRecorder[this.KeysRecorder.length - 1];
        console.log("checkLastChar: " + checkLastCharacter);
        console.log("checkSomething: " + checkSomething);//Clue
        console.log(this.KeysRecorder);

        if (this.arithmeticOperatorDetector(checkLastCharacter) !== false) { //This detects and prevents the user from entering 2 Operators at one after another. (+ - * /)
            console.log("Operator Detection: " + checkLastCharacter);
            
            this.KeysPressed.pop();
            this.KeysRecorder.pop();
            this.KeysPressed.push(value);
            this.stringAssembler(this.KeysPressed);
            this.DisplayString = this.KeysRecorder[this.KeysRecorder.length - 1];
            this.stringDisplay();

        } else {

            console.log("Default");
            this.KeysPressed.push(value);
            this.stringAssembler(this.KeysPressed);
            this.DisplayString = this.KeysRecorder[this.KeysRecorder.length - 1];
            this.stringDisplay();
            
        }        
    }

    stringAssembler(values) {
        var result = values.join("");
        this.KeysRecorder.push(result);
        return result;
    }

    stringDisplay() {
        document.getElementsByTagName("input")[0].setAttribute("placeholder", this.DisplayString);
    }

    decimalDetector(value) {
        if (value !== ".") {
            return false;
        } else {
            return true;
        }
    }

    //Return Detected Math Operator or Return false if none are in the key-pressed-value.
    arithmeticOperatorDetector(value) {        
        switch (value) {
            case "+":
                return '+';
                break;
            case "-":
                return '-';
                break;
            case '*':
                return '*';
                break;
            case '/':
                return '/';
                break;
            case '=':
                return '=';
                break;
            default:
                return false;                
                break;
        }
    }
    //Clear the Textbox
    clearDisplay() {
        this.KeysRecorder = [];
        this.KeysPressed = [];
        document.getElementsByTagName("input")[0].setAttribute("placeholder", "");
    }

*/
}
//Initiate/Instantiate the Class
var calculator = new CalculatorEvents();

class CalculatorServices
{
    constructor() { }
}

//var calculatorServices = new calculatorServices();