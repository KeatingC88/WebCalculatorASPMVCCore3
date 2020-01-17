class Card extends DragUI {

    cardId;//The Event.Target.ID from a <Class="drag"> and <ID=(Event.Target.ID)> therefore the Element's ID.
    cardObj;//The <.drag id=(event.target.id)>.
    currentX = 0;//<.drag card> left(top-of-element) X Coordinates
    currentY = 0;//<.drag card> top(left-of-element) Y Coordinates
    initialX = 0;//(Mouse Pointer) X Coordinates
    initialY = 0;//(Mouse Pointer) Y Coordinates
    xOffset = 0;//<.drag card> left(top-of-element) offSet X Coordinates
    yOffset = 0;//<.drag card> top(left-of-element) offSet Y Coordinates
    active = false;//True if the User has MouseDown an <.drag #ID>
    cardHeight;//L
    cardWidth;//W
    cardArea;//A
    cardDisplay;

    constructor() {
        super();
    }
    //Hide Element and Store an LI into Navbar.
    close() {
        if (this.cardObj !== undefined) {
            document.getElementById(this.cardId).style.display = "none";
            document.getElementById("app-menu-btns").innerHTML =
                "<li class='list-group-item list-group-item-success'>" + this.cardId + "</li>";
        } else {
            this.getSelectedCard();
        }
    }
    //Index: User has MouseDown in this.container. event.path[0] is mouse pointer target.
    getSelectedCard() {//On DragStart(MouseDown/TouchStart),

        console.log(event.path[0]);
        console.log(event.path[1]);
        console.log(event.path[2]);
        console.log(event.path[3]);
        console.log(event.path[4]);
        console.log(event.path[5]);

        if (event.path[0].getAttribute("class").indexOf("drag") !== -1) {//If the event took place on an element that had the <classname=drag>.
            this.cardId = event.target.id;//Get Event ID to this.cardId.
            this.cardObj = document.querySelector("#" + event.target.id);//Get Event Object using the Event ID and set it as our class object.
        }

        if (event.path[1].getAttribute("class") !== null) {
            if (event.path[1].getAttribute("class").indexOf("drag") !== -1) {//If the event took place on a child element that had the <classname=drag>.
                this.cardId = event.path[1].getAttribute("id");//Get the Parent's Element ID of the where the event took place.
                this.cardObj = document.querySelector("#" + event.path[1].getAttribute("id"));//Assign the Event.Target object to This.dragCard object.
            }
        }
        
        if (event.path[4].getAttribute("class").indexOf("drag") !== -1) {
            this.cardId = event.path[4].getAttribute("id");//Get the Parent's Element ID of the where the event took place.
            this.cardObj = document.querySelector("#" + event.path[4].getAttribute("id"));//Assign the Event.Target object to This.dragCard object.
        }
        
        if (event.path[0].getAttribute("id") !== "drag-container") {//This forces the User to click on a valid Element and it's child, or nothing at all.
            this.setClassProperties();//Set Class Properities just before record any movement coordinates.
        }

    }
    //Save Class Properties while the User's MouseDown/MouseMove or TouchStart/TouchMove is happening.
    moving() {
        if (this.active) {//isMoving() is happening when drag() & this.active=true.
            if (event.type === "touchmove") {//Decide if the User has Screen-Touched...
                this.currentX = event.touches[0].clientX - this.initialX;
                this.currentY = event.touches[0].clientY - this.initialY;
            } else {//Or the User has Mouse-Clicked...
                this.currentX = event.clientX - this.initialX;
                this.currentY = event.clientY - this.initialY;
            }
            this.xOffset = this.currentX;//Save copy Coordinates.
            this.yOffset = this.currentY;//Save copy Coordinates.
            this.setTranslate(this.currentX, this.currentY, this.cardObj);//Save Clientside Coordinates into the css-style-transform of the element.
        }
    }
    //Save Class Properties and Disconnect Element from Drag().
    dropped() {
        this.initialX = this.currentX;//Save Current Coords
        this.initialY = this.currentY;//Save Current Coords
        this.active = false;//Disconnect User's Click/Touch.
    }
    //Show Body Element
    maximize() {
        if (this.cardObj !== undefined) {
            document.getElementById(this.cardId).lastElementChild.style.display = "initial";
        } else {
            this.getSelectedCard();
        }
    }
    //Hide Body Element
    minimize() {
        if (this.cardObj !== undefined) {
            document.getElementById(this.cardId).lastElementChild.style.display = "none";
        } else {
            this.getSelectedCard();
        }
    }
    //Update Class Properties.
    setClassProperties() {
        if (this.cardObj !== undefined) {

            let gettingCoords = this.cardObj.style.transform;//Get Element Current Position via String.
            let start = gettingCoords.indexOf("(");//Get String-Index Position of "(" Example: "translate3d ( 454px, 90px, 0px)".
            let end = gettingCoords.indexOf(")");//Get String-Index Position of ")" Example: "translate3d(454px, 90px, 0px ) ". 
            let coords = gettingCoords.substring(start + 1, end);//Get subString in between (). Example "454px, 90px, 0px".
            let coord = coords.split("px,");//Remove px from the string, and turn string into an object. Example "454, 90".

            this.currentX, this.xOffset = coord[0];//Apply X Coorindates 454(px) in this example.
            this.currentY, this.yOffset = coord[1];//Apply Y Coorindates 90(px) in this example.

            this.cardWidth = document.getElementById(this.cardId).offsetWidth;//Get
            this.cardHeight = document.getElementById(this.cardId).offsetHeight;//Get
            this.cardArea = document.getElementById(this.cardId).offsetWidth * document.getElementById(this.cardId).offsetHeight;//Set

            if (event.type === "touchstart") {//User has Screen-Touched...
                this.initialX = event.touches[0].clientX - this.xOffset;//Create
                this.initialY = event.touches[0].clientY - this.yOffset;//Create
            } else {//Or the User has Mouse-Clicked...
                this.initialX = event.clientX - this.xOffset;//Create
                this.initialY = event.clientY - this.yOffset;//Create
            }

            this.active = true;//Change this.Property so this.container.drag() can record coordinates of the <element#id>.
            CardService.prototype.setSelectedDesign();//Set the Elemental UI Design.
        }
    }
    //Stamp Coordinates.
    setTranslate(xPos, yPos, obj) {
        obj.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";//Acting as a "CSS Coordinate-Address" Stamp.
    }
}
var dragUICardExe = new Card();