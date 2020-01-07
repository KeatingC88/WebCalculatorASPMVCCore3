class Card extends DragUI {

    //Required: Dynamically Card Changing Properties.
    cardId;//The Event.Target.ID from a <Class="drag"> and <ID=(Event.Target.ID)> therefore the SelectedCard ID.
    cardObj;//The SelectedCard<.drag id=(event.target.id)> itself.

    //Required: Positioning
    currentX = 0;//<.drag card> left(top-of-element) X Coordinates
    currentY = 0;//<.drag card> top(left-of-element) Y Coordinates
    initialX = 0;//(Mouse Pointer) X Coordinates
    initialY = 0;//(Mouse Pointer) Y Coordinates
    xOffset = 0;//
    yOffset = 0;//
    active = false;//User has MouseDown <.drag #ID>

    //Optional: Sizing
    cardHeight;//L
    cardWidth;//W
    cardArea;//A

    constructor() {
        super();
    }
    //Class Index
    getSelectedCard() {//On DragStart(MouseDown/TouchStart)
        this.getSelectedCardByEventId();//Get Required <#id=ElementID> by (MouseDown/TouchStart Event) and check for <classname>="drag".                
        this.getSelectedCardCoordinates();//Get Required Element Coordinates.
        this.setSelectedCardClassProperties();//Set Class Properities just before record any movement coordinates.
        //...
        CardService.prototype.getSelectedCardSize();//Get Element Size.
        CardService.prototype.setSelectedCardDesign();//Set Element Design.
        //...
    }
    //Get and use the Event.Id for Class Properties "this.cardId and this.cardObj"
    getSelectedCardByEventId() {
        if (event.target.getAttribute("class") !== null) {//Get MouseDown/TouchStart Element ClassNames.
            let eventAttributes = event.target.getAttribute("class").split(" ");//get event.target attribute names into eventAttributes.
            const findClassNameDrag = (element) => element === "drag";//search in the Mouse/Touch Event.Target class attribute names for this.cardTag.
            if (eventAttributes.findIndex(findClassNameDrag) === 0) {//If "drag" exists as a classname and event.target.id exists for this.dragCard.id. Proceed.
                this.cardId = event.target.id;//Assign Event ID to this.cardID.
                return this.cardObj = document.querySelector("#" + event.target.id);//Assign the Event.Target object to This.dragCard object.
            }
        }
    }
    //Update Class Coordinate Properties when User MouseDown/TouchStart Response.
    getSelectedCardCoordinates() {
        let gettingCoords = this.cardObj.style.transform;//Get Element Current Position.
        //Modify the String to get Coordinates.
        let start = gettingCoords.indexOf("(");//Get String-Index Position of "(" Example: "translate3d ( 454px, 90px, 0px)".
        let end = gettingCoords.indexOf(")");//Get String-Index Position of ")" Example: "translate3d(454px, 90px, 0px ) ". 
        let coords = gettingCoords.substring(start + 1, end);//Get subString in between (). Example "454px, 90px, 0px".
        let coord = coords.split("px,");//Remove px from the string, and turn string into an object. Example "454, 90".
        //Set Class Properties w/ pieces from the string.
        this.currentX, this.xOffset = coord[0];//X 454(px) in example.
        this.currentY, this.yOffset = coord[1];//Y 90(px) in example.
    }
    //Save Class Properties while User MouseDown/MouseMove or TouchStart/TouchMove is taking place.
    isMoving() {
        if (this.active) {//isMoving() is happening when drag() & this.active=true.
            if (event.type === "touchmove") {//Decide if the User has Screen-Touched...
                this.currentX = event.touches[0].clientX - this.initialX;
                this.currentY = event.touches[0].clientY - this.initialY;
            } else {//Or the User has Mouse-Clicked...
                this.currentX = event.clientX - this.initialX;
                this.currentY = event.clientY - this.initialY;
            }//User Interaction.
            this.xOffset = this.currentX;//Save copy Coordinates.
            this.yOffset = this.currentY;//Save copy Coordinates.
            this.setTranslate(this.currentX, this.currentY, this.cardObj);//Save Clientside Coordinates into the css-style-transform of the element.
            //...
            CardService.prototype.draggingSelectedCard();
            //...
        }
    }
    //Save Class Properties and Disconnect Element from Drag().
    movedFinished() {
        //...
        this.initialX = this.currentX;//Save Current Coords
        this.initialY = this.currentY;//Save Current Coords
        this.active = false;//Disconnect User's Click/Touch.
        //...
    }
    //Update Class Properties.
    setSelectedCardClassProperties() {//Determine User Action and Set Class Properties.
        if (event.type === "touchstart") {//User has Screen-Touched...
            this.initialX = event.touches[0].clientX - this.xOffset;//Create
            this.initialY = event.touches[0].clientY - this.yOffset;//Create
        } else {//Or the User has Mouse-Clicked...
            this.initialX = event.clientX - this.xOffset;//Create
            this.initialY = event.clientY - this.yOffset;//Create
        }
        //Get MouseDown Target matches Class Property.
        if (event.target === this.cardObj) {
            this.active = true;//Change this.ClassProperty so this.container.drag() can record coordinates of the actual dragging <element#id>.
        }
    }
    //Stamp Coordinates.
    setTranslate(xPos, yPos, obj) {
        obj.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";//Acting as a "CSS Coordinate-Address" Stamp.
    }
}
var dragUICardExe = new Card();