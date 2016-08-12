var chai = require("chai"),
  expect = chai.expect,
  chaiHttp = require("chai-http"),
  server = require("../app/server");

chai.use( chaiHttp );

describe("server", function() {
  it("should have status 200", function() {
    chai.request( server )
    .get("/")
    .end(function( err, res ) {
      expect( err ).to.be.null;
      expect( res ).to.have.status( 200 );
    });
  });
});
