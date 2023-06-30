import React from "react";
import { UncontrolledCarousel, Button } from "reactstrap";
import img1 from "../../assets/img/proffesseurs.jpg";
import img2 from "../../assets/img/questions.jpg";

const items = [
  {
    src: img1,
    altText: "",
    name: "professeurs",
    caption: "",
    header: "This is the first image",
    learnMore: (
      <Button color="primary">
        Learn more
      </Button>
    ),
  },
  {
    src: img2,
    altText: "",
    name: "questions",
    caption: "",
    header: "",
  },
];

const Carousels = () => {
  return (
    <>
      <UncontrolledCarousel items={items} renderIndicators={false} />
    </>
  );
};

export default Carousels;
