import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openMyPage } from "../actions/user";
import Loading from "./Loading";

const MyPlanetInfo = () => {
  const dispatch = useDispatch();
  const planetInfo = useSelector((state) => state.user.planetInfo);
  const planet = JSON.parse(localStorage.getItem("planet"));
  // const [checked, setChecked] = useState();

  useEffect(() => {
    getPlanetData();
  }, []);

  // 마이페이지 데이터 받아오기
  const getPlanetData = useCallback(async () => {
    dispatch(openMyPage());

    /* 서버 코드
    await axios
      .get(`http://52.78.18.110:8000/showuserinfo?userToken=${token}`)
      .then((res) => {
        console.log("res!", res);

        setPlanetInfo(res.data.planetOutside);
      })
      .catch((err) => {
        console.log(err);
      });*/
  }, []);

  // 행성 삭제
  const onClickDeletePlanet = useCallback(async (e) => {
    var id = e.target.value;
    var idx = planet.findIndex((key) => {
      return key.id === id;
    });
    planet.splice(idx, 1);
    localStorage.setItem("planet", JSON.stringify(planet));
    alert("행성 수정 완료");
    window.location.reload();

    /* 서버코드
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
                    <div className="list-nickname">{v.name}</div>
                    <div className="list-planetId">{v.id}</div>
                    <button onClick={onClickDeletePlanet} value={v.id}>
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
