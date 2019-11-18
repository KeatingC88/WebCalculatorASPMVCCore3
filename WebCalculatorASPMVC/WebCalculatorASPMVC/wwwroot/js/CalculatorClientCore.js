class CalculatorEvents
{
    //Output to User (Result/Expression(s))
    DisplayString = "";
    //Storage for Single Characters that the User Types
    KeysPressed = [];
    //Storage for Strings from Single Characters that are assembled.
    KeysRecorder = [];
    //Input Example to use: 3.3+3.3-9+10
    key(value) {
        //If numerical value...
        if (!isNaN(value)) {
            //console.log("It's a Number: " + value);
            //Push numeric value.
            this.KeysPressed.push(value);
            //Set to output string.
            this.DisplayString = this.KeysPressed.join("");
            //Display output to the user.
            this.display();
            //If KeysRecorder has an Element (meaning it's not the first inital set of numbers before an Arithmetic Operator is Pressed on the KeyPad)
            if (Object.keys(this.KeysRecorder).length > 0) {
                var previousKeys = this.getLastRecordedKey();
                this.DisplayString = previousKeys + this.KeysPressed.join("");
                this.display();
            }
        }

        if (value === ".") {
            //console.log("It's a Decimal: " + value);
            var previousKeys = this.getLastKeysPressed();
            //If there's no number present when the decimal key is pressed, then provide a zero before the decimal.
            if (previousKeys === undefined || Object.keys(this.KeysPressed).length === 0) {
                this.KeysPressed.push("0.");
                this.DisplayString = this.KeysPressed;
                this.display();
            }
            
            var string = this.KeysPressed.join("");
            var find = string.includes(".");

            if (find === false) {

                //console.log("Find: " + find);
                //Either 1 Decimal or None was Found
                this.KeysPressed.push(".");
                this.DisplayString = this.KeysPressed.join("");
                this.display();

            }
            
        }

        if (this.arithmeticOperatorDetector(value) !== false) {
            
            var lastKeyPress = this.getLastKeysPressed();
            //If there's no number presented after the decimal from when key is pressed, then provide a zero after the decimal.
            if (lastKeyPress === undefined || Object.keys(this.KeysPressed).length === 0 || lastKeyPress === "0.") {                
                this.KeysPressed.push("0");
                this.DisplayString = this.KeysPressed;
                this.display();
            }

            //console.log("It's an Operator: " + value);
            //console.log("KeyRecorder: " + this.KeysRecorder);
            this.KeysPressed.push(value);
            this.KeysRecorder.push(this.KeysPressed.join(""));
            this.DisplayString = this.KeysPressed.join("");
            this.display();
            this.KeysPressed = [];
        }

        if (value === "=") {            
            this.KeysRecorder.push(this.KeysPressed.join(""));
            console.log("Calculate(raw):" + this.KeysRecorder);
            console.log("Calculate(string):" + this.KeysRecorder.join(""));
            this.DisplayString = this.KeysRecorder.join("");
            this.display();
        }

    }

    getLastKeysPressed() {
        var lastItem = this.KeysPressed[this.KeysPressed.length - 1];
        console.log(this.KeysPressed);
        console.log("Last KeyPressed: " + lastItem);
        return lastItem;
    }

    getLastRecordedKey() {
        var lastItem = this.KeysRecorder[this.KeysRecorder.length - 1];
        console.log(this.KeysRecorder);
        console.log("Last KeyRecorder: " + lastItem);
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

}
//Initiate/Instantiate the Class
var calculator = new CalculatorEvents();

class CalculatorServices
{
    constructor() { }
}

//var calculatorServices = new calculatorServices();