const { produce } = require("immer");

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

const initialState = {
  formData: null,

  Info: {
    planetId: "",
    planetName: "",
    planetStory: "",
    petName: "",
    petImg: null,
    petGender: "수컷",
    petBreed: "",
    petBirthday: "",
    petDeathday: "",
    petFavorite: "",
  },

  Deco: {
    color: "#8846ef",
    shade: "aqua",
    Ears: {
      color: "white",
      idx: 0,
      shape: ["default", "Ears1", "Ears2", "Ears3", "Ears4", "Ears5"],
    },
    Nose: {
      color: "white",
      idx: 0,
      shape: ["default", "Nose1", "Nose2", "Nose3", "Nose4", "Nose5"],
    },
    Mouth: {
      color: "white",
      idx: 0,
      shape: ["default", "Mouth1", "Mouth2", "Mouth3"],
    },
  },
};

const planetReducer = (prevState = initialState, action) => {
  return produce(prevState, (draft) => {
    switch (action.type) {
      // Info
      case SET_PLANET_ID:
        draft.Info.planetId = action.data.planetId;
        break;
      case SET_PLANET_NAME:
        draft.Info.planetName = action.data.planetName;
        break;
      case SET_PLANET_STORY:
        draft.Info.planetStory = action.data.planetStory;
        break;

      case SET_PET_NAME:
        draft.Info.petName = action.data.petName;
        break;
      case SET_PET_IMG:
        draft.Info.petImg = action.data.petImg;
        break;
      case SET_PET_GENDER:
        draft.Info.petGender = action.data.petGender;
        break;
      case SET_PET_BREED:
        draft.Info.petBreed = action.data.petBreed;
        break;
      case SET_PET_BIRTHDAY:
        draft.Info.petBirthday = action.data.petBirthday;
        break;
      case SET_PET_DEATHDAY:
        draft.Info.petDeathday = action.data.petDeathday;
        break;
      case SET_PET_FAVORITE:
        draft.Info.petFavorite = action.data.petFavorite;
        break;

      // Deco
      case SET_PLANET_COLOR:
        draft.Deco.color = action.data.planetColor;
        console.log("color:: ", draft.Deco.color);
        break;
      case SET_PLANET_SHADE_COLOR:
        draft.Deco.shade = action.data.planetShadeColor;
        break;

      case SET_PLANET_EARS:
        draft.Deco.Ears.shape = action.data.planetEars;
        break;
      case SET_PLANET_EARS_IDX:
        if (action.data.planetEarsIdx < 0) {
          draft.Deco.Ears.idx = 0;
        } else if (action.data.planetEarsIdx > 5) {
          draft.Deco.Ears.idx = 5;
        } else {
          draft.Deco.Ears.idx = action.data.planetEarsIdx;
        }
        break;
      case SET_PLANET_EARS_COLOR:
        draft.Deco.Ears.color = action.data.planetEarsColor;
        break;

      case SET_PLANET_NOSE:
        draft.Deco.Nose.shape = action.data.planetNose;
        break;
      case SET_PLANET_NOSE_IDX:
        if (action.data.planetNoseIdx < 0) {
          draft.Deco.Nose.idx = 0;
        } else if (action.data.planetNoseIdx > 5) {
          draft.Deco.Nose.idx = 5;
        } else {
          draft.Deco.Nose.idx = action.data.planetNoseIdx;
        }
        break;
      case SET_PLANET_NOSE_COLOR:
        draft.Deco.Nose.color = action.data.planetNoseColor;
        break;

      case SET_PLANET_MOUTH:
        draft.Deco.Mouth.shape = action.data.planetMouth;
        break;
      case SET_PLANET_MOUTH_IDX:
        if (action.data.planetMouthIdx < 0) {
          draft.Deco.Mouth.idx = 0;
        } else if (action.data.planetMouthIdx > 3) {
          draft.Deco.Mouth.idx = 3;
        } else {
          draft.Deco.Mouth.idx = action.data.planetMouthIdx;
        }
        break;
      case SET_PLANET_MOUTH_COLOR:
        draft.Deco.Mouth.color = action.data.planetMouthColor;
        break;

      default:
        break;
    }
  });
};

module.exports = planetReducer;
