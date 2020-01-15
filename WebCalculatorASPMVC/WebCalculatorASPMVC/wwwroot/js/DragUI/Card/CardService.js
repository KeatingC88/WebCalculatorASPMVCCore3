class CardService extends Card {
    //Tip: To get the size of an element, use the clientWidth, clientHeight, innerWidth, innerHeight, outerWidth, outerHeight, offsetWidth and/or offsetHeight properties.
    constructor() {
        super();
        this.setCoordinatesOnAllCards();
    }
    setCoordinatesOnAllCards() {
        let cards = document.getElementsByClassName("drag");
        for (let i = 0; i < cards.length; i++) {
            this.setTranslate(0, 0 + (i * 10), cards[i]);//Vertical Load.
        }
    }
    setSelectedDesign() {
        this.setStyleZIndexOnAllCards();
    }
    setStyleZIndexOnAllCards() {
        let cards = document.getElementsByClassName("drag");
        for (var i = 0; i < cards.length; i++) {
            cards[i].style.zIndex = "0";
        }
        document.getElementById(this.cardId).style.zIndex = "2";
    }
}

var dragUICardDesign = new CardService();