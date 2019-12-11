class KeyboardEvents {

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

}

var keyboardEvents = new KeyboardEvents();