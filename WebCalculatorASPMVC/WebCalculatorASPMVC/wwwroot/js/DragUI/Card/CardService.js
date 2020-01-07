class CardService extends Card {

    constructor() {
        super();
        this.setCoordinatesOnAllCards();
    }

    draggingSelectedCard() {
        
    }

    getSelectedCardSize() {
        if (this.cardObj !== undefined) {
            Card.prototype.cardWidth = document.getElementById(this.cardId).offsetWidth;
            Card.prototype.cardHeight = document.getElementById(this.cardId).offsetHeight;
            Card.prototype.cardArea = document.getElementById(this.cardId).offsetWidth * document.getElementById(this.cardId).offsetHeight;
        }
    }

    setStyleBoxShadowOnAllCards() {
        let cards = document.getElementsByClassName("drag");//
        for (var i = 0; i < cards.length; i++) {
            cards[i].style.boxShadow = "initial";
        }
        document.getElementById(this.cardId).style.boxShadow = "0px 0px 10px black";
    }

    setStyleZIndexOnAllCards() {
        let cards = document.getElementsByClassName("drag");//
        for (var i = 0; i < cards.length; i++) {
            cards[i].style.zIndex = "0";
        }
        document.getElementById(this.cardId).style.zIndex = "2";
    }
    
    setSelectedCardDesign() {
        if (this.cardObj !== undefined) {
            //...
            this.setStyleBoxShadowOnAllCards();
            this.setStyleZIndexOnAllCards();
            //...
        }
    }

    setCoordinatesOnAllCards() {
        let cards = document.getElementsByClassName("drag");//
        for (let i = 0; i < cards.length; i++) {
            this.setTranslate(0, 0 + (i * 85), cards[i]);//Vertical Load.
        }
    }
}

var dragUICardDesign = new CardService();