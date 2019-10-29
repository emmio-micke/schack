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

function drawGameBoard() {
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

$(document).ready(function () {
    drawGameBoard();
    let piece1 = new Piece ("queen", "w", "D1");
    let piece2 = new Piece ("king", "w", "E1");
});