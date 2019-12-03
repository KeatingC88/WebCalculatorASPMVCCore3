class CalculatorEvents
{
    //https://stackoverflow.com/questions/10894638/how-to-set-cursor-to-input-box-in-javascript

    /** (Updated: 12-2-2019)
     * This section is the OnClick Events and Math Logic: 
     * Displaying Scientific-Expressional(PEMDAS/BEDMAS) & Standard(Sequential-User-Input) Calculations.
     * 
     * How it works: 
     * 1) User clicks a button on the View.
     * 2) The value of that button is passed into this Class through Javascript's OnClick Event. (Either by mouse/keyboard).
     * 3) If it's numerical value or decimal, it will be pushed into the KeysPressed[].
     * 4) If it's a math operator, it combine the digits/decimal into a single string from KeysPressed[] and empty it the object.
     * 5) Once the digits/decimal is compiled with the math operator, it will then store that data into KeysRecorder[].
     * 6) The KeysRecorder[] will be responsible for Displaying the user inputs to the user back on the View.
     * 7) The KeysRecorder[] will also be responsible for Calculations of the String it's passing to the calculation() method.
     * 8) The Display String is often overrided in various sections of this application for presentation.
     * 9) The display() method is responsible for setting our data into the View.
     */

    /**
     *
     * The Class Properties Section.
     *
    */
    DisplayString = "";// Used to Set Expressions and Connect to the Output Display() for the User to View in the Text-Area.
    KeysPressed = [];// Key Inputs such as Numbers, Decimal, or a Math Operator.
    KeysRecorder = []; // Completed KeyPressed[] Segements that are for Calculation Strings for This.Calcuate(), Output Strings for Display(), and Standard Type Calculator Operations.
    KeySessionRecorder = [];// Entire Segemented Expressions or History Storage of the User's Expression Strings.
    CalculateOnSequence = false;//False = Scientific Calculator (PEMDAS/BEDMAS Calculations), True = Standard Calculator (Input Sequence Calculations from First Inputs to Last Excempts PEMDAS/BEDMAS Algerbraic Order of Operations Sequences)
    //Script Start-Up
    constructor() {
        this.keyBoardEventListener();//This must load on start-up.
    }
    /**
     * 
     * This section handles all OnClick Events from the View (aka the Index).
     * 
     */
    key(value) {        
        this.calculatorRadioType();//Switches the Type of Calculator (Scientific/Standard) based View's Form-Radio Buttons.
        this.number(value);
        this.decimal(value);
        this.basicMathOperator(value);
        this.equalsOperator(value);    
    }
    /** 
     *  
     * The Class Methods Section.
     *  
    */
    //This section handles finding a Math Operator Math. (By Default returns false).
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
    //This section handles the operator rules(+/-*).
    basicMathOperator(value) {
       /** 
       * Everytime a User selects a Math Operator, set it into the KeysRecorder[] and Reset the KeysPressed[].
       * Only the "-" has a special exception for Negative Numbers.
       * There are 2 parts: When the user decides whether to use a Standard Calculator or Scientific Calculator.
       * Standard Calculators will Calculate in a Sequence each time a new number is input, and when the Math Operator is clicked, it Calculates immediately without considering "PEMDAS/BEDMAS in Algerbraic Expressions".
       * Scientific Calculators will use this.CalculateOnSequence === false while Standard Calculators will use this.CalculateOnSequence === true in this program.
       */
        if (this.arithmeticOperatorMatch(value) !== false) {// The User has Selected a Math Operator because a Match was Found (not false).
            if (this.CalculateOnSequence === false) {
                //Calculator's Scientific-Expression Protocol
                if (Object.keys(this.KeysPressed).length >= 1 && Object.keys(this.KeysRecorder).length !== undefined) {// If there are digits and the user hits a Math Operator
                    this.KeysPressed.push(value);//Set the Math Operator with the previous digits in the KeysPressed[].                    
                    this.KeysRecorder.push(this.KeysPressed.join(""));//Set the previous Digits that are currently in the KeysPressed w/ the New Math Operator Value into the KeysRecorder[]
                    this.DisplayString = this.keyRecorderAssembler();//Run the String Assembler from the KeysRecorder[].
                    this.display();//Output to the user.
                    this.KeysPressed = [];//Reset the KeysPressed[] after each Math Operator Value.
                }
            } else if (this.CalculateOnSequence === true) {
                //Calculator's Standard Protocol
                this.KeysRecorder.push(this.KeysPressed.join(""));//Get the Current KeysPressed[] from the User (Digits) and set them into the Keysrecorder[].
                this.KeysPressed = [];//Reset the KeysPressed for if when the User wants to select more digits/decimal.
                this.KeysRecorder.push(value);//Set the Math Operator into the Recorder after the digits.
                this.DisplayString = this.keyRecorderAssembler();//Run the String Assembler and set that into the Display String Property.
                this.display();//Output the the user.
                //Once the user has created 1 Number, then Selected an Operator, and then created a second number (i.e. 123 + 123), and 
                //the User has chosen another Math Operator(i.e. 123 + 123 "+").Calculate the "123 + 123" like a standard Calculator would do.
                if (Object.keys(this.KeysRecorder).length >= 3) {//If the KeysRecorder has "123 + 123" run these instructions.
                    var calculateString = this.KeysRecorder[0] + this.KeysRecorder[1] + this.KeysRecorder[2];//Get Elemenets in the Array  i.e. "[123], [+], [123]" while excluding the current Math Operator (value).
                    this.KeysRecorder = [];//Clear the KeysRecorder
                    this.KeysRecorder.push(calculateString);//Set the newly created String containing what we need i.e. "123+123". w/o the current Math Operator Value.
                    var result = this.calculate();//Calculate what's in the KeysRecorder[] now that we've set it up for calculation.
                    this.KeysRecorder = [];//Empty the Recorder as we have the Result from Calculation.
                    this.KeysRecorder.push(result);//Push the Result into the Empty KeysRecorder[].
                    this.KeysRecorder.push(value);//Set the Value into the KeysRecorder[];
                    this.DisplayString = this.keyRecorderAssembler();//Run the String Assembler and set that into the Display String Property.
                    this.display();//Output to the user.
                }
            }
        }
    }
    //This section handles the Calculation Function from the KeysRecorder[].
    calculate() {
        var x = this.keyRecorderAssembler();//Get KeysRecorder[] as a String.
        var res = eval(x);//Calculate KeysRecorder[] as a String.
        return res;//Return the Solution/Result as a String.
    }
    //This section handles the View's Radio options that corresponds with application's codeflow for Sequence or Scientific.
    calculatorRadioType() {
        if (document.getElementById('standard-calculator-radio').checked) {
            this.CalculateOnSequence = true;
        } else if (document.getElementById('scientific-calculator-radio').checked) {
            this.CalculateOnSequence = false;
        }
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
                this.DisplayString = this.keyRecorderAssembler() + this.KeysPressed.join("");//concatenate the previous numerical user inputs(s) with a decimal example: 123.(XYZ)
                this.display();//Output to the user.
            }
        }
    }    
    //This section handles the setting of DisplayString & <TextArea>.
    display() {
        document.getElementsByTagName("textarea")[0].setAttribute("placeholder", this.DisplayString);//inject into bootstrap's placeholder that is a readonly property in the view. Targets the first Input.
        document.getElementsByTagName("textarea")[0].scrollTop = document.getElementsByTagName("textarea")[0].scrollHeight;//Forces the scroll to the bottom of the latest User Input in the <TextArea>.
    }
    //This section handles the "=" Keypad Button and the Enter Button on the Keyboard.
    equalsOperator(value) {
        /**
        * If the last Character in the Final Calculations String is a Math Operator, then do not Calculate. Just Ignore until digits/decimal is present.        
        */
        if (value === "=") {
            /*
            console.log("Keys Pressed (raw): " + this.KeysPressed);
            console.log("Keys Pressed (string): " + this.KeysPressed.join(""));
            console.log("Keys Recorder (raw): " + this.KeysRecorder);
            console.log("Keys Recorder (string): " + this.KeysRecorder.join(""));
            */
            if (Object.keys(this.KeysRecorder).length > 0 && Object.keys(this.KeysRecorder).length !== undefined) {

                this.KeysRecorder.push(this.KeysPressed.join(""));//Get any remaining KeysPressed[] values (usually just digits).         
                var keysRecorderString = this.keyRecorderAssembler();//Get the current KeysRecorder[] and set to a variable.
                var endingCharsOfRecorderString = keysRecorderString.substring(keysRecorderString.length - 1);//Get the Last Character in the KeysRecorder[].String and set to a variable.

                if (this.arithmeticOperatorMatch(endingCharsOfRecorderString) !== false) {
                    //If the last character is ending with a Math Operator.
                    this.DisplayString = this.keyRecorderAssembler();//Set KeysAssembler (KeysRecorder) by Default
                    this.display();//Output Default to the User
                } else {
                    //Run Calculations and Output Processes.
                    this.DisplayString = this.calculate();//Display the Result String
                    this.display();//Output to the user.
                    this.KeysRecorder = [];//Clear after Calculation.
                    this.KeysPressed = [];//Clear after Calculation.
                }
            } else {
                //If there is no Math Operator, then display KeysPressed[].
                this.DisplayString = this.KeysPressed.join("");//Set KeysPressed by Default
                this.display();//Output Default to the User
            }
        }
    }
    //This section iterates the KeysRecorder[] and return a single string.(Generally for DisplayString property).
    keyRecorderAssembler() {        
        var text = "";
        var lastRecordedKeyLastChar = this.KeysRecorder;
        console.log(lastRecordedKeyLastChar);
        for (var i = 0, len = this.KeysRecorder.length; i < len; i++) {
            text += this.KeysRecorder[i];
            //if(lastrecordedkeylastChar === +, -, *, / && lastrecordedkey is > 1){ do the line break }
            
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
            this.DisplayString = this.keyRecorderAssembler() + this.KeysPressed.join("");//concantentate what's currently in the KeysRecorder[] (such as before/after a decimal or previous strings containing numbers with operators).
            this.display();//Output to the user.
        }
    }
}