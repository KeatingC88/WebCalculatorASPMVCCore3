class CalculatorEvents
{
    //https://stackoverflow.com/questions/10894638/how-to-set-cursor-to-input-box-in-javascript

    /** (updated: 11-30-2019)
     * This section is just for Displaying Expression (Scientific Calculations using PEMDAS/BEDMAS) Or Sequential (Standard Calculations) Inputs from the User (Buttons).
     * 
     * How it works: 
     * 1) A value is added to keysPressed when an OnClick Event is used in the View as a button. 
     * 2) The value is inspected by 3 IF statements and sent to the keysRecorder as a Log/Storage for all the keysPressed in this session acting as real-time events. 
     * 3) keysPressed() is reset after every Operator the user hits (Addition, Subtraction, Multiplication, Division) while the keysRecorder keeps that information in segemental elements in the object.
     * 4) In the end, this class results into an arithmetic expression string for calculation rules; rules that is to be handled out of this class and managed by another class; the Calculator Services Class for PEMDAS and etc.
     * 
     * IF Statements (Application Handlers and User Regulations):
     * 1) Is value a number.
     * 2) Is value an Operator found in the arithmeticOperatorDetector() Method, and if it isn't then it will return false.
     * 3) Is value a Decimal and only allow 1 decimal per This.KeyPressed and apply a zero before the decimal if the decimal is pressed first.
     * 4) Is value an Equal Sign that performs the Calculation of the string that is finalized by all other methods in this Class Object.
     * 
     * keyRecorderAssembler() Method: returns a String that is concantenated from everything in the KeyRecorder[].
     * 
     * arithmeticOperatorMatch(value) Method: returns a matching string of the Operator the user has clicked, and returns false by default (no match found).
     * 
     * clearDisplay() Method: clears both keysRecorder and keysPressed which resets the entire application in real-time.
     * 
     * display() Method: sets the DisplayString into the HTML input type=text as a readonly output for the user.
     * 
     * @param {any} value
     */

    DisplayString = "";// Used to Set Expressions and Connect to the Output Display() for the User to View in the Text-Area.
    KeysPressed = [];// Key Inputs such as Numbers, Decimal, or a Math Operator.
    KeysRecorder = []; // Completed KeyPressed[] Segements that are for Calculation Strings for This.Calcuate(), Output Strings for Display(), and Standard Type Calculator Operations.
    KeySessionRecorder = [];// Entire Segemented Expressions or History Storage of the User's Expression Strings.
    CalculateOnSequence = false;//False = Scientific Calculator (PEMDAS/BEDMAS Calculations), True = Standard Calculator (Input Sequence Calculations from First Inputs to Last Excempts PEMDAS/BEDMAS Algerbraic Order of Operations Sequences)

    constructor() {
        this.keyBoardEventListener();
    }
    /**
     * This section handles all OnClick Events from the View.
     * (Needs an update Summary Description)
     */
    key(value) {
        //Check the Selected Radio Button to determine code flow and operations from the User's request.
        if (document.getElementById('standard-calculator-radio').checked) {
            this.CalculateOnSequence = true;            
        } else if (document.getElementById('scientific-calculator-radio').checked) {
            this.CalculateOnSequence = false;
        }
    /**
        * This section handles the numerical rules.
        *
        * (Needs an update Summary Description)
    */
        if (!isNaN(value)) {            
            this.KeysPressed.push(value);//Set number into the object.            
            this.DisplayString = this.keyRecorderAssembler() + this.KeysPressed.join("");//concantentate what's currently in the keysRecorder with the current key that is pressed.
            this.display();//output.
        }        
    /**
        * This section handles the decimal rules.
        * 
        * (Needs an update Summary Description)
    */
        if (value === ".") {
            var previousKeys = this.getLastKeysPressed();//A returned string from the last key that was pressed by the user.
            if (previousKeys === undefined || Object.keys(this.KeysPressed).length === 0) {//if no numerical key was pressed before.
                this.KeysPressed.push("0.");//Assign by pushing a Zero w/ a decimal to the KeysPressed.
                this.DisplayString = this.KeysRecorder.join("") + this.KeysPressed;//concatenate the previous numerical user input(s) with the numbers following after the decimal. example: 0.(XYZ)
                this.display();//Output to the user.
            }
            
            var string = this.KeysPressed.join("");//combine everything currently in the keysPressed into a string.
            var find = string.includes(".");//search the current keysPressed object for a decimal.
            if (find === false) {//if no decimal was found
                this.KeysPressed.push(".");//then apply the decimal after the previous numerical user input(s).
                this.DisplayString = this.keyRecorderAssembler() + this.KeysPressed.join("");//concatenate the previous numerical user inputs(s) with a decimal example: 123.(XYZ)
                this.display();//Output to the user.
            }
        }
    /**
        * This section handles the operator rules (+/-*).
        * Everytime a User selects a Math Operator, set it into the KeysRecorder[] and Reset the KeysPressed[].
        * Only the "-" has a special exception for Negative Numbers.
        * There are 2 parts: When the user decides whether to use a Standard Calculator or Scientific Calculator.
        * Standard Calculators will Calculate in a Sequence each time a new number is input, and when the Math Operator is clicked, it Calculates immediately without considering "PEMDAS/BEDMAS in Algerbraic Expressions".
        * Scientific Calculators will use this.CalculateOnSequence === false while Standard Calculators will use this.CalculateOnSequence === true in this program.
    */
        if (this.arithmeticOperatorMatch(value) !== false) {// The User has Selected a Math Operator because a Match was Found (not false).
            if (this.CalculateOnSequence === false) {//Calculator's Scientific-Expression Protocol
                if (Object.keys(this.KeysRecorder).length === 0) {//If nothing is in the KeyRecorder[].
                    if (value === "-" && Object.keys(this.KeysPressed).length === 0) {//KeyPressed is "-" & there's no Digits prior, then it must be a negative number in the first sequence of digits. (2nd condition will prevent a bug that puts a "-" before and after the set of digits)
                        this.KeysRecorder.push(value);//Record the value "-" to the KeysRecorder[].
                        this.DisplayString = this.keyRecorderAssembler();//Set the value to our Display String.
                        this.display();//Output to the user.
                    }                    
                }
                if (Object.keys(this.KeysPressed).length >= 1 && Object.keys(this.KeysRecorder).length !== undefined) {// If there are digits and the user hits a Math Operator
                    this.KeysPressed.push(value);//Set the Math Operator with the previous digits in the KeysPressed[].
                    this.KeysRecorder.push(this.KeysPressed.join(""));//Set the previous Digits that are currently in the KeysPressed w/ the New Math Operator Value into the KeysRecorder[]
                    this.DisplayString = this.keyRecorderAssembler();//Run the String Assembler from the KeysRecorder[].
                    this.display();//Output to the user.
                    this.KeysPressed = [];//Reset the KeysPressed[] after each Math Operator Value.
                }
            } else if (this.CalculateOnSequence === true) {//Calculator's Standard Protocol
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
    /**
        * This section handles the "=" Keypad Button and the Enter Button on the Keyboard.
        * 
        * (Needs to Prevent the user from doing "123+" and Calculating as there's no 2nd set of Digits to Operate with.)
    */
        if (value === "=") {
            this.KeysRecorder.push(this.KeysPressed.join(""));//Get any remaining KeysPressed[] values (usually just digits).
            //console.log("Calculate(raw):" + this.KeysRecorder);
            //console.log("Calculate(string):" + this.KeysRecorder.join(""));
            this.DisplayString = this.calculate();//Display the Result String
            this.display();//Output to the user.
            this.KeysRecorder = [];//Clear after Calculation.
            this.KeysPressed = [];//Clear after Calculation.
        }
    }//End of OnClick Events from the View.

    /** 
        Class Methods Section.
    */

    //Returns the Result of a Calculation.
    calculate() {
        var string = this.keyRecorderAssembler();//Get KeysRecorder[] as a String.
        var result = eval(string);//Calculate that String.
        return result;//Return the Solution as a String.
    }
    //Iterate the KeysRecorder[] and return a single string. Usually used for preparation for the Display String before output using display().
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
    //Get the Last KeyPressed Value in the object. Returns a String. Used in the Decimal Section Handler.
    getLastKeysPressed() {
        var lastItem = this.KeysPressed[this.KeysPressed.length - 1];
        return lastItem;
    }
    //Unused method that might come in handy later.
    getLastRecordedKey() {
        var lastItem = this.KeysRecorder[this.KeysRecorder.length - 1];
        return lastItem;
    }
    //Restore the View to Default and this Class Properties.
    clearDisplay() {
        this.KeysPressed = [];//Empty the Object.
        this.KeysRecorder = [];//Empty the Object.
        document.getElementsByTagName("textarea")[0].setAttribute("placeholder", "");//Empty the <textArea> to default.
        document.getElementsByTagName("textarea")[0].setAttribute("rows", 1);//Resize the <textArea> back to default.
    }
    //User View Output Method: re-using a finalized string to simulate a real-time response from the application.
    display() {
        document.getElementsByTagName("textarea")[0].setAttribute("placeholder", this.DisplayString);//inject into bootstrap's placeholder that is a readonly property in the view. Targets the first Input.
        document.getElementsByTagName("textarea")[0].scrollTop = document.getElementsByTagName("textarea")[0].scrollHeight;//Forces the scroll to the bottom of the latest User Input in the <TextArea>.
    }
    //Math Operator Detection: find a matching Math Operator using a Value. Return the operator as a string and by default bool-false if not match was found.
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
    //Keyboard Event Listener: for when a User Presses a Key on the Keyboard.
    keyBoardEventListener() {
        const that = this;
        window.addEventListener('keydown', function (e) {
            that.keyBoardEventConnector(e);
        });
    }
    //Keyboard KeyCode List: for matching with the Browser KeyCodes from keyboard presses.
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