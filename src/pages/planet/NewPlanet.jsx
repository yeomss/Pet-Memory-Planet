import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { Link, Route } from "react-router-dom";
import axios from "axios";

import { ReactComponent as PlanetBody } from "../../styles/images/planet/planet-body-extend.svg";
import PlanetInfo from "../../components/PlanetInfo";
import PlanetDeco from "../../components/PlanetDeco";
import PlanetEars from "../../components/PlanetEars";
import PlanetNose from "../../components/PlanetNose";
import PlanetMouth from "../../components/PlanetMouth";
import P5Wrapper from "react-p5-wrapper";
import particles from "../../components/particles";
import Bubble from "../../components/bubble";

import "../../styles/NewPlanet.scss";
import HomeBtn from "../../components/HomeBtn";

const NewPlanet = () => {
  // Info
  const planetId = useSelector((state) => state.planet.Info.planetId);
  const planetName = useSelector((state) => state.planet.Info.planetName);
  const planetStory = useSelector((state) => state.planet.Info.planetStory);
  const petName = useSelector((state) => state.planet.Info.petName);
  const petImg = useSelector((state) => state.planet.Info.petImg);
  const petGender = useSelector((state) => state.planet.Info.petGender);
  const petBreed = useSelector((state) => state.planet.Info.petBreed);
  const petBirthday = useSelector((state) => state.planet.Info.petBirthday);
  const petDeathday = useSelector((state) => state.planet.Info.petDeathday);
  const petFavorite = useSelector((state) => state.planet.Info.petFavorite);

  // Deco
  const planetColor = useSelector((state) => state.planet.Deco.color);
  const planetShade = useSelector((state) => state.planet.Deco.shade);
  const planetEarsIdx = useSelector((state) => state.planet.Deco.Ears.idx);
  const planetEarsColor = useSelector((state) => state.planet.Deco.Ears.color);
  const planetNoseIdx = useSelector((state) => state.planet.Deco.Nose.idx);
  const planetNoseColor = useSelector((state) => state.planet.Deco.Nose.color);
  const planetMouthIdx = useSelector((state) => state.planet.Deco.Mouth.idx);
  const planetMouthColor = useSelector(
    (state) => state.planet.Deco.Mouth.color
  );

  // 체크 버튼 클릭 이벤트
  const onClickPlanetCheck = useCallback(() => {
    console.log("행성 외부: 확인 버튼 클릭");
    console.log("행성 이름:", planetName);
    console.log("행성 스토리:", planetStory);
    console.log("행성 아이디:", planetId);
    console.log("반려동물 이름:", petName);
    console.log("반려동물 성별:", petGender);
    console.log("반려동물 품종:", petBreed);
    console.log("반려동물 탄생일:", petBirthday);
    console.log("반려동물 추모일:", petDeathday);
    console.log("반려동물 사진:", typeof petImg);
    console.log("반려동물 사진:", petImg);

    let token = sessionStorage.getItem("userToken");

    // formData 생성
    let formData = new FormData();

    // Info
    formData.append("userToken", token);
    formData.append("planetId", planetId);
    formData.append("planetNickname", planetName);
    formData.append("planetIntro", planetStory);
    formData.append("petName", petName);
    formData.append("gender", petGender);
    formData.append("birthday", petBirthday);
    formData.append("deathday", petDeathday);
    formData.append("image", petImg);
    formData.append("breed", petBreed);
    formData.append("favorite", petFavorite);

    // Deco
    formData.append("color", planetColor);
    formData.append("color", planetShade);
    formData.append("ears", planetEarsIdx);
    formData.append("ears", planetEarsColor);
    formData.append("nose", planetNoseIdx);
    formData.append("nose", planetNoseColor);
    formData.append("mouth", planetMouthIdx);
    formData.append("mouth", planetMouthColor);
    formData.append("private", 5);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    axios
      // .post("http://localhost:8000/createplanet", data)
      .post("http://52.78.18.110:8000/createplanet", formData, config)
      .then((res) => {
        console.log(res);
        window.location.replace("/");
      })
      .catch((err) => console.log(err));
  }, [
    planetId,
    planetName,
    planetStory,
    petName,
    petGender,
    petBirthday,
    petDeathday,
    petImg,
    petBreed,
    petFavorite,
    planetColor,
    planetShade,
    planetNoseIdx,
    planetNoseColor,
    planetMouthIdx,
    planetMouthColor,
  ]);
  return (
    <div className="new-planet-container">
      <HomeBtn />

      {/* <h1 className="new-planet-title">New Planet</h1> */}
      <div className="planet dung">
        <PlanetBody className="planet-body" fill={planetColor} />
        <PlanetEars className="planet-ears" />
        <PlanetNose className="planet-nose" />
        <PlanetMouth className="planet-mouth" />
      </div>
      <Bubble />

      <div className="menu">
        <Link to="/newplanet/info">
          <div className="info" title="Information">
            <span class="material-icons">auto_stories</span>
          </div>
        </Link>
        <Link to="/newplanet/deco">
          <div className="deco" title="Customizing">
            <span class="material-icons">auto_awesome</span>
          </div>
        </Link>
        <div
          className="new-planet-button"
          onClick={onClickPlanetCheck}
          title="create"
        >
          <span class="material-icons">done_outline</span>
        </div>
      </div>

      <div className="edit-box">
        <Route path="/newplanet/info" component={PlanetInfo} />
        <Route path="/newplanet/deco" component={PlanetDeco} />
      </div>

      <P5Wrapper sketch={particles} />
    </div>
  );
};

export default NewPlanet;
