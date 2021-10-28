import React from "react";
import { useSelector } from "react-redux";
import { ReactComponent as Nose1 } from "../styles/images/planet/nose/nose1.svg";
import { ReactComponent as Nose2 } from "../styles/images/planet/nose/nose2.svg";
import { ReactComponent as Nose3 } from "../styles/images/planet/nose/nose3.svg";
import { ReactComponent as Nose4 } from "../styles/images/planet/nose/nose4.svg";
import { ReactComponent as Nose5 } from "../styles/images/planet/nose/nose5.svg";

const PlanetNose = () => {
  const nose = useSelector((state) => state.planet.Deco.Nose.shape);
  const noseIdx = useSelector((state) => state.planet.Deco.Nose.idx);
  const noseColor = useSelector((state) => state.planet.Deco.Nose.color);

  return (
    <div className="planet-nose">
      {nose[noseIdx] === "default" ? <div></div> : null}
      {nose[noseIdx] === "Nose1" ? <Nose1 fill={noseColor} /> : null}
      {nose[noseIdx] === "Nose2" ? <Nose2 fill={noseColor} /> : null}
      {nose[noseIdx] === "Nose3" ? <Nose3 fill={noseColor} /> : null}
      {nose[noseIdx] === "Nose4" ? <Nose4 fill={noseColor} /> : null}
      {nose[noseIdx] === "Nose5" ? <Nose5 fill={noseColor} /> : null}
    </div>
  );
};

export default PlanetNose;
