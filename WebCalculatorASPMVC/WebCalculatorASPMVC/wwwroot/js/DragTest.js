class DragUI {

    //Container or Object(s). Eventlisteners are binded to this.container. this.container needs to be the (Parent) Element of this.dragcard.
    container = document.querySelector("#drag-container");//Parent Element for the Children Element(s): Drag/DragStart/DragEnd Class Events.
    
    constructor() {

        //Resize <this.container> on PageLoad().
        this.container.style.height = (document.documentElement.clientHeight) + "px";//Adjust Height of this.container (drag-container).
        this.container.style.width = (document.documentElement.clientWidth) + "px";//Adjust Width of this.container.

        //Set Cards into an array of objects and Set Coordinates for each object.
        Card.prototype.loadCards();

        //Screen Touch Event Listeners.
        this.container.addEventListener("touchstart", this.dragStart.bind(this), false);
        this.container.addEventListener("touchend", this.dragEnd.bind(this), false);
        this.container.addEventListener("touchmove", this.drag.bind(this), false);
        //Computer Mouse Event Listeners.
        this.container.addEventListener("mousedown", this.dragStart.bind(this), false);
        this.container.addEventListener("mouseup", this.dragEnd.bind(this), false);
        this.container.addEventListener("mousemove", this.drag.bind(this), false);

        //User Device Listener (BETA)
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            this.userPhoneAgent = navigator.userAgent;
            Card.prototype.setCardsVertical();
        }//End User Device Listener

    }//EndConstructor    
    drag() {//This Method fires while mouse is in <drag-container>.

        //Drag will always be firing while mouse is inside <this.container>
        $('#app-menu').collapse('hide');//Collapse <div class="collapse" id="app-menu"> when a user does mouse-move(mouse-over) the <drag-container>.

        //This is dragStart() and drag() operations by having the User MouseDown/TouchStart using this.active = true status.
        if (Card.prototype.active) {//When Application is now Active for the drag. MouseDown/TouchStart on .this.dragCard <class=drag card id#foo>.
            Card.prototype.isMoving();//Record Card Coordinates while active and dragging to this.cardObj.
        }//End when user mouse-ups/touch-up.

    }
    //…a drag operation ends (such as releasing a mouse button or hitting the Esc key)
    dragEnd() {
        console.log("DragEnd()");

        //Save and Recycle Class Property Values. User has Finished Dragging by now.
        Card.prototype.hasStopped();//Card has Stopped recording coorindates.

    }
    //…a dragged item enters a valid drop target.
    dragEnter() {
        console.log("dragEnter()");
    }
    //…an element is no longer the drag operation's immediate selection target.
    dragExit() {
        console.log("dragExit()");
    }
    //…a dragged item leaves a valid drop target.
    dragLeave() {
        console.log("dragLeave()");
    }
    //…a dragged item is being dragged over a valid drop target, every few hundred milliseconds.
    dragOver() {
        console.log("dragOver()");
    }
    //…the user starts dragging an item.
    dragStart() {//User MouseDown/TouchStart on a <.drag card>.
        //console.log("DragStart()");

        /*User Interacts by (Mouse or Touch Screen) to get this (event.target) by it's ID.*/
        Card.prototype.getSelectedCard();//Get Card Obj based on <.drag ID>. Should be first method in this Event.

        /*
        console.log("clickEvent");

        console.log("ecX:-match" + event.clientX);//Double Click/Tap
        console.log("ecY:-match" + event.clientY);//Double Click/Tap
        console.log("inX:-match" + this.initialX);//Double Click/Tap
        console.log("inY:-match" + this.initialY);//Double Click/Tap

        console.log("elY:" + event.layerY);
        console.log("crY:" + this.currentY);

        console.log("elX:" + event.layerX);
        console.log("crX:" + this.currentX);

        console.log("etcW:" + event.target.clientWidth);
        console.log("etcH:" + event.target.clientHeight);
        */
    }
    //…an item is dropped on a valid drop target.
    drop() {
        console.log("dragDrop()");
    }
}
var DragUIExecute = new DragUI();

/* Alternatively 1 for this ClassSetup: using Arrow Function Expressions Method
//Screen Touch Events
this.container.addEventListener("touchstart", (e) => this.dragStart(e), false);
this.container.addEventListener("touchend", (e) => this.dragEnd(e), false);
this.container.addEventListener("touchmove", (e) => this.drag(e), false);
//Computer Mouse Events
this.container.addEventListener("mousedown", (e) => this.dragStart(e), false);
this.container.addEventListener("mouseup", (e) => this.dragEnd(e), false);
this.container.addEventListener("mousemove", (e) => this.drag(e), false);

/*Alternatively 2 for this ClassSetup: ES6 Method Definition Method
//Constructor Example
this.container.addEventListener("mousedown", this.dragStart, false);
this.container.addEventListener("mouseup", this.dragEnd, false);
this.container.addEventListener("mousemove", this.drag, false);
//Method Examples
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