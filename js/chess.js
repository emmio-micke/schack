var selected_piece = null;

class Game {
    constructor() {
        this.turn = null;
        //this.board = Array(8).fill(Array(8).fill(null));
        this.board = new Array(8);
        for (let i=0; i < 8; i++) {
            this.board[i] = new Array(8);
        }
        this.selected_piece = null;
        this.target = null;

        this.setupGame();
        this.drawGameBoard();
    }

    drawGameBoard() {
        let columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

        for (let y = 8; y >= 1; y--) {
            let cell_class = y % 2 == 0 ? "cellBlack" : "cellWhite";
            for (let x = 0; x <= 7; x++) {
                cell_class = cell_class == "cellBlack" ? "cellWhite" : "cellBlack";

                let square = $("<div>", {
                    "class": "cell " + cell_class,
                    id: columns[x] + y
                });

                let square_info = this.board[x][8 - y];
                if (square_info instanceof Piece) {
                    $("<img>", {
                        "src": square_info.image,
                        "class": "piece"
                    }).appendTo(square);
                }
                square.appendTo(".container");
            }
        }
    }

    movePiece(e) {
        let position = "#" + e.target.parentElement.id;
        $(".selected_piece").appendTo($(position));
    }

    setupGame() {
        this.setupPieces();

        $(".container div").on("click", function () {
            selected_piece.appendTo($(this));
        });

        // Add eventlisteners to watch for selected pieces.
        $(".piece").on("click", function () {
            if (selected_piece == null) {
                selected_piece = $(this);
                $(".selected_piece").removeClass("selected_piece");
                $(this).parent().addClass("selected_piece");
            } else {
                selected_piece = null;
                $(this).parent().removeClass("selected_piece");
            }
        });
    }

    positionToIndex(position) {
        let columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        let pos_x = columns.indexOf(position.substring(0, 1));
        let pos_y = 8 - Number(position.substring(1));

        return { x: pos_x, y: pos_y }
    }

    addPiece(piece, position) {
        let index = this.positionToIndex(position);
        this.board[index.x][index.y] = piece;
    }

    setupPieces() {
        this.addPiece(new Piece("rook", "b"), "A8");
        this.addPiece(new Piece("knight", "b"), "B8");
        this.addPiece(new Piece("bishop", "b"), "C8");
        this.addPiece(new Piece("queen", "b"), "D8");
        this.addPiece(new Piece("king", "b"), "E8");
        this.addPiece(new Piece("bishop", "b"), "F8");
        this.addPiece(new Piece("knight", "b"), "G8");
        this.addPiece(new Piece("rook", "b"), "H8");
        this.addPiece(new Piece("pawn", "b"), "A7");
        this.addPiece(new Piece("pawn", "b"), "B7");
        this.addPiece(new Piece("pawn", "b"), "C7");
        this.addPiece(new Piece("pawn", "b"), "D7");
        this.addPiece(new Piece("pawn", "b"), "E7");
        this.addPiece(new Piece("pawn", "b"), "F7");
        this.addPiece(new Piece("pawn", "b"), "G7");
        this.addPiece(new Piece("pawn", "b"), "H7");

        this.addPiece(new Piece("pawn", "w"), "A2");
        this.addPiece(new Piece("pawn", "w"), "B2");
        this.addPiece(new Piece("pawn", "w"), "C2");
        this.addPiece(new Piece("pawn", "w"), "D2");
        this.addPiece(new Piece("pawn", "w"), "E2");
        this.addPiece(new Piece("pawn", "w"), "F2");
        this.addPiece(new Piece("pawn", "w"), "G2");
        this.addPiece(new Piece("pawn", "w"), "H2");
        this.addPiece(new Piece("rook", "w"), "A1");
        this.addPiece(new Piece("knight", "w"), "B1");
        this.addPiece(new Piece("bishop", "w"), "C1");
        this.addPiece(new Piece("queen", "w"), "D1");
        this.addPiece(new Piece("king", "w"), "E1");
        this.addPiece(new Piece("bishop", "w"), "F1");
        this.addPiece(new Piece("knight", "w"), "G1");
        this.addPiece(new Piece("rook", "w"), "H1");
    }
}

class Piece {
    constructor(type, color) {
        this.type = type;
        this.color = color;

        this.image = "images/" + color + "_" + type + ".png";
    }

    placePiece() {
//        let img_position = "#" + this.position_x + this.position_y;

        $("<img>", {
            "src": this.image,
            "class": "piece"
        }).appendTo(img_position);
    }
}


$(document).ready(function () {
    let game = new Game();
});