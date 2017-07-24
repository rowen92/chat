"use strict";

/**
 * Server module
 * @module app/server
 */

var app = require("express")(),
  http = require("http").Server( app ),
  io = require("socket.io")( http ),
  server;

io.on( "connection", function( socket ) {
  var id;

  id = ( socket.id ).toString().substr( 2, 5 );
  console.log( "User " + id + " is connected" );

  socket.on("chat message", function( msg ) {
    if ( msg ) {
      socket.broadcast.emit("chat message", id + ": " + msg );
    }
  });

  socket.on("disconnect", function() {
    console.log( "User " + id + " is disconnected" );
  });
});

server = http.listen( 3000, function() {
  console.log("Chat server is running");
});

module.exports = server;
