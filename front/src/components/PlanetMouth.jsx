import React from "react";
import { useSelector } from "react-redux";
import { ReactComponent as Mouth1 } from "../styles/images/planet/mouth/mouth1.svg";
import { ReactComponent as Mouth2 } from "../styles/images/planet/mouth/mouth2.svg";
import { ReactComponent as Mouth3 } from "../styles/images/planet/mouth/mouth3.svg";

const PlanetMouth = () => {
  const mouth = useSelector((state) => state.planet.Deco.Mouth.shape);
  const mouthIdx = useSelector((state) => state.planet.Deco.Mouth.idx);
  const mouthColor = useSelector((state) => state.planet.Deco.Mouth.color);

  return (
    <div className="planet-mouth">
      {mouth[mouthIdx] === "default" ? <div></div> : null}
      {mouth[mouthIdx] === "Mouth1" ? <Mouth1 fill={mouthColor} /> : null}
      {mouth[mouthIdx] === "Mouth2" ? <Mouth2 fill={mouthColor} /> : null}
      {mouth[mouthIdx] === "Mouth3" ? <Mouth3 fill={mouthColor} /> : null}
    </div>
  );
};

export default PlanetMouth;
