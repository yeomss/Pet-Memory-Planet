import React from "react";
import { useSelector } from "react-redux";
import { ReactComponent as Ears1 } from "../styles/images/planet/ears/ears1.svg";
import { ReactComponent as Ears2 } from "../styles/images/planet/ears/ears2.svg";
import { ReactComponent as Ears3 } from "../styles/images/planet/ears/ears3.svg";
import { ReactComponent as Ears4 } from "../styles/images/planet/ears/ears4.svg";
import { ReactComponent as Ears5 } from "../styles/images/planet/ears/ears5.svg";

const PlanetEars = () => {
  const ears = useSelector((state) => state.planet.Deco.Ears.shape);
  const earsIdx = useSelector((state) => state.planet.Deco.Ears.idx);
  const earsColor = useSelector((state) => state.planet.Deco.Ears.color);

  return (
    <div className="planet-ears">
      {ears[earsIdx] === "default" ? <div></div> : null}
      {ears[earsIdx] === "Ears1" ? <Ears1 fill={earsColor} /> : null}
      {ears[earsIdx] === "Ears2" ? <Ears2 fill={earsColor} /> : null}
      {ears[earsIdx] === "Ears3" ? <Ears3 fill={earsColor} /> : null}
      {ears[earsIdx] === "Ears4" ? <Ears4 fill={earsColor} /> : null}
      {ears[earsIdx] === "Ears5" ? <Ears5 fill={earsColor} /> : null}
    </div>
  );
};

export default PlanetEars;
