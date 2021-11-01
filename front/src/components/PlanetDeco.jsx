import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HexColorPicker } from "react-colorful";
import useInput from "../hooks/useInput";
import {
  setPlanetColor,
  setPlanetShadeColor,
  setPlanetEarsIdx,
  setPlanetNoseIdx,
  setPlanetMouthIdx,
  setPlanetEarsColor,
  setPlanetNoseColor,
  setPlanetMouthColor,
} from "../actions/planet";

const PlanetDeco = () => {
  const color = useSelector((state) => state.planet.Deco.color);
  const shade = useSelector((state) => state.planet.Deco.shade);

  const ears = useSelector((state) => state.planet.Deco.Ears.shape);
  const earsIdx = useSelector((state) => state.planet.Deco.Ears.idx);
  const earsColor = useSelector((state) => state.planet.Deco.Ears.color);
  const nose = useSelector((state) => state.planet.Deco.Nose.shape);
  const noseIdx = useSelector((state) => state.planet.Deco.Nose.idx);
  const noseColor = useSelector((state) => state.planet.Deco.Nose.color);
  const mouth = useSelector((state) => state.planet.Deco.Mouth.shape);
  const mouthIdx = useSelector((state) => state.planet.Deco.Mouth.idx);
  const mouthColor = useSelector((state) => state.planet.Deco.Mouth.color);
  const dispatch = useDispatch();

  // 행성 색상 선택 이벤트
  const onChangePlanetColor2 = useCallback(
    (picked) => {
      dispatch(
        setPlanetColor({
          planetColor: picked,
        })
      );
    },
    [color]
  );
  const onChangePlanetColor = useCallback(
    (e) => {
      dispatch(
        setPlanetColor({
          planetColor: e.target.value,
        })
      );
    },
    [color]
  );

  // 행성 그라데이션 색상 선택 이벤트
  const changePlanetShade = (picked) => {
    let svg = document.getElementsByClassName("planet-body-shade");
    svg[0].setAttribute("stop-color", picked);
    console.log(svg[0].getAttribute("stop-color"));
  };
  const onChangePlanetShadeColor = useCallback(
    (e) => {
      dispatch(
        setPlanetShadeColor({
          planetShadeColor: e.target.value,
        })
      );
      changePlanetShade(e.target.value);
    },
    [shade]
  );
  const onChangePlanetShadeColor2 = useCallback(
    (picked) => {
      dispatch(
        setPlanetShadeColor({
          planetShadeColor: picked,
        })
      );
      changePlanetShade(picked);
    },
    [shade]
  );

  // 귀 모양 & 색상 이벤트
  const onClickPlanetEarsLeft = useCallback(() => {
    dispatch(
      setPlanetEarsIdx({
        planetEarsIdx: earsIdx - 1,
      })
    );
  }, [earsIdx]);
  const onClickPlanetEarsRight = useCallback(() => {
    dispatch(
      setPlanetEarsIdx({
        planetEarsIdx: earsIdx + 1,
      })
    );
  }, [earsIdx]);
  const onChangeEarsColor = useCallback((e) => {
    dispatch(
      setPlanetEarsColor({
        planetEarsColor: e.target.value,
      })
    );
  }, []);

  // 코 모양 & 색상 이벤트
  const onClickPlanetNoseLeft = useCallback(() => {
    dispatch(
      setPlanetNoseIdx({
        planetNoseIdx: noseIdx - 1,
      })
    );
  }, [noseIdx]);
  const onClickPlanetNoseRight = useCallback(() => {
    dispatch(
      setPlanetNoseIdx({
        planetNoseIdx: noseIdx + 1,
      })
    );
  }, [noseIdx]);
  const onChangeNoseColor = useCallback((e) => {
    dispatch(setPlanetNoseColor({ planetNoseColor: e.target.value }));
  }, []);

  // 입 모양 & 색상 이벤트
  const onClickPlanetMouthLeft = useCallback(() => {
    dispatch(
      setPlanetMouthIdx({
        planetMouthIdx: mouthIdx - 1,
      })
    );
  }, [mouthIdx]);
  const onClickPlanetMouthRight = useCallback(() => {
    dispatch(
      setPlanetMouthIdx({
        planetMouthIdx: mouthIdx + 1,
      })
    );
  }, [mouthIdx]);
  const onChangeMouthColor = useCallback((e) => {
    dispatch(setPlanetMouthColor({ planetMouthColor: e.target.value }));
  }, []);

  return (
    <div className="deco-container">
      <div className="title">Customizing</div>

      <div className="ears">
        <div>귀모양</div>
        <span class="material-icons" onClick={onClickPlanetEarsLeft}>
          arrow_back_ios
        </span>
        <span>{ears[earsIdx]}</span>
        <span class="material-icons" onClick={onClickPlanetEarsRight}>
          arrow_forward_ios
        </span>
        <input
          className="ears-color"
          type="color"
          value={earsColor}
          onChange={onChangeEarsColor}
        />
      </div>

      <div className="nose">
        <div>코모양</div>
        <span class="material-icons" onClick={onClickPlanetNoseLeft}>
          arrow_back_ios
        </span>
        <span>{nose[noseIdx]}</span>
        <span class="material-icons" onClick={onClickPlanetNoseRight}>
          arrow_forward_ios
        </span>
        <input
          className="nose-color"
          type="color"
          value={noseColor}
          onChange={onChangeNoseColor}
        />
      </div>

      <div className="mouth">
        <div>입모양</div>
        <span class="material-icons" onClick={onClickPlanetMouthLeft}>
          arrow_back_ios
        </span>
        <span>{mouth[mouthIdx]}</span>
        <span class="material-icons" onClick={onClickPlanetMouthRight}>
          arrow_forward_ios
        </span>
        <input
          className="mouth-color"
          type="color"
          value={mouthColor}
          onChange={onChangeMouthColor}
        />
      </div>

      <div className="color-area">
        <label htmlFor="">행성컬러</label>
        <input type="color" value={color} onChange={onChangePlanetColor} />
        <div>
          <HexColorPicker
            className="colorpicker"
            color={color}
            onChange={onChangePlanetColor2}
          />
        </div>
      </div>

      <div className="shade-area">
        <label>행성그림자컬러</label>
        <input type="color" value={color} onChange={onChangePlanetShadeColor} />
        <div>
          <HexColorPicker
            className="colorpicker"
            color={shade}
            onChange={onChangePlanetShadeColor2}
          />
        </div>
      </div>
    </div>
  );
};

export default PlanetDeco;
