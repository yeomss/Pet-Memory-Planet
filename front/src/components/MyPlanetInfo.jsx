import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openMyPage } from "../actions/user";
import Loading from "./Loading";

const MyPlanetInfo = () => {
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("userToken");
  const [planetInfo, setPlanetInfo] = useState("");
  // const planetInfo = useSelector((state) => state.user.planetInfo);
  const [checked, setChecked] = useState();
  console.log(planetInfo);

  useEffect(() => {
    getData();
  }, []);

  // 마이페이지 데이터 받아오기
  const getData = useCallback(async () => {
    /*await axios
      .get(`http://52.78.18.110:8000/showuserinfo?userToken=${token}`)
      .then((res) => {
        console.log("res!", res);

        setPlanetInfo(res.data.planetOutside);
      })
      .catch((err) => {
        console.log(err);
      });*/
  }, [token]);

  const onClickDeletePlanet = useCallback(async (e) => {
    /*
    let planetId = e.target.value;

    await axios
      .delete(`http://52.78.18.110:8000/deletemyplanet?planetId=${planetId}`)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));*/
  }, []);

  return (
    <>
      {planetInfo ? (
        <div className="planet-info-container">
          <div className="title">
            행성 정보 수정
            <div className="sub-title">행성 정보를 수정하실 수 있습니다.</div>
          </div>

          <div className="planet-info-content">
            <div className="list">
              {planetInfo.map((v, idx) => {
                return (
                  <div key={idx}>
                    <div className="list-idx">{idx + 1}</div>
                    {/* <input type="checkbox" id="planetId" value={v.planetId} /> */}
                    <div className="list-nickname">{v.planetNickname}</div>
                    {/* <div className="list-planetId">{v.planetId}</div> */}
                    <button onClick={onClickDeletePlanet} value={v.planetId}>
                      삭제
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default MyPlanetInfo;
