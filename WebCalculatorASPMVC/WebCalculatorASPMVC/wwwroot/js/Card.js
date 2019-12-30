class Card extends DragUI {

    cardId;//Event.Target.ID w/ Class="drag" and ID=(Event.Target.ID).
    cardObj;//<.drag card> itself.
    cardObjs;//Collection of Objects by Class Name "drag".
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

    getAllCards() {
        let getAllCards = document.getElementsByClassName("drag");//Call Elements by Class Name.
        return this.cardObjs = getAllCards;//Store them in this Class Object.
    }

    getSelectedCardByEventId() {
        let eventAttributes = event.target.getAttribute("class").split(" ");//get event.target attribute names into eventAttributes.
        const findClassNameDrag = (element) => element === "drag";//search Event.Target class attribute names for name called "drag"(<classname=drag>).
        if (eventAttributes.findIndex(findClassNameDrag) === 0) {//If "drag" exists as a classname and event.target.id exists for this.dragCard.id. Proceed.
            this.cardId = event.target.id;//Assign Event ID to this.cardID.
            return this.cardObj = document.querySelector("#" + event.target.id);//Assign the Event.Target object to This.dragCard object.;
        }
    }

    getSelectedCard() {
        //On DragStart(MouseDown/TouchStart):
        this.getSelectedCardByEventId();//Should be first line of code in this.method code-block.

        //On this.card change, Get X/Y Coordinates and Set Coordinates (present or default coordinates are gathered).
        let gettingCoords = this.cardObj.style.transform;//get another transform property.This is called twice to prevent the user-double clicking for the first move.
        let start = gettingCoords.indexOf("(");//Get String-Index Position of ( Example: "translate3d ( 454px, 90px, 0px)".
        let end = gettingCoords.indexOf(")");//Get String-Index Position of ) Example: "translate3d(454px, 90px, 0px ) ". 
        let coords = gettingCoords.substring(start + 1, end);//Get subString in between (). Example "454px, 90px, 0px".
        let coord = coords.split("px,");//Remove px from the string, and turn string into an object. Example "454, 90".
        this.currentX, this.xOffset = coord[0];//X 454(px) in example.
        this.currentY, this.yOffset = coord[1];//Y 90(px) in example.

        //Determine how to calculate this.initialX and this.initialY.
        if (event.type === "touchstart") {//Screen-Touch Event (this.initialX and this.initialY are = Event.ClientX and Event.ClientY).
            this.initialX = event.touches[0].clientX - this.xOffset;
            this.initialY = event.touches[0].clientY - this.yOffset;
        } else {//Computer-Mouse Event (this.initialX and this.initialY are = Event.ClientX and Event.ClientY).
            this.initialX = event.clientX - this.xOffset;
            this.initialY = event.clientY - this.yOffset;
        }

        //Ensure event.target is this.dragCard.
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

        //Controlling the Drag Event Limitations.
        this.setPerimeter();//Dragging Constraints found in Perimeter. Must be above this.setTranslate to override Coordinate Values.
        //Saving X/Y Coordinates during mousedown(touchstart) + mousemove(touchmove).
        this.setTranslate(this.currentX, this.currentY, this.cardObj);//Save Coordinates into CSS style-transform before MouseUp.Event() begins.

    }

    hasStopped() {

        this.initialX = this.currentX;//Save Current Coords (after DragStart() and Drag())
        this.initialY = this.currentY;//Save Current Coords (after DragStart() and Drag())
        this.active = false;//Disconnect: Click/Touch from drag(event) and UI styles.

    }

    loadCards() {
        this.getAllCards();
        this.setCardsHorizontal();
    }

    setCardsHorizontal() {
        for (let i = 0; i < this.cardObjs.length; i++) {            
            this.setTranslate(0 + (i * this.cardObjs[i].offsetWidth), 0 + (-i * this.cardObjs[i].offsetHeight), this.cardObjs[i]); //Horizontal Load.
        }
    }

    setCardsVertical() {
        for (let i = 0; i < this.cardObjs.length; i++) {            
            this.setTranslate(0, 0 + (i * 85), this.cardObjs[i]);//Vertical Load.
        }
    }

    setPerimeter() {
        let bounceY, bounceX = 10;
        for (let i = 0; i < this.cardObjs.length; i++) {

            //Prevent from Dragging above <this.container>.
            if (this.currentY < (0 + (-i * this.cardObjs[i].offsetHeight)) && this.cardObj === this.cardObjs[i]) {
                //console.log("Top");
                this.active = false;//Disable drag();
                this.currentY = bounceY;//Reset Coordinates to push <this.cardObj> back in boundry.
            }

            //Prevent from Dragging left of <this.container>.
            if (this.currentX < 0 && this.cardObj === this.cardObjs[i]) {
                //console.log("Left");
                this.active = false;
                this.currentX = bounceX;
            }
            
            //Prevent from Dragging right of <this.container>.
            if (this.currentX > (this.cardObjs[i].offsetParent.offsetWidth - this.cardObj.offsetWidth - 20) && this.cardObj === this.cardObjs[i]) {
                //console.log("Right");
                this.active = false;
                this.currentX = this.currentX - (bounceX + 20);
            }
            
            //Prevent from Dragging bottom of <this.container>.
            if (this.currentY > (this.cardObjs[i].offsetParent.offsetHeight - this.cardObj.offsetHeight) && this.cardObj === this.cardObjs[i]) {
                //console.log("Bottom");
                this.active = false;
                //DropZone...?
            }
        }
    }

    //Smooth Style Animation Effect using CSS:Transform and X/Y Coordinate plotting for the UI.
    setTranslate(xPos, yPos, obj) {
        obj.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";//Acting as a "CSS Address" Stamp.
    }
}
var dragUICard = new Card();