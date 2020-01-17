class DragUI {
    /*
     * How It Works:
     * 1) Event Listeners are placed in this.container to monitor child elements events such as Mouse/TouchScreen Events.
     * 2) Class Methods are fired when the DOM fires.
     * 3) Class Methods are for the various applications needing to utilize Basic Event Listening for Dragging Elements on Phone/Computer.
     */
    container = document.querySelector("#drag-container");//Call the Parent Element/"this.container" for Child Element(s) to stay and use.
    constructor() {
        if (this.container !== null) {//Is there a container

            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {//If Mobile Device set Screen Listeners.
                this.userPhoneAgent = navigator.userAgent;//Load the Device Agent Listener.                
                this.container.addEventListener("touchstart", this.dragStart.bind(this), false);//Touch should work on every browser/device.
                this.container.addEventListener("touchend", this.dragEnd.bind(this), false);//Fires on finger up.
                this.container.addEventListener("touchmove", this.drag.bind(this), false);//Missing Touchcancel listener.
            } else {//Else Set Mouse Listeners
                this.container.addEventListener("mousedown", this.dragStart.bind(this), false);//Mouse Listeners work on evet browser.
                this.container.addEventListener("mouseup", this.dragEnd.bind(this), false);
                this.container.addEventListener("mousemove", this.drag.bind(this), false);
                this.container.addEventListener("mouseout", this.dragExit.bind(this), false);
                this.container.addEventListener("mouseleave", this.dragLeave.bind(this), false);
                this.container.addEventListener("mouseover", this.dragOver.bind(this), false);
                this.container.addEventListener("mouseenter", this.dragEnter.bind(this), false);
            }

            this.container.addEventListener("resize", this.screenListener.bind(this), false);
        }
    }
    //User has MouseMoved/TouchStart in this.container (doesn't include mouseDown/Touch).
    drag() {
        event.preventDefault();
        //$('#app-menu').collapse('hide');//Collapse Navbar when a user MouseMove/TouchStart into this.container.
        Card.prototype.moving();//User is Dragging the Element by TouchDown+TouchMove or MouseDown+MouseMove.
    }
    //User has Mouseup/TouchEnd in this.container from an <class=drag>.
    dragEnd() {
        Card.prototype.dropped();//Record-Save the Selected Information.
    }
    //User has MouseMoved that enters this.container.
    dragEnter() {
        //console.log("dragEnter()");
    }
    //User has MouseMoved this.container.
    dragExit() {
        //console.log("dragExit()");
    }
    //User has MouseMoved out of this.container.
    dragLeave() {
        //console.log("dragLeave()");
    }
    //User has MouseMoved over this.container.
    dragOver() {
        //console.log("dragOver()");
    }
    //User has MouseDown/TouchStart in this.container.
    dragStart() {
        Card.prototype.getSelectedCard();
    }
    //User is over a valid drop.
    drop() {
        //console.log("drop()");
    }
    //User has Zoomed in or out of the screen.
    screenListener() {
        this.container.style.width = (document.documentElement.clientWidth) + "px";//Adjust Width of this.container.
        this.container.style.height = (document.documentElement.clientHeight) + "px";//Adjust Height of this.container.
    }
}
var DragUIExe = new DragUI();

/* Alternatively 2nd design pattern for this Class setup: using Arrow Function Expressions Method
Constructor Example:
//Screen Touch Events
this.container.addEventListener("touchstart", (e) => this.dragStart(e), false);
this.container.addEventListener("touchend", (e) => this.dragEnd(e), false);
this.container.addEventListener("touchmove", (e) => this.drag(e), false);

//Computer Mouse Events
this.container.addEventListener("mousedown", (e) => this.dragStart(e), false);
this.container.addEventListener("mouseup", (e) => this.dragEnd(e), false);
this.container.addEventListener("mousemove", (e) => this.drag(e), false);

/*Alternatively 3rd Design Pattern for this Class setup: ES6 Method Definition Method
//Constructor Example
this.container.addEventListener("mousedown", this.dragStart, false);
this.container.addEventListener("mouseup", this.dragEnd, false);
this.container.addEventListener("mousemove", this.drag, false);

//Method Examples for Design Pattern.
drag = () => {
    console.log("Drag");
}
dragStart = () => {
    console.log("DragStart");
}
dragEnd = () => {
    console.log("DragEnd");
}
*/





