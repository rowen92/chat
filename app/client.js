"use strict";

/**
 * Client module
 * @module app/client
 */

var io = require("socket.io-client"),
  readline = require("readline"),
  socket = io.connect("http://0.0.0.0:3000"),
  rl,
  name = "You";

rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.setPrompt( name + ": ");
var recursiveMsg = function() {
  rl.prompt();
  rl.on("line", function( msg ) {
    if ( msg == "exit") {
      console.log("Session finished");
      return rl.close();
    }

    socket.emit("chat message", msg );
    rl.prompt();
  });
};

socket.on("chat message", function( msg ) {
  rl.setPrompt("");
  rl.prompt();
  console.log( msg );
  rl.setPrompt( name + ": ");
  rl.prompt();
});

rl.write( null, { ctrl: true, name: "l" });
recursiveMsg();
