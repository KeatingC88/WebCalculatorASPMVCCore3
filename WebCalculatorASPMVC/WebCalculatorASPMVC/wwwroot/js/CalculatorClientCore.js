class CalculatorEvents
{
    DisplayString = "";
    KeysPressed = [];
    KeysRecorder = [];
    
    key(value) {
        
        if (!isNaN(value)) {
            this.KeysPressed.push(value);
            this.DisplayString = this.keyRecorderAssembler() + this.KeysPressed.join("");
            this.display();            
        }

        if (value === ".") {
            var previousKeys = this.getLastKeysPressed();
            if (previousKeys === undefined || Object.keys(this.KeysPressed).length === 0) {
                this.KeysPressed.push("0.");
                this.DisplayString = this.KeysRecorder.join("") + this.KeysPressed;
                this.display();
            }
            
            var string = this.KeysPressed.join("");
            var find = string.includes(".");
            if (find === false) {
                this.KeysPressed.push(".");
                this.DisplayString = this.keyRecorderAssembler() + this.KeysPressed.join("");
                this.display();
            }
            
        }

        if (this.arithmeticOperatorDetector(value) !== false) {
            
            var lastKeyPress = this.getLastKeysPressed();
            if (lastKeyPress === undefined || Object.keys(this.KeysPressed).length === 0 || lastKeyPress === "0.") {                
                this.KeysPressed.push("0");
                this.DisplayString = this.keyRecorderAssembler();
                this.display();
            }

            this.KeysPressed.push(value);
            this.KeysRecorder.push(this.KeysPressed.join(""));
            this.DisplayString = this.keyRecorderAssembler();
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

    keyRecorderAssembler() {
        var text = "";
        for (var i = 0, len = this.KeysRecorder.length; i < len; i++) {
            text += this.KeysRecorder[i];
        }
        return text;
    }

    getLastKeysPressed() {
        var lastItem = this.KeysPressed[this.KeysPressed.length - 1];
        return lastItem;
    }

    getLastRecordedKey() {
        var lastItem = this.KeysRecorder[this.KeysRecorder.length - 1];
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