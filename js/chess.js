function drawGameBoard() {
    let columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

    for (let y = 8; y >= 1; y--) {
        let cell_class = y % 2 == 0 ? "cellBlack" : "cellBlack";
        for (let x = 0; x <= 7; x++) {
            $( "<div>", {
                "class": "cell " + cell_class,
                id: columns[x] + y
            }).appendTo(".container");
        }
    }
}

$(document).ready(function () {
    drawGameBoard();
});