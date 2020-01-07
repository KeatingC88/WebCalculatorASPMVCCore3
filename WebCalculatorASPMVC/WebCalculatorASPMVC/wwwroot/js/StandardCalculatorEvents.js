class StandardCalculatorEvents
{
    /** (Updated: 12-11-2019)
     * This section is the OnClick Events and Math Logic for: 
     * Standard(Sequential-User-Input) Calculations.
     * 
     * How this class works: 
     * 1) The user clicks on a button within the View (OnClick="StandardCalculator.Key(value)").
     * 2) The value of that button is passed into key(value) method.
     * 3) If value is a numerical value or decimal, then the values will be pushed into the KeysPressed[].
     * 4) If value is a math operator, then combine the digits/decimal from KeysPressed[] into a string & empty the keysPressed[].
     * 5) KeysPressed[] pushs the string into KeysRecorder[] for saving the number/decimal for calculation.
     * 6) The KeysRecorder[] is for primarily for saving previous numbers, possibly a decimal, and a math operator input.
     * 7) The KeysRecorder[] will be using a single-finalized string for this.calculation() & returns the result string.
     * 8) The KeysRecorder[] then uses this.DisplayString & this.display() to send the result or user input data to the <textarea> as an output protocol.
     */

    /**
     *
     * The Class Properties Section.
     *
    */

    DisplayString = "";//Overriding for this.display() to use as the output.
    KeysPressed = [];//Used for pushing Numericals/Decimals into an array/object.
    KeysRecorder = [];//Used for pushing KeysPressed[] and a Math Operator. Segements are broken after every math operator.
    KeySessionRecorder = [];//Used for pushing KeysRecorder[] Data to the Database &S Calculation History Log.
    
    constructor() {
        this.keyBoardEventListener();        
    }

    /**
     * 
     * This section handles all OnClick Events from the View (the Index for Standard Calculation).
     * 
     */

    key(value){
        this.number(value);
        this.decimal(value);
        this.equalsOperation(value);
        this.standardMathOperation(value);
    }

    /** 
     *  
     * The Class Methods Section.
     *  
    */
    
    //This section handles the Calculation Process from the KeysRecorder[].
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
        //document.getElementsByTagName("textarea")[0].setAttribute("rows", 1);//Resize the <textArea> back to default.
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
        document.getElementById("standard-calculator-textarea-display").setAttribute("placeholder", this.DisplayString);
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
            this.standardCalculation();            
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
    //This handles the Standard Calculation with a Finalized-String to Process.
    standardCalculation() {
        //Get the Last Character in the KeysRecorder.
        var lastChar = this.KeysRecorder[this.KeysRecorder.length - 1];
        //First Condition: the last character in the finalized string is an Operator. Remove it & continue the calculation.
        if (this.standardOperatorMatch(lastChar) !== false && Object.keys(this.KeysPressed).length === 0) {//This conditions if the user has "12+12+" then hits equal sign.
            this.KeysRecorder.pop();//Remove the remaining Math Operator.
            this.DisplayString = this.calculate();//Calculator the KeysRecorder[].
            this.display();//Output to user.
        //Second Condition: ONLY used when user calculates 2 numbers unlike the automatations in basicMathOperations() method that calculates on the 2nd and every basic math operator.
        } else if (this.standardOperatorMatch(lastChar) !== false && Object.keys(this.KeysPressed).length > 0) {//This conditions if the user has "12+12" then hits equal sign.
                this.KeysRecorder.push(this.KeysPressed.join(""));//Push any left over Digits/Decimal in the KeysPressed[].
                this.DisplayString = this.calculate();//Calculate the keysRecorder[].
                this.display();//Output to user.
        }
    }
    //This section handles the operator rules(+/-*).
    standardMathOperation(value) {
        /** 
        * Everytime a User selects a Math Operator, KeysPressed[] gets set into the KeysRecorder[] and resets the KeysPressed[].
        * Standard Calculators will calculate in Sequence after the 2nd Math Operator. It Calculates immediately without considering "PEMDAS/BEDMAS" in Algerbraic Expressions.
        * I.E. 123 + 123 * 2: It will do 123 + 123 first, then multiply by 2 -- assuming the numbers and operators are input from "Left to Right".
        */
        //Get the Last Character that is currently in the KeysRecorder[] (if any). First iteration though here will be empty.
        var lastChar = this.KeysRecorder[this.KeysRecorder.length - 1];
        //First Condition: check if there's a basic math operator & if the user is hitting duplicate math operators back2back in sequence of any kind (/*-+) & swap the operators if so.
        if (this.standardOperatorMatch(lastChar) !== false && Object.keys(this.KeysPressed).length === 0) {
            this.KeysRecorder.pop();//Remove the old Operator to avoid having 2 or more operators in the Keysrecorder[]. Prevents "123+/*-" user-inputs & causes this.calculate() error.
            this.KeysRecorder.push(value);//Push the new pressed Operator.
            this.DisplayString = this.KeysRecorder.join("");//Run the String Assembler & set it into the Display String Property.
            this.display();//Output to the user.
            //Second Condition: check if it's a basic math operator & if standard calculation is on & numbers are presented before this basic math operator.
        } else if (this.standardOperatorMatch(value) !== false && Object.keys(this.KeysPressed).length !== 0) {
            this.KeysRecorder.push(this.KeysPressed.join(""));//Get the KeysPressed[](Digits) and set them into the Keysrecorder[] as a string number.
            this.KeysPressed = [];//Reset the KeysPressed[] for the next series of digits.
            this.KeysRecorder.push(value);//Set the Math Operator into the KeysRecorder[] after the digits. I.e. ("123","+").
            this.DisplayString = this.KeysRecorder.join("");//Get keysRecorder[] as a String and override/overwrite this.DisplayString property.
            this.display();//Output to the user.
            //Third Condition: When keysRecorder[] has a number, an operator, another number, then calculate them. And push the next operator for the next number to come after it.
            if (Object.keys(this.KeysRecorder).length >= 3) {
                var calculateString = this.KeysRecorder[0] + this.KeysRecorder[1] + this.KeysRecorder[2];//Get Elemenets in the KeysRecorder[] i.e. "[123], [+], [123]".
                this.KeysRecorder = [];//Clear the KeysRecorder
                this.KeysRecorder.push(calculateString);//Push the number, the operator, and the other number into KeysRecorder[] for calculation in within the [].
                var result = this.calculate();//Calculate what's currently in the KeysRecorder[] for a Result.
                this.KeysRecorder = [];//Empty the Recorder as we have the Result from Calculation.
                this.KeysRecorder.push(result);//Push the Result (number) into the Empty KeysRecorder[].
                this.KeysRecorder.push(value);//Set the Value into the KeysRecorder[] after the number;
                this.DisplayString = this.KeysRecorder.join("");//Run the String Assembler and set that into the Display String Property.
                this.display();//Output to the user.
            }
        }
    }
    //This section handles finding a basic Math Operator Match. By Default returns false, or a matching character string.
    standardOperatorMatch(value) {
        switch (value) {
            case '+':
                return '+';
                break;
            case '-':
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
}

var standardCalculator = new StandardCalculatorEvents();

