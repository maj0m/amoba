//boardRecord[i][j]: 0 = ures, 1 = player1, 2 = player2


var rowCount = 12; //tabla merete
var playerFlag = 1; //ki kezd
var winAmount = 5; //mennyi kell egymas mellett a nyereshez
var board2D = []; //2d tabla array



//tabla feltoltese
for (var i = 0; i < rowCount; i++) {
  board2D[i] = []; //2d
  for (var j = 0; j < rowCount; j++) {
    $("#board").append(
      "<div id = 'cell_" + i + "r" + j + "c' class='cell' onclick='placePiece(" + i + "," + j +")'>\
        <i class = 'fa fa-circle-o'></i>\
        <i class = 'fa fa-times'></i>\
      </div>"
    );

    board2D[i][j] = 0;
  }

  $("#board").append("<br>"); //sortores
}



function placePiece(row, col) {
  if (board2D[row][col] == 0) {
    board2D[row][col] = playerFlag;
    
    update();
    checkForWin(row, col, playerFlag);

    //switch players back n forth
    if (playerFlag == 1) {
      playerFlag = 2;
    }
    
    else {
      playerFlag = 1;
    }
  }
}



function update() {
  for (i = 0; i < rowCount; i++) {
    for (j = 0; j < rowCount; j++) {
      if (board2D[i][j] == 1) {
        $("#cell_" + i + "r" + j + "c .fa-circle-o").show();
      }
      
      else if (board2D[i][j] == 2) {
        $("#cell_" + i + "r" + j + "c .fa-times").show();
      }
    }
  }
}



function checkForWin(row, col, player) {
  var chainLength = 0;
  var count = 0;

  //vizszintes
  for (i = 0; i < rowCount; i++) {
    if (board2D[i][col] == player) {
      count++;
      if (count > chainLength) {
        chainLength = count;
      }
    } else {
      count = 0;
    }
  } count = 0;

  //fuggoleges
  for (i = 0; i < rowCount; i++) {
    if (board2D[row][i] == player) {
      count++;
      if (count > chainLength) {
        chainLength = count;
      }
    } else {
      count = 0;
    }
  } count = 0;

  //atlo 1
  for (i = 0; i < rowCount; i++) {
    if (row - col + i >= 0 && row - col + i < rowCount) {
      if (board2D[row - col + i][i] == player) {
        count++;
        if (count > chainLength) {
          chainLength = count;
        }
      } else {
        count = 0;
      }
    }
  } count = 0;

  //atlo 2
  for (i = 0; i < rowCount; i++) {
    if (row + col - i >= 0 && row + col - i < rowCount) {
      if (board2D[row + col - i][i] == player) {
        count++;

        if (count > chainLength) {
          chainLength = count;
        }
      } else {
        count = 0;
      }
    }
  } count = 0;

  if (chainLength >= winAmount) {
    if (player == 1) {
      console.log('Jatekos 1 nyert');
    }
    
    else {
      console.log('Jatekos 2 nyert');
    }
  }
}