const game = {
  // booleà per controlar el canvi de torns
  xTurn: true,
  // estat de X, matriu de strings
  xState: [],
  // estat de O, matriu de strings
  oState: [],
  // possibles combinacions que guanyen la partida
  winningStates: [
    // Files
    ["0", "1", "2"],
    ["3", "4", "5"],
    ["6", "7", "8"],

    // Columnes
    ["0", "3", "6"],
    ["1", "4", "7"],
    ["2", "5", "8"],

    // Diagonalevent.target.classList
    ["0", "4", "8"],
    ["2", "4", "6"],
  ],
};

// Comprova si hi ha guanyador
function checkWinner(playerState) {
  // funcion para chequear al ganador le paso el xState o el oState
  let result = false;
  if (playerState.length > 2) {
    // en el caso de que hayan 3 o mas elementos entra en el else
    for (let i = 0; i < game.winningStates.length; i++) {
      // itera por la lista de arrays winningStates
      const winningState = game.winningStates[i]; //se guarda en la variable wiiningState un elemento (uno de los arrays)
      let count = 0;
      winningState.forEach((id) => {
        // a este array le hago un foreach para que me pasa un id (elemento en el q esta parado) y poder hacer la comparacion
        const isIdInPlayerState = playerState.includes(id); // aqui con includes verifico si el id que me arrojo el foreach esta en el array del jugador arrojando como resultado true o false y lo guardo en una variable
        if (isIdInPlayerState) {
          count++;
        }
      });

      if (count === 3) {
        console.log("Has ganado!", winningState);
        result = true;
        break;
      }
    }
  }
  return result;
}

// Comprova si és empat
function checkTie() {
  return (
    game.xState.length + game.oState.length === 9 &&
    !checkWinner(game.xState) &&
    !checkWinner(game.oState)
  );
}

// El teu codi aquí
// Accedeix als elements html necessaris
let cells = document.querySelectorAll(".cell");

const gameElement = document.getElementById("game");

gameElement.addEventListener("click", (event) => {
  const { classList, id: elementId } = event.target; // esto se pone asi porque le estoy diciendo que me guarde ahi el classList de ese objeto

  // El jugador fa click a una casella buida
  if (!classList.contains("x") && !classList.contains("o")) {
    console.log("ELemento CLickado:", event.target); //con el event target estoy accediendo al elemento
    console.log(elementId);

    // Aconsegueix el valor de la casella clicada
    // Dona les classes adients a la casella clicada
    classList.add(game.xTurn ? "x" : "o"); //aqui le estoy diciendo que si la propiedad xTurn del objeto game esta en true me añada la clase X y sino me ponga la O

    // Afegeix el valor de la casella a la matriu del jugador que li toca
    //condicion que comprueba que si el la propiedad xState es true me suba el valor del id a este array y sino me lo suba a oState
    let isWinner;
    if (game.xTurn === true) {
      game.xState.push(event.target.id);
      isWinner = checkWinner(game.xState);
      console.log(game.xState);
    } else {
      game.oState.push(event.target.id);
      isWinner = checkWinner(game.oState);
      console.log(game.oState);
    }
    //mensaje si ha habido Ganador
    let winMessage = document.getElementById("winMessage");
    if (isWinner) {
      winMessage.textContent = "WINNER!";
      winMessage.classList.remove("hidden");
      winMessage.classList.add("flex", "show", "text-green-600");
      gameOverMessage.textContent = "Game Over!";
      gameOverMessage.classList.remove("hidden");
      gameOverMessage.classList.add("flex");
    }

    if (checkTie()) {
      winMessage.textContent = "EMPATE!";
      winMessage.classList.remove("hidden", "text-green-600");
      winMessage.classList.add("flex", "show", "text-blue-600");
      gameOverMessage.textContent = "Game Over!";
      gameOverMessage.classList.remove("hidden");
      gameOverMessage.classList.add("flex");
    }

    // Canvia de torn
    game.xTurn = !game.xTurn;
    // esta linea es la version corta de reasiganr la variable xTurn del objeto game para que vaya cambiando en cada click y pueda pintar X o O
    //if (game.xTurn){ // version if else
    //    game.xTurn = false
    // } else {
    //     game.xTurn = true
    // }
    //game.xTurn = game.xTurn ? false : true ///ternario del if else
  }
});

// Botó de restart
// Torna els estats i torn al seu estat inicial
document.getElementById("resetButton").addEventListener("click", () => {
  game.xTurn = true;
  game.xState = [];
  game.oState = [];
  // Treu totes les classes afegides
  cells.forEach((cell) => {
    cell.classList.remove("x", "o");
    gameOverMessage.classList.add("hidden");
    winMessage.classList.add("hidden");
  });
});
