class DragCardUI {
    //Container of Object(s).
    dragCard = document.querySelector("#dragcard");//Default Card ID.
    container = document.querySelector("#drag-container");//Parent Elemenet-Event Listening for the Drag/DragStart/DragEnd Events.
    dragObjects = document.getElementsByClassName('drag');//Assigning DOM Objects with a ClassAttribute(.drag) to become Drag-able.
    //this.DragCard Properties.
    active = false;//False is based on if the user has a card selected by mouse/touch.
    currentX = 0;//<.drag card> left(top) Coordinates
    currentY = 0;//<.drag card> top(left) Coordinates
    initialX = 0;//(Mouse Pointer) Coordinates
    initialY = 0;//(Mouse Pointer) Coordinates
    xOffset = 0;//<.drag card> left(top) Coordinates
    yOffset = 0;//<.drag card> top(left) Coordinates

    constructor() {
        //Load Default CSS foreach <.drag> card found using <Class="drag"> in this.container.
        for (var i = 0; i < this.dragObjects.length; i++) {
            document.getElementById(this.dragObjects[i].id).style.transform = "translate3d(1px, 1px, 0)";
        }
        //Screen Touch Event Listeners (Original Code).
        this.container.addEventListener("touchstart", this.dragStart.bind(this), false);
        this.container.addEventListener("touchend", this.dragEnd.bind(this), false);
        this.container.addEventListener("touchmove", this.drag.bind(this), false);
        //Computer Mouse Event Listeners (Original Code).
        this.container.addEventListener("mousedown", this.dragStart.bind(this), false);
        this.container.addEventListener("mouseup", this.dragEnd.bind(this), false);
        this.container.addEventListener("mousemove", this.drag.bind(this), false);
        //User Device Listener (BETA)
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            this.userPhoneAgent = navigator.userAgent;
            console.log("phone/tablet/ipad");
        }//End User Device Listener        
    }//EndConstructor
    drag(event) {//This Method fires while mouse is in <drag-container>.
        $('#app-menu').collapse('hide');//Collapse <div class="collapse" id="app-menu"> when a user does mouse-move(mouse-over) the <drag-container>.

        //On MouseMove(mouse-over) / TouchStart (screens) in this.container = <drag-container>
        
        



        //Beta
        //Set the Boundry for Dumping Cards into NavBar.
        let windowWidth = window.screen.width;//Get Max Screen Width of the Device.
        let windowHeight = window.screen.height;//Get Max Screen Height of the Device.
        document.getElementById("drag-container").style.minHeight = (windowHeight * .56) + "px";
        let cardWidth = document.getElementById(this.dragCard.id).offsetWidth;
        let cardHeight = document.getElementById(this.dragCard.id).offsetHeight;

        /*
        //Restrict drag() going left-outside of the <drag-container>.
        //If the Selected Element left-side (this.currentX) reaches the left-end of the <drag-container>(0px).
        if (this.currentX < 0) {//If left-side <DragCard> reaches -1.
            this.active = false;//Disable: Click/Touch from drag(event).
            this.currentX = Math.abs(this.currentX);//<DragCard> this.currentX = |-1|. Reset Left-Coordinates.
            this.xOffset = Math.abs(this.currentX);//<DragCard> this.xOffset = |-1|. Assign Left-Offset Coordinates to avoid confusion to the program.
            this.setTranslate(this.currentX, this.currentY, this.dragCard);//Set Positive this.currentX coordinates to this.dragCard.
        }//Restrict drag() going above-outside the <drag-container>.
        //If the Selected Element reaches top of the <drag-container>.        
        if (this.currentY < 0) {//If top-side of <DragCard> reaches -1.
            this.active = false;//Disable: Click/Touch from drag(event).
            this.currentY = Math.abs(this.currentY) + 10;//<DragCard> this.currentY = |-1|.
            this.yOffset = Math.abs(this.currentY) + 10;//<DragCard> this.yOffset = |-1|.
            this.setTranslate(this.currentX, this.currentY, this.dragCard);//Set Positive this.currentY coordinates to this.dragCard.
        }//Restrict drag() going right-outside the <drag-container>.        
        //If the Selected Element reaches right-side (this.currentX) reaches endless-space.
        if (this.currentX >= this.container.clientWidth - cardWidth) {
            this.active = false;//Disable: Click/Touch from drag(event).
            this.dragCard.style.display = "none";//Hide (this.dragCard = <.dragcard>) from the Client.
            //document.getElementById("app-menu-btns").innerHTML = '<button type="button" class="list-group-item list-group-item-action">DragCard</button>';
        }//Restrict drag() going bottom-outside the <drag-container>.
        //If the Selected Element reaches right-side (this.currentY) reaches bottom-end of the <drag-container>(max(heigth)).
        if (this.currentY >= this.container.clientHeight - cardHeight) {
            this.active = false;//Disable: Click/Touch from drag(event).
            this.dragCard.style.display = "none";//Hide (this.dragCard = <.dragcard>) from the Client.
            //document.getElementById("app-menu-btns").innerHTML = '<button type="button" class="list-group-item list-group-item-action">DragCard</button>';
        }
        */




        //Original Code
        //On MouseMove(mouse-over) / TouchStart (screens) in this.container = <#drag-container> While MouseDown on this.dragcard<.drag card>
        if (this.active) {//Listening for a MouseDown on a Card.
            event.preventDefault();
            if (event.type === "touchmove") {
                this.currentX = event.touches[0].clientX - this.initialX;
                this.currentY = event.touches[0].clientY - this.initialY;
            } else {
                this.currentX = event.clientX - this.initialX;
                this.currentY = event.clientY - this.initialY;
            }

            this.xOffset = this.currentX;
            this.yOffset = this.currentY;

            this.setTranslate(this.currentX, this.currentY, this.dragCard);//Save Coordinates before MouseUp.Event().
        }//End Active Mouse-Click




    }
    //…a drag operation ends (such as releasing a mouse button or hitting the Esc key)
    dragEnd() {
        console.log("DragEnd()");

        console.log("curX: " + this.currentX);
        console.log("curY: " + this.currentY);
        console.log("iniX: " + this.initialX);
        console.log("iniY: " + this.initialY);
        console.log("offX: " + this.xOffset);
        console.log("offY: " + this.yOffset);

        //Original Code (Save Last X/Y Coords to Initial)
        this.initialX = this.currentX;
        this.initialY = this.currentY;
        this.active = false;//Disable: Click/Touch from drag(event).
        this.dragCard.style.zIndex = "0";
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
    dragStart() {
        console.log("DragStart()");
        //User has "MouseDownClick/TouchStart" on the Screen.
        this.getSelectedDragCard(event.target.id);//Update Class Properties based on the ID of <.drag .card>

        //Original Code has to be Last in this Code Block.
        //Original Code for 1 Card: Index for InitialX/Y and a Class Permission Property Bool.
        if (event.type === "touchstart") {//Screen-Touch Event
            this.initialX = event.touches[0].clientX - this.xOffset;
            this.initialY = event.touches[0].clientY - this.yOffset;
        } else {//Computer-Mouse Event
            this.initialX = event.clientX - this.xOffset;
            this.initialY = event.clientY - this.yOffset;
        }
        //Class Permission Property(bool) for allowing this.dragCard to move on (mouse+click)
        if (event.target === this.dragCard) {//mouse or touch browser-event when event obj and our class obj matches. Example: if(this.dragCard == <.drag card #id>)
            this.active = true;//Change Class Permission.
        }
        //End Original Code.
        //
    }
    //…an item is dropped on a valid drop target.
    drop() {
        console.log("dragDrop()");
    }
    //Update CSS-Coordinate Class Properties when MouseDown/TouchStart Event happens in the this.container.
    getSelectedDragCard(id) {//When MouseDown/TouchStart Begins in dragStart()...
        this.dragCard = document.querySelector("#" + id);//get (html-obj) from the browser and set this.dragCard Property.
        let str = this.dragCard.style.transform;//Check transform property. Example "translate3d(454px, 90px, 0px)".
        let n = str.indexOf("(");//Get String-Index Position of (
        let m = str.indexOf(")");//Get String-Index Position of )
        let coords = str.substring(n + 1, m);//Get subString in between (). Example "454px, 90px, 0px".
        let coord = coords.split("px,");//Remove px from the string, and turn string into an object.
        this.currentX = coord[0];//coord[x]; 454(px) Update X coordinate for this.currentX.
        this.currentY = coord[1];//coord[y]; 90(px) Update Y coordinate for this.currentY.
        this.xOffset = this.currentX;//Copying Offset Calculation
        this.yOffset = this.currentY;//Copying Offset Calculation
        this.dragCard.style.zIndex = "8";//Z index.
    }
    //Smooth Animation Effect using CSS:Transform and X/Y Coordinate plotting UI.
    setTranslate(xPos, yPos, el) {
        el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";//Acting as a "CSS Address".
    }
}

var DragCardUIExecute = new DragCardUI();

/* Alternatively: using Arrow Function Expressions Method
//Screen Touch Events
this.container.addEventListener("touchstart", (e) => this.dragStart(e), false);
this.container.addEventListener("touchend", (e) => this.dragEnd(e), false);
this.container.addEventListener("touchmove", (e) => this.drag(e), false);
//Computer Mouse Events
this.container.addEventListener("mousedown", (e) => this.dragStart(e), false);
this.container.addEventListener("mouseup", (e) => this.dragEnd(e), false);
this.container.addEventListener("mousemove", (e) => this.drag(e), false);
/*Alternatively: ES6 Method Definition Method
//Constructor Example
this.container.addEventListener("mousedown", this.dragStart, false);
this.container.addEventListener("mouseup", this.dragEnd, false);
this.container.addEventListener("mousemove", this.drag, false);
//Method Example
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