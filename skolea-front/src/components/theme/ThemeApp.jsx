import React, { useRef, useEffect } from "react";
import banniere1 from "../../assets/img/skolae-bg.png";

const ThemeApp = () => {
  const banniere1Ref = useRef(null);

  useEffect(() => {
    banniere1Ref.current = document.getElementById("banniere1");
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 10; // Ajustez le facteur de défilement
        banniere1Ref.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  }, []);

  return (
    <>

      <img
        id="banniere1"
        src={banniere1}
        className="carousel-banner"
        alt=""
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          
        }}
      />
    </>
  );
};

export default ThemeApp;
