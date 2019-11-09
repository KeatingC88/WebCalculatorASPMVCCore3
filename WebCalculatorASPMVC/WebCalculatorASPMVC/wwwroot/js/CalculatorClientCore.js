class CalculatorEvents
{
    //Example
    //console.log(eval('2 * (2 + 2) / 0'));//
    DisplayString = "";
    KeysRecorder = [];
    KeysPressed = []; 

    //OnClick Event: For Calculator Keypad on the View. Inputs from User.
    key(value) {
        if (!isNaN(value)){
            this.userClicksNumber(value);
        } else if (this.arithmeticOperatorDetector(value) !== false) {
            this.userClickedOperator(this.arithmeticOperatorDetector(value));
        } else {
            //This should never been seen, but you never know!
            //console.log("Error: Neither Key is a Number or Operator");
            this.DisplayString = "Error!";
            this.stringDisplay();
        }
    }

    userClicksNumber(value) {        
        this.KeysPressed.push(value);
        this.stringAssembler(this.KeysPressed);
        this.DisplayString = this.KeysRecorder[this.KeysRecorder.length - 1];
        console.log(this.DisplayString);
        this.stringDisplay();
    }

    userClickedOperator(value) {
        var checkLastCharacter = this.KeysRecorder[this.KeysRecorder.length - 1][this.KeysRecorder.length - 1];
        if (this.arithmeticOperatorDetector(checkLastCharacter) !== false) {
            this.KeysPressed.pop();
            this.KeysRecorder.pop();
            this.KeysPressed.push(value);
            this.stringAssembler(this.KeysPressed);
            this.DisplayString = this.KeysRecorder[this.KeysRecorder.length - 1];
            this.stringDisplay();            
        } else {            
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
        this.firstRun = true;
        document.getElementsByTagName("input")[0].setAttribute("placeholder", "");
    }


}
//Initiate/Instantiate the Class
var calculator = new CalculatorEvents();

class CalculatorServices
{
    constructor() { }
}

//var calculatorServices = new calculatorServices();