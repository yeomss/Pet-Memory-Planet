import axios from "axios";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setPlanetId,
  setPlanetName,
  setPlanetStory,
  setPetName,
  setPetImg,
  setPetGender,
  setPetBreed,
  setPetBirthday,
  setPetDeathday,
  setPetFavorite,
} from "../actions/planet";

const PlanetInfo = () => {
  const [petTempImg, setPetTempImg] = useState("");
  const [petImgUrl, setPetImgUrl] = useState(null);

  const nickname = useSelector((state) => state.user.nickname);
  const dispatch = useDispatch();

  // 행성 정보
  const planetId = useSelector((state) => state.planet.Info.planetId);
  const planetName = useSelector((state) => state.planet.Info.planetName);
  const planetStory = useSelector((state) => state.planet.Info.planetStory);

  // 반려동물 정보
  const petName = useSelector((state) => state.planet.Info.petName);
  const petImg = useSelector((state) => state.planet.Info.petImg);
  const petGender = useSelector((state) => state.planet.Info.petGender);
  const petBreed = useSelector((state) => state.planet.Info.petBreed);
  const petBirthday = useSelector((state) => state.planet.Info.petBirthday);
  const petDeathday = useSelector((state) => state.planet.Info.petDeathday);
  const petFavorite = useSelector((state) => state.planet.Info.petFavorite);

  // 행성 고유 번호 뽑기 이벤트
  const selectRandomId = useCallback(() => {
    let num1 = Math.floor(Math.random() * 8999 + 1000);
    let num2 = Math.floor(Math.random() * 8999 + 1000);

    let petList = ["MONG", "MEOW", "CAT", "DOG", "HAM", "BIRD", "BOW", "WOW"];
    let pet = petList[Math.floor(Math.random() * petList.length)];

    let str = "";
    let strList =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++)
      str += strList.charAt(Math.floor(Math.random() * strList.length));

    let randomId = pet + "-" + num1 + "-" + str + "-" + num2;

    dispatch(
      setPlanetId({
        planetId: randomId,
      })
    );
    console.log(randomId);
  }, [nickname]);

  // img 이벤트
  const onClickPetImg = (e) => {
    document.querySelector(".petImg-input").click();
    // console.log(document.querySelector(".petImg-input"));
  };
  const onChangePetTempImg = useCallback(
    (e) => {
      setPetTempImg(e.target.value);

      // 파일 객체 생성
      let fr = new FileReader();
      let file = e.target.files[0];

      if (file) {
        fr.readAsDataURL(file);
      }

      fr.onloadend = (e) => {
        // setPetImgUrl(fr.result);
        // console.log(e.target.result);
        dispatch(setPetImg({ petImg: e.target.result }));
      };

      // fr.readAsDataURL(file);
    },
    [petImg]
  );

  // onChange 이벤트
  const onChangePlanetName = useCallback(
    (e) => {
      dispatch(setPlanetName({ planetName: e.target.value }));
    },
    [planetName]
  );
  const onChangePlanetStory = useCallback(
    (e) => {
      dispatch(setPlanetStory({ planetStory: e.target.value }));
    },
    [planetStory]
  );
  const onChangePetName = useCallback(
    (e) => {
      dispatch(setPetName({ petName: e.target.value }));
    },
    [petName]
  );
  const onChangePetGender = useCallback(
    (e) => {
      dispatch(setPetGender({ petGender: e.target.value }));
    },
    [petGender]
  );
  const onChangePetBreed = useCallback(
    (e) => {
      dispatch(setPetBreed({ petBreed: e.target.value }));
    },
    [petBreed]
  );
  const onChangePetBirthday = useCallback(
    (e) => {
      dispatch(setPetBirthday({ petBirthday: e.target.value }));
    },
    [petBirthday]
  );
  const onChangePetDeathday = useCallback(
    (e) => {
      dispatch(setPetDeathday({ petDeathday: e.target.value }));
    },
    [petDeathday]
  );
  const onChangePetFavorite = useCallback(
    (e) => {
      dispatch(setPetFavorite({ petFavorite: e.target.value }));
    },
    [petFavorite]
  );

  return (
    <div className="info-container">
      <div className="info-title">INFORMATION</div>
      <div className="info-sub-title">
        행성에 남기고 싶은 정보를 입력해주세요.
      </div>

      <div className="input-area">
        <div className="input-pet">
          <div className="title">추모동물정보</div>
          <div onClick={onClickPetImg}>
            <img className="petImg-preview" src={petImg} file="null" />
          </div>
          <div className="img">
            <input
              className="petImg-input"
              type="file"
              name="petImg"
              value={petTempImg}
              accept="image/jpg,impge/png,image/jpeg,image/gif"
              onChange={onChangePetTempImg}
            />
          </div>

          <div className="name">
            <input
              type="text"
              name="petName"
              value={petName}
              placeholder="추모 동물 이름"
              onChange={onChangePetName}
              autoComplete="off"
              required
            />
          </div>

          <div className="gender">
            {/* <label htmlFor="">성별</label> */}
            <select
              type="text"
              name="petGender"
              value={petGender}
              placeholder="추모 동물 성별"
              onChange={onChangePetGender}
              required
            >
              <option vlaue="boy">수컷</option>
              <option vlaue="girl">암컷</option>
            </select>
          </div>

          <div className="breed">
            <input
              type="text"
              name="petBreed"
              value={petBreed}
              placeholder="추모 동물 품종"
              onChange={onChangePetBreed}
              autoComplete="off"
            />
          </div>

          <div className="favorite">
            <input
              type="text"
              name="favorite"
              value={petFavorite}
              placeholder="좋아하던 것"
              onChange={onChangePetFavorite}
              autoComplete="off"
            />
          </div>

          <div>탄생일</div>
          <div className="birth">
            <input
              type="date"
              name="petBirthday"
              value={petBirthday}
              placeholder="추모 동물 탄생일"
              onChange={onChangePetBirthday}
            />
          </div>
          <div>안식일</div>
          <div className="death">
            <input
              type="date"
              name="petDeathday"
              value={petDeathday}
              placeholder="추모 동물 안식일"
              onChange={onChangePetDeathday}
              required
            />
          </div>
        </div>

        <div className="input-planet">
          <div className="title">행성 정보</div>
          <div>
            <button onClick={selectRandomId}>고유 번호 랜덤</button>
          </div>

          <div>{planetId}</div>
          <div className="name">
            <input
              type="text"
              name="planetName"
              value={planetName}
              placeholder="행성 이름"
              onChange={onChangePlanetName}
              autoComplete="off"
              required
            />
          </div>
          <div className="story">
            <textarea
              type="text"
              name="planetStory"
              value={planetStory}
              placeholder="행성 스토리"
              onChange={onChangePlanetStory}
              autoComplete="off"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanetInfo;
