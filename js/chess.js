class Game {
    constructor() {
        this.turn = null;
        this.pieces_black = [];
        this.pieces_white = [];
        this.board = null;

        this.drawGameBoard();
        this.setupPieces();
    }

    drawGameBoard() {
        let columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    
        for (let y = 8; y >= 1; y--) {
            let cell_class = y % 2 == 0 ? "cellBlack" : "cellWhite";
            for (let x = 0; x <= 7; x++) {
                cell_class = cell_class == "cellBlack" ? "cellWhite" : "cellBlack";
                $( "<div>", {
                    "class": "cell " + cell_class,
                    id: columns[x] + y
                }).appendTo(".container");
            }
        }
    }

    setupPieces() {
        this.pieces_white.push(new Piece ("rook", "b", "A8"));
        this.pieces_white.push(new Piece ("knight", "b", "B8"));
        this.pieces_white.push(new Piece ("bishop", "b", "C8"));
        this.pieces_white.push(new Piece ("queen", "b", "D8"));
        this.pieces_white.push(new Piece ("king", "b", "E8"));
        this.pieces_white.push(new Piece ("bishop", "b", "F8"));
        this.pieces_white.push(new Piece ("knight", "b", "G8"));
        this.pieces_white.push(new Piece ("rook", "b", "H8"));
        this.pieces_white.push(new Piece ("pawn", "b", "A7"));
        this.pieces_white.push(new Piece ("pawn", "b", "B7"));
        this.pieces_white.push(new Piece ("pawn", "b", "C7"));
        this.pieces_white.push(new Piece ("pawn", "b", "D7"));
        this.pieces_white.push(new Piece ("pawn", "b", "E7"));
        this.pieces_white.push(new Piece ("pawn", "b", "F7"));
        this.pieces_white.push(new Piece ("pawn", "b", "G7"));
        this.pieces_white.push(new Piece ("pawn", "b", "H7"));

        this.pieces_white.push(new Piece ("pawn", "w", "A2"));
        this.pieces_white.push(new Piece ("pawn", "w", "B2"));
        this.pieces_white.push(new Piece ("pawn", "w", "C2"));
        this.pieces_white.push(new Piece ("pawn", "w", "D2"));
        this.pieces_white.push(new Piece ("pawn", "w", "E2"));
        this.pieces_white.push(new Piece ("pawn", "w", "F2"));
        this.pieces_white.push(new Piece ("pawn", "w", "G2"));
        this.pieces_white.push(new Piece ("pawn", "w", "H2"));
        this.pieces_white.push(new Piece ("rook", "w", "A1"));
        this.pieces_white.push(new Piece ("knight", "w", "B1"));
        this.pieces_white.push(new Piece ("bishop", "w", "C1"));
        this.pieces_white.push(new Piece ("queen", "w", "D1"));
        this.pieces_white.push(new Piece ("king", "w", "E1"));
        this.pieces_white.push(new Piece ("bishop", "w", "F1"));
        this.pieces_white.push(new Piece ("knight", "w", "G1"));
        this.pieces_white.push(new Piece ("rook", "w", "H1"));
    }
}

class Piece {
    constructor(type, color, position) {
        this.type = type;
        this.color = color;

        let pos_x = position.substring(0, 1);
        let pos_y = position.substring(1);
        this.position_x = pos_x;
        this.position_y = pos_y;

        this.image = "images/" + color + "_" + type + ".png";

        this.placePiece();
    }

    placePiece() {
        let img_position = "#" + this.position_x + this.position_y;
    
        $( "<img>", {
            "src": this.image
        }).appendTo(img_position);
    }    
}


$(document).ready(function () {
    let game = new Game();
});