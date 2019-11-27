class CalculatorEvents
{
    DisplayString = "";
    KeysPressed = [];
    KeysRecorder = [];
    KeySessionRecorder = [];

    //https://stackoverflow.com/questions/10894638/how-to-set-cursor-to-input-box-in-javascript

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

    constructor() {
        //Keyboard EventListener
        const that = this;
        //Event Listener to find the keyboard that was pressed.
        window.addEventListener('keydown', function (e) {
            that.keyBoardEventConnector(e);
        });      
    }

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
        if (this.arithmeticOperatorMatch(value) !== false) {
            //Keeping Track of the KeyPresses and KeysRecorded based on their latest inputs.
            var lastKeyPressed = this.getLastKeysPressed();//fetch the last character key that was pressed in the keysPressed[].
            var lastKeyRecorded = this.getLastRecordedKey();//fetch the last character key that was pressed in the keysRecorder[].            
            //This allows the user to begin with a negative number
            if (Object.keys(this.KeysPressed).length === 0) {
                if (value === "-" && lastKeyRecorded != "-") {
                    this.KeysPressed.push(value);
                    this.KeysRecorder.push(this.KeysPressed.join(""));
                    this.DisplayString = this.KeysPressed;
                    this.display();
                    this.KeysPressed = [];
                }
            }

            if (Object.keys(this.KeysPressed).length > 0) {
                console.log("KeysPressed has 1 Element");
                this.KeysPressed.push(value);
                this.KeysRecorder.push(this.KeysPressed.join(""));
                this.DisplayString = this.keyRecorderAssembler();
                this.display();
                this.KeysPressed = [];
            } else {
                this.DisplayString = this.keyRecorderAssembler();
                this.display();
                this.KeysPressed = [];
            }

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
            /*
                if ((i + 2) < 4) {
                    document.getElementsByTagName("textarea")[0].setAttribute("rows", 2 + i);//Resize every time an Operator is selected.
                } else {
                    document.getElementsByTagName("textarea")[0].setAttribute("rows", 4);//Stop Resizing at this many rows.
                } 
            */
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
    //Empties the object properties in this class to reset the application real-time.
    clearDisplay() {
        this.KeysPressed = [];
        this.KeysRecorder = [];
        document.getElementsByTagName("textarea")[0].setAttribute("placeholder", "");
        document.getElementsByTagName("textarea")[0].setAttribute("rows", 1);//Resize back to default.
    }
    //Outputs the finalized string to the user simulating a real-time response.
    display() {
        document.getElementsByTagName("textarea")[0].setAttribute("placeholder", this.DisplayString);//inject into bootstrap's placeholder that is a readonly property in the view. Targets the first Input.
        document.getElementsByTagName("textarea")[0].scrollTop = document.getElementsByTagName("textarea")[0].scrollHeight;//Forces the scroll in the display to the bottom of the last User Input.
    }
    //Finds a matching Operator and returns the operator as a string; by default, will return false if no match is found.
    arithmeticOperatorMatch(value) {
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
    //Keyboard Events Matcher
    keyBoardEventConnector(e) {
        //console.log("Key Code:" + e.keyCode);
        switch (e.keyCode) {
            case 96:
                this.key(0);
                break;
            case 97:
                this.key(1);
                break;
            case 98:
                this.key(2);
                break;
            case 99:
                this.key(3);
                break;
            case 100:
                this.key(4);
                break;
            case 101:
                this.key(5);
                break;
            case 102:
                this.key(6);
                break;
            case 103:
                this.key(7);
                break;
            case 104:
                this.key(8);
                break;
            case 105:
                this.key(9);
                break;
            case 106:
                this.key('*');
                break;
            case 107:
                this.key('+');
                break;
            case 109:
                this.key('-');
                break;
            case 110:
                this.key('.');
                break;
            case 111:
                this.key('/');
                break;
            case 191:
                this.key('/');
                break;
            case 13:
                this.key('=');
                break;
            case 187:
                if (e.shiftKey === false) {
                    this.key('=');
                } else {
                    this.key('+');
                }
                break;
            case 189:
                this.key('-');
                break;
            case 48:
                if (e.shiftKey === false) {
                    this.key(0);
                } else {
                    this.key(')');
                }
                break;
            case 57:
                if (e.shiftKey === false) {
                    this.key(9);
                } else {
                    this.key('(');
                }
                break;
            case 56:
                if (e.shiftKey === false) {
                    this.key(8);
                } else {
                    this.key('*');
                }
                break;
            case 55:
                this.key(7);
                break;
            case 54:
                if (e.shiftKey === false) {
                    this.key(6);
                } else {
                    this.key('^');
                }
                break;
            case 53:
                if (e.shiftKey === false) {
                    this.key(5);
                } else {
                    this.key('%');
                }
                break;
            case 52:
                this.key(4);
                break;
            case 51:
                this.key(3);
                break;
            case 50:
                this.key(2);
                break;
            case 49:
                this.key(1);
                break;
            case 190:
                this.key('.');
                break;
            case 46://Delete
                this.clearDisplay();
                break;
            case 8://BackSpace
                //
                this.clearDisplay();
                break;
            //
        }

    }
}



//Initiate by Instantiation of current the class.
var calculator = new CalculatorEvents();

class CalculatorServices
{
    constructor() { }
}

//var calculatorServices = new calculatorServices();