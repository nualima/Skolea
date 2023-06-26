/*eslint-disable*/
import React from "react";
import { Container } from "reactstrap";

function ExempleNavbar() {
  return (
    <>
      <div className="page-header clear-filter" filter-color="blue" style={{ marginTop: "300px" }}>
        <Container>
          <div className="content-center brand">
            {/* <h1 className="h1-seo">SKOLEA</h1>
            <h3>Une nouvelle façon d'apprendre.</h3> */}
          </div>
            
            <img
              alt="..."
              className="creative-tim-logo"
              src={require("../assets/img/pauline1-modified.png")}
              style={{ width: "200px", height: "200px", marginLeft: "-150px" }}
            ></img>
        </Container>
      </div>
    </>
  );
}

export default ExempleNavbar;
