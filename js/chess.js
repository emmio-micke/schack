/*
 * Handles the game with boards and pieces.
 */
class Game {
    constructor() {
        this.turn = null;
        this.board = new Array(8);
        for (let i=0; i < 8; i++) {
            this.board[i] = new Array(8);
        }
        this.selected_piece = null;
        this.target = null;

        this.setupGame();
        this.drawGameBoard();
        this.drawPieces();
        this.handleGame();
    }

    /*
     * Draws the chess board.
     */
    drawGameBoard() {
        // Chess squares are in format A8 for top left square to H1 for bottom right.
        let columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

        // Loop through rows and columns.
        for (let y = 8; y >= 1; y--) {
            // Start row with alternate black/white square.
            let cell_class = y % 2 == 0 ? "cellBlack" : "cellWhite";
            for (let x = 0; x <= 7; x++) {
                // Switch square color so they alternate.
                cell_class = cell_class == "cellBlack" ? "cellWhite" : "cellBlack";

                // Add div representing square.
                $("<div>", {
                    "class": "cell " + cell_class,
                    id: columns[x] + y
                }).appendTo(".container");
            }
        }
    }

    /*
     * Draws the pieces and add them to the correct place on the board.
     */
    drawPieces() {
        // Chess squares are in format A8 for top left square to H1 for bottom right.
        let columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

        // Remove all current pieces.
        $(".container div").empty();

        // Loop through board.
        for (let y = 0; y <= 7; y++) {
            for (let x = 0; x <= 7; x++) {
                // If current square contains a piece, add it to the board.
                let square_info = this.board[x][y];
                if (square_info instanceof Piece) {
                    $("<img>", {
                        "src": square_info.image,
                        "class": "piece"
                    }).appendTo($("#" + columns[x] + (8 - y)));
                }
            }
        }
    }

    /*
     * Adds necessary event listeners for managing the user interactions.
     */
    handleGame() {
        let _this = this;

        // Click event listener for each square, reagardless of wether it holds a piece.
        $(".container div").on("click", function () {
            // If the clicked square contains a piece then select it.
            if ($(this).children().length > 0) {
                $(".selected_piece").removeClass("selected_piece");
                _this.selected_piece = $(this);
                $(this).addClass("selected_piece");
            // If user has previously selected a piece then move it.
            } else if (_this.selected_piece != null) {
                let from = _this.selected_piece.attr("id");
                let to = $(this).attr("id");
                let indexFrom = _this.positionToIndex(from);
                let indexTo = _this.positionToIndex(to);

                _this.movePiece(indexFrom, indexTo);
            }
        });
    }

    /*
     * Move piece from a square to another.
     * from: object: x int, y int
     * to: object: x int, y int
     */
    movePiece(from, to) {
        let piece = this.board[from.x][from.y];

        if (piece.checkMove(from, to)) {
            this.board[from.x][from.y] = null;
            this.board[to.x][to.y] = piece;

            // Remove selected class from every piece.
            $(".selected_piece").removeClass("selected_piece");
            this.drawPieces();
        }
    }

    setupGame() {
        this.setupPieces();
    }

    /*
     * Converts a position from chess notation (A8) to coordinates
     * in multiple array (object: x int, y int).
     */
    positionToIndex(position) {
        let columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        let pos_x = columns.indexOf(position.substring(0, 1));
        let pos_y = 8 - Number(position.substring(1));

        return { x: pos_x, y: pos_y }
    }

    /*
     * Adds a piece to the board array.
     * piece: object
     * position: string
     */
    addPiece(piece, position) {
        let index = this.positionToIndex(position);
        this.board[index.x][index.y] = piece;
    }

    /*
     * Sets the startup pieces for a game.
     */
    setupPieces() {
        this.addPiece(new Rook("b"), "A8");
        this.addPiece(new Knight("b"), "B8");
        this.addPiece(new Bishop("b"), "C8");
        this.addPiece(new Queen("b"), "D8");
        this.addPiece(new King("b"), "E8");
        this.addPiece(new Bishop("b"), "F8");
        this.addPiece(new Knight("b"), "G8");
        this.addPiece(new Rook("b"), "H8");
        this.addPiece(new Pawn("b"), "A7");
        this.addPiece(new Pawn("b"), "B7");
        this.addPiece(new Pawn("b"), "C7");
        this.addPiece(new Pawn("b"), "D7");
        this.addPiece(new Pawn("b"), "E7");
        this.addPiece(new Pawn("b"), "F7");
        this.addPiece(new Pawn("b"), "G7");
        this.addPiece(new Pawn("b"), "H7");

        this.addPiece(new Pawn("w"), "A2");
        this.addPiece(new Pawn("w"), "B2");
        this.addPiece(new Pawn("w"), "C2");
        this.addPiece(new Pawn("w"), "D2");
        this.addPiece(new Pawn("w"), "E2");
        this.addPiece(new Pawn("w"), "F2");
        this.addPiece(new Pawn("w"), "G2");
        this.addPiece(new Pawn("w"), "H2");
        this.addPiece(new Rook("w"), "A1");
        this.addPiece(new Knight("w"), "B1");
        this.addPiece(new Bishop("w"), "C1");
        this.addPiece(new Queen("w"), "D1");
        this.addPiece(new King("w"), "E1");
        this.addPiece(new Bishop("w"), "F1");
        this.addPiece(new Knight("w"), "G1");
        this.addPiece(new Rook("w"), "H1");
    }
}

/*
 * Describes a chess piece.
 */
class Piece {
    constructor(type, color) {
        this.color = color;
        this.image = "images/" + color + "_" + type + ".png";
    }
}

class Pawn extends Piece {
    constructor(color) {
        super("pawn", color);
    }

    checkMove(from, to) {
        let firstRow = this.color == "w" ? 6 : 1;
        let moveOk = true;

        // Check that move is in same column.
        moveOk = moveOk && (from.x == to.x);

        // Check that direction is ok.
        if (this.color == "w") {
            moveOk = moveOk && (from.y > to.y);
        } else {
            moveOk = moveOk && (from.y < to.y);
        }

        // Check that move is one steps if row is not the starting row.
        if (from.y == firstRow) {
            moveOk = moveOk && Math.abs(to.y - from.y) <= 2;
        } else {
            moveOk = moveOk && Math.abs(to.y - from.y) == 1;
        }

        return moveOk;
    }
}

class Rook extends Piece {
    constructor(color) {
        super("rook", color);
    }
}

class Knight extends Piece {
    constructor(color) {
        super("knight", color);
    }
}

class Bishop extends Piece {
    constructor(color) {
        super("bishop", color);
    }
}

class King extends Piece {
    constructor(color) {
        super("king", color);
    }
}

class Queen extends Piece {
    constructor(color) {
        super("queen", color);
    }
}


$(document).ready(function () {
    let game = new Game();
});