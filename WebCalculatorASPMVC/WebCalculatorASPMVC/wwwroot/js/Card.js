class Card extends DragUI {

    cardId;//Event.Target.ID w/ Class="drag" and ID=(Event.Target.ID).
    cardObj;//<.drag card> itself.
    currentX = 0;//<.drag card> left(top-of-element) X Coordinates
    currentY = 0;//<.drag card> top(left-of-element) Y Coordinates
    initialX = 0;//(Mouse Pointer) X Coordinates
    initialY = 0;//(Mouse Pointer) Y Coordinates
    xOffset = 0;//
    yOffset = 0;//
    active = false;//User has MouseDown <.drag #ID>

    constructor() {
        super();
    }

    getSelectedCardByEventId() {
        //On Click, get the ID of the <.drag #ID>
        let eventAttributes = event.target.getAttribute("class").split(" ");//get event.target attribute names into eventAttributes.
        const findClassNameDrag = (element) => element === "drag";//search Event.Target attribute for an element that has (<classname=drag>).
        if (eventAttributes.findIndex(findClassNameDrag) === 0) {//If "drag" exists as a classname and event.target.id exists for this.dragCard.id. Proceed.
            this.cardId = event.target.id;//Assign Event ID to this.cardID.
            this.cardObj = document.querySelector("#" + event.target.id);//Assign the Event.Target object to This.dragCard object.
        }

        //On this.card change, get a string from(<class=.drag #id).dragCard.style.transform.
        let string = this.cardObj.style.transform;//Store transform address. Example returned String "translate3d(454px, 90px, 0px)". Used as a CSS Coordinates: Xpx, Ypx, 0px.
        if (string === "" || string === " ") {//If string is empty. This is the first time the User interacted w/ (<class=.drag #id>).dragCard.
            document.getElementById(this.cardId).style.transform = "translate3d(0px, 0px, 0)";//Use this.dragCard.id & <class=.drag #id> and provide a default.
        }

        //On this.card change, Get X/Y Coordinates and Set Coordinates (present or default coordinates are gathered).
        let gettingCoords = this.cardObj.style.transform;//get another transform property.This is called twice to prevent the user-double clicking for the first move.
        let start = gettingCoords.indexOf("(");//Get String-Index Position of ( Example: "translate3d ( 454px, 90px, 0px)". 
        let end = gettingCoords.indexOf(")");//Get String-Index Position of ) Example: "translate3d(454px, 90px, 0px ) ". 
        let coords = gettingCoords.substring(start + 1, end);//Get subString in between (). Example "454px, 90px, 0px".
        let coord = coords.split("px,");//Remove px from the string, and turn string into an object. Example "454, 90".
        this.currentX, this.xOffset = coord[0];//X 454(px) in example.
        this.currentY, this.yOffset = coord[1];//Y 90(px) in example.

        //On DragStart(MouseDown/TouchStart), determine how to calculate this.initialX and this.initialY.
        if (event.type === "touchstart") {//Screen-Touch Event (this.initialX and this.initialY are = Event.ClientX and Event.ClientY).
            this.initialX = event.touches[0].clientX - this.xOffset;
            this.initialY = event.touches[0].clientY - this.yOffset;
        } else {//Computer-Mouse Event (this.initialX and this.initialY are = Event.ClientX and Event.ClientY).
            this.initialX = event.clientX - this.xOffset;
            this.initialY = event.clientY - this.yOffset;
        }

        //On DragStart(MouseDown/TouchStart), make sure event.target is this.dragCard.
        if (event.target === this.cardObj) {
            this.active = true;//Change Class(bool) Permission so drag() can begin firing up for the actual dragging of an element.
        }

    }

    isMoving() {

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

        //Saving X/Y Coordinates during mousedown(touchstart) + mousemove(touchmove).
        this.setTranslate(this.currentX, this.currentY, this.cardObj);//Save Coordinates into CSS style-transform before MouseUp.Event() begins.
    }

    hasStopped() {
        this.initialX = this.currentX;//Save Current Coords (after DragStart() and Drag())
        this.initialY = this.currentY;//Save Current Coords (after DragStart() and Drag())
        this.active = false;//Disconnect: Click/Touch from drag(event) and UI styles.
    }

    //Smooth Animation Effect using CSS:Transform and X/Y Coordinate plotting UI. (Origin Method).
    setTranslate(xPos, yPos, el) {
        el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";//Acting as a "CSS Address" Stamp.
    }
}

var dragUICard = new Card();