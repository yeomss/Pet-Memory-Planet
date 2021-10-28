const SET_FORMDATA = "SET_FORMDATA";

// Info
const SET_PLANET_ID = "SET_PLANET_ID";
const SET_PLANET_NAME = "SET_PLANET_NAME";
const SET_PLANET_STORY = "SET_PLANET_STORY";

const SET_PET_NAME = "SET_PET_NAME";
const SET_PET_IMG = "SET_PET_IMG";
const SET_PET_GENDER = "SET_PET_GENDER";
const SET_PET_BREED = "SET_PET_BREED";
const SET_PET_BIRTHDAY = "SET_PET_BIRTHDAY";
const SET_PET_DEATHDAY = "SET_PET_DEATHDAY";
const SET_PET_FAVORITE = "SET_PET_FAVORITE";

// Deco
const SET_PLANET_COLOR = "SET_PLANET_COLOR";
const SET_PLANET_SHADE_COLOR = "SET_PLANET_SHADE_COLOR";

const SET_PLANET_EARS = "SET_PLANET_EARS";
const SET_PLANET_NOSE = "SET_PLANET_NOSE";
const SET_PLANET_MOUTH = "SET_PLANET_MOUTH";

const SET_PLANET_EARS_IDX = "SET_PLANET_EARS_IDX";
const SET_PLANET_NOSE_IDX = "SET_PLANET_NOSE_IDX";
const SET_PLANET_MOUTH_IDX = "SET_PLANET_MOUTH_IDX";

const SET_PLANET_EARS_COLOR = "SET_PLANET_EARS_COLOR";
const SET_PLANET_NOSE_COLOR = "SET_PLANET_NOSE_COLOR";
const SET_PLANET_MOUTH_COLOR = "SET_PLANET_MOUTH_COLOR";

const setFormdata = (data) => {
  return {
    type: SET_FORMDATA,
    data,
  };
};

// Info
// 행성 정보 설정
const setPlanetId = (data) => {
  return {
    type: SET_PLANET_ID,
    data,
  };
};
const setPlanetName = (data) => {
  return {
    type: SET_PLANET_NAME,
    data,
  };
};
const setPlanetStory = (data) => {
  return {
    type: SET_PLANET_STORY,
    data,
  };
};

// 행성 반려동물 정보 설정
const setPetName = (data) => {
  return {
    type: SET_PET_NAME,
    data,
  };
};
const setPetImg = (data) => {
  return {
    type: SET_PET_IMG,
    data,
  };
};
const setPetGender = (data) => {
  return {
    type: SET_PET_GENDER,
    data,
  };
};
const setPetBreed = (data) => {
  return {
    type: SET_PET_BREED,
    data,
  };
};
const setPetBirthday = (data) => {
  return {
    type: SET_PET_BIRTHDAY,
    data,
  };
};
const setPetDeathday = (data) => {
  return {
    type: SET_PET_DEATHDAY,
    data,
  };
};
const setPetFavorite = (data) => {
  return {
    type: SET_PET_FAVORITE,
    data,
  };
};

// Deco
// 행성 색상 설정
const setPlanetColor = (data) => {
  return {
    type: SET_PLANET_COLOR,
    data,
  };
};
const setPlanetShadeColor = (data) => {
  return {
    type: SET_PLANET_SHADE_COLOR,
    data,
  };
};

// 행성 귀 설정
const setPlanetEars = (data) => {
  return {
    type: SET_PLANET_EARS,
    data,
  };
};
const setPlanetEarsIdx = (data) => {
  return {
    type: SET_PLANET_EARS_IDX,
    data,
  };
};
const setPlanetEarsColor = (data) => {
  return {
    type: SET_PLANET_EARS_COLOR,
    data,
  };
};

// 행성 코 설정
const setPlanetNose = (data) => {
  return {
    type: SET_PLANET_NOSE,
    data,
  };
};
const setPlanetNoseIdx = (data) => {
  return {
    type: SET_PLANET_NOSE_IDX,
    data,
  };
};
const setPlanetNoseColor = (data) => {
  return {
    type: SET_PLANET_NOSE_COLOR,
    data,
  };
};

// 행성 입 설정
const setPlanetMouth = (data) => {
  return {
    type: SET_PLANET_MOUTH,
    data,
  };
};
const setPlanetMouthIdx = (data) => {
  return {
    type: SET_PLANET_MOUTH_IDX,
    data,
  };
};
const setPlanetMouthColor = (data) => {
  return {
    type: SET_PLANET_MOUTH_COLOR,
    data,
  };
};

module.exports = {
  // Info
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
  // Deco
  setPlanetColor,
  setPlanetShadeColor,
  setPlanetEars,
  setPlanetEarsIdx,
  setPlanetEarsColor,
  setPlanetNose,
  setPlanetNoseIdx,
  setPlanetNoseColor,
  setPlanetMouth,
  setPlanetMouthIdx,
  setPlanetMouthColor,
};
