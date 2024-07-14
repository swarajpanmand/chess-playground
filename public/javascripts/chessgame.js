//frontend

const socket = io();

const chess = new Chess();
const boardElement = document.querySelector(".chessboard");

let draggedPiece = null;
let sourceSquare = null;
let playerRole = null;

const renderBoard = () => {
  const board = chess.board(); //get board state
  boardElement.innerHTML = ""; //clear board
  board.forEach((row, rowIndex) => {
    //loop through rows
    row.forEach((square, squareIndex) => {
      //loop through squares
      const squareElement = document.createElement("div"); //create square element
      squareElement.classList.add(
        //add classes to square element
        "square",
        (rowIndex + squareIndex) % 2 === 0 ? "light" : "dark" //add light or dark class
      );

      squareElement.dataset.row = rowIndex; //set row attribute
      squareElement.dataset.square = squareIndex; //set square attribute

      if (square) {
        const pieceElement = document.createElement("div"); //create piece element
        pieceElement.classList.add(
          "piece",
          square.color === "w" ? "white" : "black"
        );
        pieceElement.innerHTML = getPieceUnicode(square ); //set piece unicode
        pieceElement.draggable = playerRole === square.color; //set draggable attribute

        pieceElement.addEventListener("dragstart", (e) => {
          if (pieceElement.draggable) {
            draggedPiece = pieceElement; //set dragged piece
            sourceSquare = { row: rowIndex, square: squareIndex }; //set source square
            e.dataTransfer.setData("text/plain", ""); //used to allow drop
          }
        });
        pieceElement.addEventListener("dragend", (e) => {
          draggedPiece = null;
          sourceSquare = null;
        });

        squareElement.appendChild(pieceElement); //append piece element to square element
      }

      squareElement.addEventListener("dragover", (e) => {
        e.preventDefault();
      });

      squareElement.addEventListener("drop", (e) => {
        e.preventDefault();
        if (draggedPiece) {
            let targetElement = e.target;
            if (targetElement.classList.contains('piece')) {
                targetElement = targetElement.parentElement;
            }
            const targetSquare = {
                row: parseInt(targetElement.dataset.row),
                square: parseInt(targetElement.dataset.square),
            };
            handleMove(sourceSquare, targetSquare);
        }
    });
      boardElement.appendChild(squareElement); //append square element to board element
    });
  });

  if(playerRole === 'b'){
        boardElement.classList.add("flipped");
  }
  else{
      boardElement.classList.remove("flipped");
  }
};

const handleMove = (source, target) => {
    const move = {
        from: `${String.fromCharCode(97 + source.square)}${8 - source.row}`,
        to: `${String.fromCharCode(97 + target.square)}${8 - target.row}`,
        promotion: "q"
    }
    socket.emit("move", move);
};

const getPieceUnicode = (piece) => {
    const unicodePieces = {
        p:"♙",
        r:"♖",
        n:"♘",
        b:"♗", 
        q:"♕",
        k:"♔",
        P:"♟",
        R:"♜",
        N:"♞",
        B:"♝",
        Q:"♛",
        K:"♚"

    };

    return unicodePieces[piece.type] || "";
};


socket.on("playerRole", (role) => {
    playerRole = role;
    renderBoard();
});

socket.on("spectatorRole", () => {
    playerRole = null;
    renderBoard();
})

socket.on("boardState", (fen) => {
    chess.load(fen);
    renderBoard();
});

socket.on("move", (move) => {
    chess.move(move);
    renderBoard();
    draggedPiece = null;
    sourceSquare = null;
});

renderBoard();
