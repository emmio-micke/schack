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

function placePiece(piece, color, position) {
    let image = "images/" + color + "_" + piece + ".png";

    let img_position = "#" + position;

    $( "<img>", {
        "src": image
    }).appendTo(img_position);
}

$(document).ready(function () {
    drawGameBoard();
    placePiece("queen", "w", "D1");
});