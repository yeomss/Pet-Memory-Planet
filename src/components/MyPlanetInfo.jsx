import axios from "axios";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const MyPlanetInfo = () => {
  const planetInfo = useSelector((state) => state.user.userInfo.planetOutside);
  const [checked, setChecked] = useState();
  console.log(planetInfo);

  const onClickDeletePlanet = useCallback((e) => {
    console.log(e.target.value);
    let planetId = e.target.value;

    axios
      .delete(`http://52.78.18.110:8000/deletemyplanet?planetId=${planetId}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="planet-info-container">
      <div className="title">행성 정보 수정</div>

      <div className="planet-info-content">
        <div className="list">
          {planetInfo.map((v) => {
            return (
              <div>
                {/* <label for="planetId">
                  <input
                    type="checkbox"
                    id="planetId"
                    value={v.planetId}
                    onClick={test}
                  />
                  {v.planetId}
                </label> */}
                <div>{v.planetId}</div>
                <div>{v.planetNickname}</div>
                <button onClick={onClickDeletePlanet} value={v.planetId}>
                  삭제
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyPlanetInfo;
