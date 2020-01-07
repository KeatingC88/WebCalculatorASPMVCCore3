class DragUI {
    container = document.querySelector("#drag-container");//Call the Parent Element Container for Child Element(s).    
    constructor() {
        //Container Size Load.
        this.container.style.height = (document.documentElement.clientHeight) + "px";//Adjust Height of this.container (drag-container).
        this.container.style.width = (document.documentElement.clientWidth) + "px";//Adjust Width of this.container.

        //Mobile Device Listener.
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            this.userPhoneAgent = navigator.userAgent;
            //Mobile Events.
            this.container.addEventListener("touchstart", this.touchStart.bind(this), false);
            this.container.addEventListener("touchend", this.touchEnd.bind(this), false);
            this.container.addEventListener("touchmove", this.touchMove.bind(this), false);
        }//End User Device Listener

        //Mouse/Device Events (These work in Safari Mobile iOS).
        this.container.addEventListener("mousedown", this.dragStart.bind(this), false);
        this.container.addEventListener("mouseup", this.dragEnd.bind(this), false);
        this.container.addEventListener("mousemove", this.drag.bind(this), false);
        this.container.addEventListener("mouseout", this.dragExit.bind(this), false);
        this.container.addEventListener("mouseleave", this.dragLeave.bind(this), false);
        this.container.addEventListener("mouseover", this.dragOver.bind(this), false);
        this.container.addEventListener("mouseenter", this.dragEnter.bind(this), false);
        //...
    }

    drag() {//User has mousemove an drag element in this.container.
        //...
        event.preventDefault();
        $('#app-menu').collapse('hide');//Collapse <div class="collapse" id="app-menu"> When a user MouseMove/TouchStart into this.container.
        Card.prototype.isMoving();//User is Dragging a Card by MouseDown and MouseMoving.
        //...
    }

    //…a drag operation ends (such as releasing a mouse button or hitting the Esc key)
    dragEnd() {
        //...
        Card.prototype.movedFinished();//The Selected Card has stopped saving class property cooridnates.
        //...
    }

    //…a dragged item enters a valid drop target.
    dragEnter() {
        //console.log("dragEnter()");

    }

    //…an element is no longer the drag operation's immediate selection target.
    dragExit() {
        //console.log("dragExit()");

    }

    //…a dragged item leaves a valid drop target.
    dragLeave() {
        //console.log("dragLeave()");

    }

    //…a dragged item is being dragged over a valid drop target, every few hundred milliseconds.
    dragOver() {        
        //console.log("dragOver()");

    }

    //…the user starts dragging an item.
    dragStart() {//User has MouseDown/TouchStart in this.container.
        event.preventDefault();
        Card.prototype.getSelectedCard();//Get the User's MouseDown/TouchStart Element.
        //...
    }

    //…an item is dropped on a valid drop target.
    drop() {
        //console.log("drop()");

    }
}
var DragUIExe = new DragUI();

/* Alternatively 2nd design pattern for this Class setup: using Arrow Function Expressions Method
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