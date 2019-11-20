class CalculatorEvents
{
    DisplayString = "";
    KeysPressed = [];
    KeysRecorder = [];

    /**
     * This section is just for Displaying Expression Inputs from the User (Buttons).
     * 
     * How it works: 
     * 1) A value is added to keysPressed when an OnClick Event is used in the View as a button. 
     * 2) The value is inspected by 3 IF statements and sent to the keysRecorder as a Log/Storage for all the keysPressed in this session acting as real-time events. 
     * 3) keysPressed() is reset after every Operator the user hits (Addition, Subtraction, Multiplication, Division) while the keysRecorder keeps that information in segemental elements in the object.
     * 4) In the end, this class results into an arithmetic expression string for calculation rules; rules that is to be handled out of this class and managed by another class; the Calculator Services Class for PEMDAS and etc.
     * 
     * IF Statements:
     * 1) Is value a number.
     * 2) Is value an Operator found in the arithmeticOperatorDetector() Method, and if it isn't then it will return false.
     * 3) Is value a Decimal and only allow 1 decimal per This.KeyPressed and apply a zero before the decimal if the decimal is pressed first.
     * 4) Is value an Equal Sign that performs the Calculation of the string that is finalized by all other methods in this Class Object.
     * 
     * keyRecorderAssembler() Method: returns a String that is concantenated from everything in the KeyRecorder[].
     * 
     * arithmeticOperatorDetector(value) Method: returns a matching string of the Operator the user has clicked, and returns false by default (no match found).
     * 
     * clearDisplay() Method: clears both keysRecorder and keysPressed which resets the entire application in real-time.
     * 
     * display() Method: sets the DisplayString into the HTML input type=text as a readonly output for the user.
     * 
     * @param {any} value
     */

    //OnClick Event Values passed from the View.
    key(value) {
        //Handles the numerical rules
        if (!isNaN(value)) {
            
            this.KeysPressed.push(value);//Set number into the object.
            this.DisplayString = this.keyRecorderAssembler() + this.KeysPressed.join("");//concantentate what's currently in the keysRecorder with the current key that is pressed.
            this.display();//output.

        }
        //Handles the decimal rules
        if (value === ".") {

            var previousKeys = this.getLastKeysPressed();//A returned string from the last key that was pressed by the user.
            if (previousKeys === undefined || Object.keys(this.KeysPressed).length === 0) {//if no numerical key was pressed before.

                this.KeysPressed.push("0.");//Assign by pushing a Zero w/ a decimal to the KeysPressed.
                this.DisplayString = this.KeysRecorder.join("") + this.KeysPressed;//concatenate the previous numerical user input(s) with the numbers following after the decimal. example: 0.(XYZ)
                this.display();//output to the user.

            }
            
            var string = this.KeysPressed.join("");//combine everything currently in the keysPressed into a string.
            var find = string.includes(".");//search the current keysPressed object for a decimal.
            if (find === false) {//if no decimal was found

                this.KeysPressed.push(".");//then apply the decimal after the previous numerical user input(s).
                this.DisplayString = this.keyRecorderAssembler() + this.KeysPressed.join("");//concatenate the previous numerical user inputs(s) with a decimal example: 123.(XYZ)
                this.display();//output to the user.

            }
            
        }
        //Handles the operator rules
        if (this.arithmeticOperatorDetector(value) !== false) {
            
            var lastKeyPress = this.getLastKeysPressed();//fetch the last character key that was pressed in the keysPressed[].
            if (lastKeyPress === undefined || Object.keys(this.KeysPressed).length === 0 || lastKeyPress === "0.") {//if no number was pressed, the object is empty, or the last key is a decimal without a number while the user pressed an operator.

                this.KeysPressed.push("0");//then assign a 0 to be placed after the decimal example: 213.0
                this.DisplayString = this.keyRecorderAssembler();//string the keyRecorder object for the Display String.
                this.display();//output to the user.

            }

            this.KeysPressed.push(value);//else apply the Operator to the keysPressed object.
            this.KeysRecorder.push(this.KeysPressed.join(""));//set the operator into the keysRecorder so the user can begin typing the next set of numbers or decimal.
            this.DisplayString = this.keyRecorderAssembler();//string the keyRecorder object for the Display String.
            this.display();//output to the user.
            this.KeysPressed = [];//reset/clear the object for the next series of numbers or decimal.

        }
        //Handles the calculation rules
        if (value === "=") {

            this.KeysRecorder.push(this.KeysPressed.join(""));//push the current keysPressed to the keyRecorder for finaliziation of the display string.
            console.log("Calculate(raw):" + this.KeysRecorder);
            console.log("Calculate(string):" + this.KeysRecorder.join(""));
            this.DisplayString = this.KeysRecorder.join("");//convert the finalized object to a string.
            this.display();//output to the user.

        }

    }
    //Loops the KeysRecorder and assembles a single string for the DisplayString before outputting to the user with the display() method.
    keyRecorderAssembler() {
        
        var text = "";
        for (var i = 0, len = this.KeysRecorder.length; i < len; i++) {
            text += this.KeysRecorder[i];
        }
        return text;

    }
    //Get the Last KeyPressed Value in the object. Returns a String.
    getLastKeysPressed() {

        var lastItem = this.KeysPressed[this.KeysPressed.length - 1];
        return lastItem;

    }
    //Unused method that might come in handy later.
    getLastRecordedKey() {

        var lastItem = this.KeysRecorder[this.KeysRecorder.length - 1];
        return lastItem;

    }
    //Finds a matching Operator and returns the operator as a string; by default, will return false if no match is found.
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
    //Empties the object properties in this class to reset the application real-time.
    clearDisplay() {
        this.KeysPressed = [];
        this.KeysRecorder = [];
        document.getElementsByTagName("input")[0].setAttribute("placeholder", "");
    }
    //Outputs the finalized string to the user simulating a real-time response.
    display() {
        document.getElementsByTagName("input")[0].setAttribute("placeholder", this.DisplayString);//inject into bootstrap's placeholder that is a readonly property in the view. Targets the first Input.
    }

}
//Initiate by Instantiation of current the class.
var calculator = new CalculatorEvents();

class CalculatorServices
{
    constructor() { }
}

//var calculatorServices = new calculatorServices();