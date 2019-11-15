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

            console.log(this.KeysRecorder);
            if (this.KeysRecorder === undefined || Object.keys(this.KeysRecorder).length === 0) {
                console.log("Key Recorder is Empty");
                //Save the Key to the KeysPressed Object.
                this.KeysPressed.push(value);
                this.DisplayString = this.assembleStringofKeys();
                this.display();
            } else {
                console.log("Key Recorder is Not Empty");
                this.KeysPressed.push(value);
                this.DisplayString = this.assembleStringofKeys();
                this.display();
            }
            
        }

        if (value === ".") {
            //Its a Decimal
            //console.log("It's a Decimal: " + value);
            this.decimalManager();
            this.DisplayString = this.assembleStringofKeys();
            this.display();
        }

        if (this.arithmeticOperatorDetector(value) !== false) {
            //Its an Operator
            console.log("It's an Operator: " + value);
            //Get Current KeysPressed
            var numbers = this.assembleStringofKeys();
            //Save Current KeysPressed
            this.KeysRecorder.push(numbers);            
            //Save Current Operator
            this.KeysRecorder.push(value);
            //
            this.KeysPressed.push(value);
            console.log(this.KeysPressed);
            this.DisplayString = this.assembleStringofKeys();
            this.display();
            //Clear the Previous KeysPressed
            this.KeysPressed = [];            
            //console.log("KeysRecorder: " + this.KeysRecorder);
            //How to Display this?
        }

        if (value === "=") {
            console.log("Calculate");
            //Get the Assemble Last set of Keys Inputted by the User in the KeysPressed Object.
            var lastSetOfNumbers = this.assembleStringofKeys();
            //Add KeysPressed to the KeysRecorder Object.
            this.KeysRecorder.push(lastSetOfNumbers);
            console.log(this.KeysRecorder);
            //Calculate the String...
            //Calculate the KeysRecorder Method();
            //Clear the KeysRecorder = [];
            //Clear Current Keys Pressed
            this.KeysPressed = [];
            console.log("KeysPressed (On Calculate): " + this.KeysPressed);
            
        }

    }

    assembleStringofKeys() {
        var res = this.KeysPressed.join("");
        //console.log("Assemble String of Keys: " + res);
        return res;        
    }

    decimalManager() {
        
        //if (first element in KeysPressed is a Decimal -- Apply the 0.) { }
        var lastKeyPress = this.getLastKeysPressed();
        //
        if (lastKeyPress === undefined || Object.keys(this.KeysPressed).length === 0) {
            //If Object is empty, apply this push to the Array.
            this.KeysPressed.push("0.");
        }
        //if (there is a decimal in any KeysPressed elements, disable the decimal button) { }
        var string = this.assembleStringofKeys();
        var find = string.includes(".");        
        if (find === false) {
            //console.log("Find: " + find);
            //Either 1 Decimal or None was Found
            this.KeysPressed.push(".");
        } else {
            //console.log("Find: " + find);
            //Deimcal was Found -- do nothing to avoid doubling decimals in strings.
        }
    }

    getLastKeysPressed() {
        var lastItem = this.KeysPressed[this.KeysPressed.length - 1];
        //console.log("Last KeyPressed: " + lastItem);
        return lastItem;
    }

    getLastRecordedKey() {
        var lastItem = this.KeysRecorder[this.KeysRecorder.length - 1];
        //console.log("Last KeyRecorder: " + lastItem);
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
            default:
                return false;
                break;
        }
    }

    clearDisplay() {
        this.KeysPressed = [];
        this.KeysRecorder = [];
        document.getElementsByTagName("input")[0].setAttribute("placeholder", "");
    }

    display() {
        document.getElementsByTagName("input")[0].setAttribute("placeholder", this.DisplayString);
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