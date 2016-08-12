"use strict";

/**
 * Client module
 * @module app/client
 */

var io = require("socket.io-client"),
  readline = require("readline"),
  rl,
  socket = io.connect("http://0.0.0.0:3000");

rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Recursive function provides input data in terminal
 */
var recursiveMsg = function() {
  rl.question(">> ", function( msg ) {
    if ( msg == "exit") {
      console.log("Session finished");
      return rl.close();
    }

    socket.emit("chat message", msg );
    recursiveMsg();
  });
};

socket.on("chat message", function( msg ) {
  console.log( msg );
  recursiveMsg();
});

recursiveMsg();
