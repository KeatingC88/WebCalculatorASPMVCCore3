class ScientificCalculatorEvents {

    /** (Updated: 12-4-2019)
     * This section is the OnClick Events and Math Logic for: 
     * Displaying Scientific-Expressional(PEMDAS/BEDMAS) Calculations.
     * 
     * How it works: 
     * 1) User clicks a button within the View (OnClick Event).
     * 2) The value of that button is passed into key(value) method which also serves as the index of this class.
     * 3) If it's a numerical value or decimal, then the values will be pushed into the KeysPressed[].
     * 4) If it's a math operator, then combine the digits/decimal from KeysPressed[] into a string and empty the keysPressed[] -- then push the string into KeysRecorder[]. KeysPressed[] -> KeysRecorder[].
     * 5) The KeysRecorder[] is for saving previous inputs.
     * 6) The KeysRecorder[] will also be responsible for Displaying the user inputs to the user back on the View.
     * 7) The KeysRecorder[] will also be responsible for final string that is passed into the calculation() method for a returned result.
     * 8) The Display String is overrided in each section as needed.
     * 9) The display() method is responsible for setting our data from the this.DisplayString into the View's DOM.
     */

    /**
     *
     * The Class Properties Section.
     *
    */

    DisplayString = "";//Used for Overriding/Overwriting just before the string is to be displayed to the View.
    KeysPressed = [];//Storage for Key Inputs such as Numbers, Decimal, or a Math Operator.
    KeysRecorder = []; //Completed KeyPressed[] Segements that are for Calculating Strings for This.Calcuate() or Output String for this.DisplayString.
    KeySessionRecorder = [];//Completed KeysRecorder[] Segements that will be saved to the database or for viewing history on the client-side.

    constructor() {
        console.log("Sci-Fi Calculator!");
        //Default Settings on start-up.
        this.keyBoardEventListener();
    }
    /**
    * 
    * This section handles all OnClick Events from the View (the Index).
    * 
    */
    key(value) {

        this.number(value);
        this.decimal(value);
        this.equalsOperation(value);
        this.scientificOperatorMatch(value);
        //console.log("Math Operator Match: " + this.scientificOperatorMatch(value);

    }

    /** 
     *  
     * The Class Methods Section.
     *  
    */

    //This section handles the Calculation Function from the KeysRecorder[].
    calculate() {
        var x = this.KeysRecorder.join("");//Get KeysRecorder[] as a String.
        var res = eval(x);//Calculate KeysRecorder[] as a String.
        return res;//Return the Solution/Result as a String.
    }
    //This section handles the revert to default properties and settings of the application.
    clearDisplay() {
        this.KeysPressed = [];//Empty the Object.
        this.KeysRecorder = [];//Empty the Object.
        document.getElementsByTagName("textarea")[0].setAttribute("placeholder", "");//Empty the <textArea> to default.
        document.getElementsByTagName("textarea")[0].setAttribute("rows", 1);//Resize the <textArea> back to default.
    }
    //This section handles the decimal rules.
    decimal(value) {
        /**
        * First Code Block: If a decimal is the first input without a number, then override the decimal input value with a "0.". This is mainly for display purposes and has no impact in calculations.
        * Seconde Code Block: The user will not be able to add duplicate decimals to the same number with the help of the KeysPressed[] which allows the user to apply only 1 decimal per number combination before/after each Math Operator as KeysPressed[] is reset.
        */
        if (value === ".") {
            var previousKeys = this.getLastKeysPressed();//returns single character string from the KeysPressed[].
            if (previousKeys === undefined || Object.keys(this.KeysPressed).length === 0) {//Checks if the user first clicked the decimal by an emptied KeysPressed[].
                this.KeysPressed.push("0.");//Override the Value by adding Zero with a decimal into the KeysPressed[].
                this.DisplayString = this.KeysRecorder.join("") + this.KeysPressed;//concatenate what's currently in the KeysRecorder[] w/ the user's KeysPressed[]. i.e. 123 + 0.(XYZ) or with an empty KeysRecorder[].
                this.display();//Output to the user.
            }

            var string = this.KeysPressed.join("");//String the current digits in the KeysPressed[].
            var find = string.includes(".");//Search the current keysPressed[] for a decimal.
            if (find === false) {//if no decimal was found
                this.KeysPressed.push(".");//then apply the decimal after the previous numerical user input(s).
                this.DisplayString = this.KeysRecorder.join("") + this.KeysPressed.join("");//concatenate the previous numerical user inputs(s) with a decimal example: 123.(XYZ)
                this.display();//Output to the user.
            }
        }
    }
    //This section handles the setting of DisplayString & <TextArea>.
    display() {
        document.getElementById("scientific-calculator-textarea-display").setAttribute("placeholder", this.DisplayString);
        //document.getElementsByTagName("textarea")[0].scrollTop = document.getElementsByTagName("textarea")[0].scrollHeight;//Forces the scroll to the bottom of the latest User Input in the <TextArea>.
    }
    //This section handles the "=" Keypad Button and the Enter Button on the Keyboard.
    equalsOperation(value) {
        
        if (value === "=") {
            /*
            console.log("Keys Pressed (raw): " + this.KeysPressed);            
            console.log("Keys Pressed (string): " + this.KeysPressed.join(""));
            console.log("Keys Recorder (raw): " + this.KeysRecorder);            
            console.log("Keys Recorder (string): " + this.KeysRecorder.join(""));
            */            
            this.scientificCalculation();            
            this.KeysRecorder = []//Clear KeysRecorder
            this.KeysPressed = []//Clear KeysPressed
        }
    }
    //This section gets the last index in KeysPressed[].
    getLastKeysPressed() {
        var lastItem = this.KeysPressed[this.KeysPressed.length - 1];
        return lastItem;
    }
    //This section is the Event Listener for the Web Page.
    keyBoardEventListener() {
        const that = this;
        window.addEventListener('keydown', function (e) {
            that.keyBoardEventCommand(e);
        });
    }
    //This section is the list of keyCodes (commands) between the browser and keyboard.
    keyBoardEventCommand(e) {
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
                this.clearDisplay();
                break;
        }

    }
    //This section handles all the numerical rules.
    number(value) {
        /**
        * The KeysPressed[] is mainly used for Numerical Inputs to form a Number before and after a Math Operator/Decimal.       
        */
        if (!isNaN(value)) {
            this.KeysPressed.push(value);//Set number into KeysPressed[].
            this.DisplayString = this.KeysRecorder.join("") + this.KeysPressed.join("");//concantentate what's currently in the KeysRecorder[] (such as before/after a decimal or previous strings containing numbers with operators).
            this.display();//Output to the user.
        }
    }
    //This section handles finding the scientific Math Operator Match. (By Default returns false).
    scientificOperatorMatch(value) {
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
            default:
                return false;
                break;
        }
    }
    //This handles the Scientific-Expression Calculator Protocol
    scientificMathOperation(value) {

        //console.log(this.scientificOperatorMatch(value));
        //Get the Last Character that is currently in the KeysRecorder[] (if any). First iteration though here will be empty.
        var lastChar = this.KeysRecorder[this.KeysRecorder.length - 1];
        /*
        console.log("CalculateOnScientific");
        //User has hit the operator button as the first button & can only be for assigning a negative to a number (when keyspressed is empty).
        if (this.scientificOperatorMatch(value) !== false && Object.keys(this.KeysPressed).length === 0) {
            if (value === '-') {
                this.KeysRecorder.push(value);
                this.DisplayString = this.KeysRecorder.join("");
                this.display();
            }
        }

        //There's an operator as the last character in the keysRecorder[]...
        if (this.scientificOperatorMatch(lastChar) !== false && Object.keys(this.KeysRecorder).length > 0 && Object.keys(this.KeysPressed).length) {
            console.log("keysrecorder matched");

        }

        //There's an operator...
        if (this.scientificOperatorMatch(value) !== false && Object.keys(this.KeysRecorder).length > 0 && Object.keys(this.KeysPressed).length) {
            console.log("operator matched push to recorder");

        }

        console.log("keysPressed 1: " + this.KeysPressed);
        console.log("keysRecorder 1: " + this.KeysRecorder);
        */
        
    }
    //This handles the Scientfic Calculation Finalized-String Processes
    scientificCalculation() {
        console.log("keysPressed 2: " + this.KeysPressed);
        console.log("keysRecorder 2: " + this.KeysRecorder);
    }

}

var scientificCalculator = new ScientificCalculatorEvents();