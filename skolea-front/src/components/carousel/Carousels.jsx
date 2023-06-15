import React from "react";
import { UncontrolledCarousel } from "reactstrap";
import banniere1 from "../../assets/img/banniere.jpg";
import banniere2 from "../../assets/img/banniere2.jpg";


const items = [
  {
    src: banniere1,
    altText: "",
    caption: "",
    header: "",
    style: { width: "500px",  height: "500px" }, // Redimensionner l'image à une largeur de 1200 pixels

  },
  {
    src: banniere2,
    altText: "",
    caption: "",
    header: "",
    style: { width: "500px", height: "500px"}, // Redimensionner l'image à une largeur de 1200 pixels

  },
];

const Carousels = () => {
  return (
    <>
      <UncontrolledCarousel items={items} />
    </>
  );
};

export default Carousels;
