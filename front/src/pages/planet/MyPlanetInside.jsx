import { useRef, useEffect, useState } from "react";
import "../styles/MyPlanet.scss";
import PostList from "../../components/InsidePlanet/PostList";
import close from "../styles/images/close.png";
import setting from "../styles/images/pngwing.com.png";
import axios from "axios";

import TreeItem from "../../components/InsidePlanet/TreeItem";
import NewItem from "../../components/InsidePlanet/NewItem";

import { useDispatch, useSelector } from "react-redux";
import { addItem, newItem, tempNewItem } from "../../actions/item";
import GuestBookList from "../../components/InsidePlanet/GuestBookList";

import dashBoard1 from "../styles/images/SVG/dashBoard_sky.svg";
import dashBoard2 from "../styles/images/SVG/dashBoard_purple.svg";
import frame from "../styles/images/SVG/frame2.svg";
import adderFrame from "../styles/images/SVG/adderFrame.svg";
import post from "../styles/images/SVG/post.svg";

// 여자
import WomanLeftone from "../styles/images/SVG/1.svg";
import WomanLefttwo from "../styles/images/SVG/2.svg";
import WomanRightthree from "../styles/images/SVG/3.svg";
import WomanRightfour from "../styles/images/SVG/4.svg";

// 남자
import ManRightone from "../styles/images/SVG/5.svg";
import ManRighttwo from "../styles/images/SVG/6.svg";
import ManLeftthree from "../styles/images/SVG/7.svg";
import ManLeftfour from "../styles/images/SVG/8.svg";

import X1 from "../styles/images/SVG/X1.svg";

import enterDoorRight from "../styles/images/SVG/enterDoorRight.svg";
import enterDoorLeft from "../styles/images/SVG/enterDoorLeft.svg";

import okIcon from "../styles/images/okIcon.png";

// 나무
import tree1 from "../styles/images/SVG/tree1.svg";
import tree2 from "../styles/images/SVG/tree2.svg";
import tree3 from "../styles/images/SVG/tree3.svg";
import tree4 from "../styles/images/SVG/tree4.svg";
import tree5 from "../styles/images/SVG/newTree1.svg";
import tree6 from "../styles/images/SVG/newTree2.svg";
import tree7 from "../styles/images/SVG/newTree3.svg";

// 날씨 아이콘
import Clear from "../styles/images/SVG/Weather/wi-day-sunny.svg";
import Rain from "../styles/images/SVG/Weather/wi-rain.svg";
import Snow from "../styles/images/SVG/Weather/wi-snow.svg";
import Clouds from "../styles/images/SVG/Weather/wi-cloudy.svg";
import Haze from "../styles/images/SVG/Weather/wi-fog.svg";
import Mist from "../styles/images/SVG/Weather/wi-fog.svg";
import Dust from "../styles/images/SVG/Weather/wi-dust.svg";
import Tunderstrom from "../styles/images/SVG/Weather/wi-lightning.svg";

// 홈버튼
import HomeBtn from "../../components/HomeBtn.jsx";
import PlanetInsideLoader from "../../components/InsidePlanet/PlanetInsideLoader";

// 날씨 정보를 받아 오기 위해 필요한 개인 키
const API_KDY = "4465fb612d873f51db006ab470b74eeb";

const MyPlanetInside = (state) => {
  //리덕스

  // 커스터마이징 아이템들 저장할 배열
  const item = useSelector((state) => state.item.items);

  // 새로 추가한 아이템이 담겨있게될 변수
  const newTempItem = useSelector((state) => state.item.newTempItem);

  // 리덕스에 설정한 변수를 변경 하기 위한 dispatch 선언
  const dispatch = useDispatch();

  // 로딩화면 관련 State
  const [isLoading, setisLoading] = useState(true);

  // 행성, 사용자 토큰
  const planetToken = sessionStorage.getItem("planetToken");
  const userToken = sessionStorage.getItem("userToken");

  // 커스터마이징 메뉴 관련 배열
  const editor = [
    {
      name: tree1,
      str: "tree1",
    },
    {
      name: tree2,
      str: "tree2",
    },
    {
      name: tree3,
      str: "tree3",
    },
    {
      name: tree4,
      str: "tree4",
    },
    {
      name: tree5,
      str: "tree5",
    },
    {
      name: tree6,
      str: "tree6",
    },
    {
      name: tree7,
      str: "tree7",
    },
  ];

  // 날씨 관련 배열
  const [weatherIconArr, setweatherIconArr] = useState([
    {
      icon: Clear,
    },
    {
      icon: Rain,
    },
    {
      icon: Snow,
    },
    {
      icon: Clouds,
    },
    {
      icon: Haze,
    },
    {
      icon: Mist,
    },
    {
      icon: Dust,
    },
    {
      icon: Tunderstrom,
    },
  ]);

  // 편지 작성 모달창
  const [modalPost, setmodalPost] = useState(false);

  // 에디터 메뉴바 열고 닫는거 관리하는 변수
  const [isOpenEditor, setEditor] = useState(false);

  // 아이템 추가 메뉴 관리 변수
  const [isOpenEditorMenu, setEditorMenu] = useState(false);

  // 아이템 수정 메뉴 관리 변수
  const [EditorModi, setEditorModi] = useState(false);

  // 사용자 커스텀 아이템 저장 변수 (배열)
  const [customItem, setCustomItem] = useState([]);

  // 스크롤 위치 값 저장 변수
  const [scrollX, setScrollX] = useState(0);

  // 추가될 아이템을 보여주기 위한 변수
  const [isClickedItem, setIsClickedItem] = useState(false);

  const [curItem, setCurItem] = useState("");
  const [newItemData, setNewItemData] = useState(null);

  // 편지 새로 작성하기 버튼이 눌림 감지 변수
  const [isCreatePostBtnClicked, setCreatePostBtnClick] = useState(false);

  // 편지 작성값
  const [postInput, setPostInput] = useState("");

  // 편지 리스트
  const [postList, setPostList] = useState([]);

  //전체 컨텐츠 컨테이너 contentsContainer
  const contentsContainerRef = useRef(null);

  // 행성 주인임을 나타내는값을 저장할 변수
  const [isOwner, setIsOwner] = useState(false);

  // 캐릭터 변경 전용
  const [isChracterClicked, setChracter] = useState(null);

  // -----------------------------------------------
  // -----------------------------------------------
  // 방명록

  // 방명록 작성 모달창
  const [modalGuestBook, setModalGuestBook] = useState(false);

  // 편지 새로 작성하기 버튼이 눌림 감지 변수
  const [isCreateGuestBookBtnClicked, setCreateGuestBookBtnClick] =
    useState(false);

  // 방명록 작성값
  const [guestInput, setGuestInput] = useState("");

  // 방명록 리스트
  const [guestBookList, setGuestBookList] = useState([]);

  // -----------------------------------------------
  // -----------------------------------------------
  // 사진

  // 추억관 사진첨부 모달창
  const [modalPhoto, setModalPhoto] = useState(false);

  // 추억관 사진 저장 State
  const [getPhoto, setPhoto] = useState("");

  // 사진 출력 관련 Url이 담길 State
  const [getUrl, setUrl] = useState("");

  // 서버로부터 받아온 사진들이 담겨 있을 배열
  const [photoList, setPhotoList] = useState([]);

  // 사진 삭제 메뉴 버튼 관련 State
  const [isphotoBtnClicked, setPhotoBtn] = useState(false);

  // 사람 움직임 변수

  // 좌우
  const [isRight, setIsRight] = useState(true);

  // 움직임
  const [isMove, setIsMove] = useState(false);

  // 날씨, 시간
  let today = new Date();

  // 날씨
  const [curWeather, setWeather] = useState(0);

  // 시간
  const [curHour, setHour] = useState(0);

  // 위도
  const [lad, setLad] = useState(0);

  // 경도
  const [lon, setLon] = useState(0);

  // 현재 시간에 해당하는 하늘 배경 색이 담긴 배열
  const timeColor = [
    [57, 79, 82],
    [68, 92, 97],
    [79, 105, 112],
    [90, 118, 127],
    [101, 131, 142],
    [112, 144, 157],
    [123, 157, 172],
    [134, 170, 187],
    [145, 183, 202],
    [156, 196, 217],
    [167, 209, 232],

    [178, 222, 253],

    [167, 209, 232],
    [156, 196, 217],
    [145, 183, 202],
    [134, 170, 187],
    [123, 157, 172],
    [112, 144, 157],
    [101, 131, 142],
    [90, 118, 127],
    [79, 105, 112],
    [68, 92, 97],
    [57, 79, 82],
  ];

  // 스크롤 이벤트

  // 특정 컴포넌트 위에서 스크롤이 감지 되면
  // e 를 통해 관련 메소드에 접근 할 수 있다.
  const scrollMove = (e) => {
    // 스크롤이 감지 되면 wheelDelta 값이 120 또는 -120 으로 계속 변경된다.
    let E = e.nativeEvent.wheelDelta;

    setScrollX(e.nativeEvent.pageX);

    // 이 값이 120 이면 wheelDown
    if (E === 120) {
      setIsRight(true);
      setIsMove(!isMove);

      // 왼쪽으로 화면 이동
      window.scrollBy(-100, 10);

      setScrollX(scrollX - 30);
      if (scrollX < 0) {
        setScrollX(0);
      }
    }
    // 이 값이 -120 이면 wheelUp
    else {
      setIsRight(false);
      setIsMove(!isMove);

      // 오른쪽으로 화면 이동
      window.scrollBy(100, 10);
      setScrollX(scrollX + 30);
    }
  };
  const changePostInput = (e) => {
    setPostInput(e.target.value);
  };

  const changeGuestBookInput = (e) => {
    setGuestInput(e.target.value);
  };

  //우체통 클릭 이벤트
  const onClickPost = () => {
    setmodalPost(!modalPost);
    setCreatePostBtnClick(!modalPost);
    setPostInput("");
    getPostData();
  };

  // 편지 데이터를 가져오는 함수
  const getPostData = async () => {
    const config1 = {
      params: {
        planetToken: planetToken,
      },
    };

    // 편지 목록 가져오기
    await axios
      .get(`http://52.78.18.110:8000/viewletterlist`, config1)
      .then((res) => {
        // console.log(res);
        setPostList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 날씨 정보를 가져오는 부분
  const getWeather = () => {
    const pos = navigator.geolocation;
    pos.getCurrentPosition((position) => {
      setLad(position.coords.latitude);
      setLon(position.coords.longitude);
    });
    weatherApi();
  };

  const weatherApi = async () => {
    await axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lad}&lon=${lon}&appid=${API_KDY}&units=metric`
      )
      .then((res) => {
        console.log(res);
        let temp = res.data.weather[0].main;

        // 받아온 날씨 값으로 inex 를 설정하고
        // 해당 인덱스로 날씨 배열에 있는 아이콘을 출력한다.
        if (temp === "Clear") {
          setWeather(0);
        } else if (temp === "Rain") {
          setWeather(1);
        } else if (temp === "Snow") {
          setWeather(2);
        } else if (temp === "Clouds") {
          setWeather(3);
        } else if (temp === "Haze") {
          setWeather(4);
        } else if (temp === "Rain") {
          setWeather(5);
        } else if (temp === "Dust") {
          setWeather(6);
        } else if (temp === "RainTunderstrom") {
          setWeather(7);
        } else {
          setWeather(0);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(curWeather);
    if (!isLoading) {
      alert("날씨 업데이트 성공");
    }
  };

  // 행성 내부 기본 정보를 받아오는 함수
  const getData = async () => {
    setHour(today.getHours());
    const config1 = {
      params: {
        planetToken: planetToken,
      },
    };

    await axios
      .get(`http://52.78.18.110:8000/enterplanet`, config1)
      .then((res) => {
        // console.log(res);

        setCustomItem(res.data.customizeList);
        dispatch(
          newItem({
            newItem: res.data.customizeList,
          })
        );
        setPhotoList(res.data.memories);
        setIsOwner(res.data.planetOwner);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
      });
  };

  // 수정 환경으로 변경
  const onClickSetting = () => {
    setEditor(!isOpenEditor);
  };

  // 아이템 추가 관련
  const onClickEditor = () => {
    setEditorMenu(!isOpenEditorMenu);
  };

  // 아이템 수정 관련
  const onClickEditorModify = () => {
    setEditorModi(!EditorModi);
  };

  // 저장버튼 helper
  const onClickEditorSaveHelp = async () => {
    if (newTempItem.x != undefined) {
      await dispatch(
        addItem({
          addItem: newTempItem,
        })
      );
    }
  };

  //저장 버튼
  const onCLickEditorSave = async () => {
    if (newTempItem.x === undefined) {
      alert("저장된 값이 없습니다.");
    } else {
      await dispatch(
        addItem({
          addItem: newTempItem,
        })
      );

      const config = {
        planetToken: planetToken,
        userToken: userToken,
        customize: item,
        planetOwner: isOwner,
      };

      await axios
        .put(`http://52.78.18.110:8000/innercustomize`, config)
        .then((res) => {
          dispatch(
            tempNewItem({
              item: { data: "x" },
            })
          );

          // console.log(res);
          console.log("커스터마이징 저장 성공");

          state.history.go(0);
        })
        .catch((err) => {
          console.log("커스터마이징 저장 실패");
          console.log(err);
          console.log(err.response);
        });
    }
  };

  const itemClick = (e) => {
    let temp = e.target.className.slice(12, 20);
    if (curItem === "") {
      setCurItem(temp);
      setIsClickedItem(!isClickedItem);

      setNewItemData(temp);
    } else {
      if (curItem === temp) {
        setIsClickedItem(!isClickedItem);
        setCurItem("");
      } else {
        setCurItem(temp);
        setNewItemData(temp);
      }
    }
  };

  const CreatePostBtnClick = () => {
    setCreatePostBtnClick(!isCreatePostBtnClicked);
    setPostInput("");
  };

  const onClickPostInputBtn = async () => {
    const config = {
      planetToken: planetToken,
      content: postInput,
      planetOwner: isOwner,
    };
    await axios
      .post(`http://52.78.18.110:8000/createletter`, config)
      .then((res) => {
        // console.log(res);
        console.log("편지 작성 성공");
        getPostData();
        setCreatePostBtnClick(!isCreatePostBtnClicked);
        setPostInput("");
      })
      .catch((err) => {
        console.log("편지 작성 실패");
        console.log(err);
        console.log(err.response);
      });
  };

  // 방명록 관련
  const onClickGuestBook = () => {
    setModalGuestBook(!modalGuestBook);
    setCreateGuestBookBtnClick(!modalGuestBook);
    getGuestBookData();
  };

  const CreateGuestBookBtnClick = () => {
    setCreateGuestBookBtnClick(!isCreateGuestBookBtnClicked);
    setGuestInput("");
  };

  const getGuestBookData = async () => {
    const config = {
      params: {
        planetToken: planetToken,
      },
    };

    await axios
      .get(`http://52.78.18.110:8000/viewguestbook`, config)
      .then((res) => {
        // console.log(res);
        console.log("방명록 데이터 조회 성공");
        setGuestBookList(res.data.guestBook);
      })
      .catch((err) => {
        console.log("방명록 데이터 조회 실패");
        console.log(err);
        console.log(err.response);
      });
  };

  // 사진 추가 부분
  const onClickaddPhoto = () => {
    if (isOwner === true) {
      setModalPhoto(!modalPhoto);
    } else {
      alert("이미지 추가는 행성 주인만 할 수 있습니다.");
    }
  };

  const onClickPhoto = () => {
    setModalPhoto(!modalPhoto);
    setPhoto("");
  };

  // 방명록 작성 확인 버튼
  const onClickGuestBookInputBtn = async () => {
    const config = {
      planetToken: planetToken,
      content: guestInput,
    };
    await axios
      .post(`http://52.78.18.110:8000/createguestbook`, config)
      .then((res) => {
        // console.log(res);
        console.log("방명록 작성 성공");
        getGuestBookData();
        setCreateGuestBookBtnClick(!isCreateGuestBookBtnClicked);
        setGuestInput("");
      })
      .catch((err) => {
        console.log("방명록 작성 실패");
        console.log(err);
        console.log(err.response);
      });
  };

  // input의 사진 입력값을 미리보기 화면에 띄우기 위한 함수
  const changePhoto = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    console.log(file);
    reader.onloadend = () => {
      setPhoto(file);
      setUrl(reader.result);
    };

    reader.readAsDataURL(file);
  };

  // 추억관 사진 업로드
  const photoBtnOkClicked = async () => {
    if (getPhoto === "") {
      alert("이미지가 없습니다.");
    } else {
      let formData = new FormData();
      formData.append("planetToken", planetToken);
      formData.append("userToken", userToken);
      formData.append("image", getPhoto);
      formData.append("planetOwner", isOwner);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      await axios
        .post(`http://52.78.18.110:8000/memories`, formData, config)
        .then((res) => {
          //console.log(res);
          console.log("이미지 업로드 성공");
          setPhoto("");
          setModalPhoto(!modalPhoto);
          getData();
        })
        .catch((err) => {
          console.log("이미지 업로드 실패");
          console.log(err);
          console.log(err.response);
        });
    }
  };

  // 추억관 사진 삭제
  const photoDelBtnClicked = async (e) => {
    let idx = `${e.target.parentNode.parentNode.children[2].className}`;

    idx = idx.slice(10, 20);

    const config = {
      params: {
        planetToken: planetToken,
        deleteImage: photoList[idx],
        planetOwner: isOwner,
      },
    };

    await axios
      .delete(`http://52.78.18.110:8000/memorydelete`, config)
      .then((res) => {
        // console.log(res);
        console.log("이미지 삭제 성공");
        getData();
      })
      .catch((err) => {
        console.log("이미지 삭제 실패");
        console.log(err);
        console.log(err.response);
      });
  };

  const onClickeditorPhotoDelBtn = () => {
    setPhotoBtn(!isphotoBtnClicked);
  };

  const onClickeditorCharacterBtn = () => {
    setChracter(!isChracterClicked);
  };

  // 날씨 api 동작.
  const onClickeditorWeatherBtn = () => {
    getWeather();
  };

  // 행성 내부로 들어오면 초기에 행성 데이터와 날씨 정보를 받아온다
  useEffect(() => {
    getData();
    getWeather();
  }, []);

  return (
    <div className="container">
      {isLoading ? (
        <PlanetInsideLoader />
      ) : (
        <div className="subContainer">
          {/* 홈 버튼 */}
          <div className="HomebtnContainer">
            <HomeBtn />
          </div>
          {/* 날씨 아이콘*/}
          <div
            className="weatherIconContainer"
            onClick={onClickeditorWeatherBtn}
          >
            <img src={weatherIconArr[curWeather].icon} />
          </div>
          {/* 수정 환경 전환 컨테이너 */}

          {/* 커스터마이징 메뉴는 행성 주인만 할 수 있도록. */}
          {isOwner ? (
            <div className="planetNavbar">
              {/* 수정 환경으로 전환. */}
              <div className="editorWindow" onClick={onClickSetting}>
                {isOpenEditorMenu === true ||
                EditorModi === true ||
                isphotoBtnClicked === true ? (
                  <div className="redDot"></div>
                ) : (
                  <div className="noDot"></div>
                )}
                <img className="editorWindowBtn" src={setting} />
              </div>
            </div>
          ) : null}

          {/* 커스터마이징 관련 메뉴가 담긴 컨테이너 */}
          <div
            className={
              isOpenEditor
                ? "editorSideBar editorSideBarOpen"
                : "editorSideBar editorSideBarClose"
            }
          >
            {/* 아이템 추가 메뉴 버튼 */}
            {/* 새로운 아이템을 추가 할 수 있는 커스터마이징 기능이 활성화 된다 */}
            <div>
              {isOpenEditorMenu ? (
                <div className="redDot"></div>
              ) : (
                <div className="noDot"></div>
              )}
              <div
                className={
                  isOpenEditorMenu
                    ? "editorBtn editorBtnOpen"
                    : "editorBtn editorBtnClose"
                }
                onClick={onClickEditor}
              >
                ITEM
              </div>
            </div>
            {/* 기존 아이템 변경 버튼 */}
            {/* 커스터마이징한 아이템들의 위치, 삭제 기능이 활성화 된다 */}
            <div>
              {EditorModi ? (
                <div className="redDot"></div>
              ) : (
                <div className="noDot"></div>
              )}
              <div className="editorModifyBtn" onClick={onClickEditorModify}>
                CUSTOM
              </div>
            </div>

            {/* 저장 버튼 */}
            {/* 새 아이템을 추가한 경우 저장 버튼을 눌러 변경 사항을 저장하고 화면을 새로고침한다. */}
            <div>
              <div className="noDot"></div>
              <div
                className="editorSaveBtn"
                onMouseDown={onClickEditorSaveHelp}
                onClick={onCLickEditorSave}
              >
                SAVE
              </div>
            </div>

            {/* 추억관 이미지 삭제 관리 버튼 */}
            {/* 이미지 삭제 버튼이 활성화 된다 */}
            <div>
              {isphotoBtnClicked ? (
                <div className="redDot"></div>
              ) : (
                <div className="noDot"></div>
              )}

              <div
                className="editorPhotoDelBtn"
                onClick={onClickeditorPhotoDelBtn}
              >
                PHOTO
              </div>
            </div>

            {/* 캐릭터 변경 버튼 */}
            {/* 캐릭터를 남자 또는 여자 로 변경한다 */}
            <div>
              <div className="noDot"></div>
              <div
                className="editorCharacterBtn"
                onClick={onClickeditorCharacterBtn}
              >
                <div>CHRAC</div>
                {isChracterClicked ? (
                  <div className="editorCharacterBtnContent">Woman</div>
                ) : (
                  <div className="editorCharacterBtnContent">Man</div>
                )}
              </div>
            </div>

            {/* 날씨 버튼 */}
            {/* 날씨정보를 다시 불러온다 */}
            <div>
              <div className="noDot"></div>
              <div
                className="editorWeatherBtn"
                onClick={onClickeditorWeatherBtn}
              >
                <div className="editorWeatherBtnContent">WEA</div>
                <div className="editorWeatherBtnContent">THER</div>
              </div>
            </div>
          </div>

          {/* 커스터마이징 아이템이 담긴 박스 영역 */}
          <div
            className={
              isOpenEditorMenu
                ? "editorContainer editorContainerOpen"
                : "editorContainer editorContainerClose"
            }
          >
            {/* 커스터마이징 메뉴가 담긴 editor 배열의 아이템 이미지를 반복문을 통해 출력한다 */}
            {editor.map((edit, index) => (
              <div className={`edititem`} onClick={itemClick} key={index}>
                <img className={`itemImg ${edit.str}`} src={edit.name} />
              </div>
            ))}
          </div>

          {/* 행성 내부 아이템 영역 */}
          <div
            className="contentsContainer"
            onWheel={scrollMove}
            ref={contentsContainerRef}
          >
            {/* 외부 하늘 영역 */}
            <div
              className="sky"
              style={{
                backgroundColor: `rgb(175,222,253)`,
              }}
            ></div>
            {/* 외부 땅 영역 */}
            <div className="land"></div>

            {/* 추억관 내부 천장 영역 */}
            <div className="skyInside"></div>

            {/* 추억관 내부 바닥 영역 */}
            <div className="landInside"></div>

            {/* 추억관 입구 부분 사선으로 이어지는 영역 */}
            <div className="subland1"></div>
            <div className="subland2"></div>

            {/* 우체통 이미지 */}
            <img className="post" src={post} onClick={onClickPost} />

            {/* 방명록 작성 아이콘 이미지 */}
            <img
              className="guestBook1"
              onClick={onClickGuestBook}
              src={dashBoard1}
            />
            <img
              className="guestBook2"
              onClick={onClickGuestBook}
              src={dashBoard2}
            />

            {/* 추억관 입구 이미지 */}
            <img className="enterDoorLeft" src={enterDoorLeft} />
            <img className="enterDoorRight" src={enterDoorRight} />

            {/* 사진 출력 */}
            <div className="PhotoListContainer">
              {/* 사진 정보가 담긴 배열을 반복문을 이용해 여러개를 출력한다 */}
              {photoList.map((photo, index) => (
                <div className="photoContainer">
                  <div className="photoDelBtnContainer">
                    {isphotoBtnClicked ? (
                      <img
                        className="photoDelBtn"
                        onClick={photoDelBtnClicked}
                        src={X1}
                      />
                    ) : null}
                  </div>
                  <img className="frame" src={frame} />
                  <img
                    className={"photoList " + index}
                    src={`http://52.78.18.110:8000/${photo}`}
                  />
                </div>
              ))}
              {/* 사진 추가 영역*/}
              {/* 마지막 사진 옆에 사진을 추가할 수 있는 아이콘을 출력한다 */}
              <img
                className="addPicture"
                src={adderFrame}
                onClick={onClickaddPhoto}
              />
            </div>

            {/* 사람*/}
            {/* 현재 스크롤에 따라 좌우 인지, 캐릭터 변경 버튼의 눌림을 감지해서 남자인지 여자인지 구분해서 출력한다 */}
            {/* 삼항 연산자를 이용해 구현되었다 */}
            {isRight ? (
              <div>
                {isChracterClicked ? (
                  <img
                    className="human"
                    src={isMove ? WomanRightthree : WomanRightfour}
                  />
                ) : (
                  <img
                    className="human"
                    src={isMove ? ManLeftthree : ManLeftfour}
                  />
                )}
              </div>
            ) : (
              <div>
                {isChracterClicked ? (
                  <img
                    className="human"
                    src={isMove ? WomanLeftone : WomanLefttwo}
                  />
                ) : (
                  <img
                    className="human"
                    src={isMove ? ManRightone : ManRighttwo}
                  />
                )}
              </div>
            )}

            {/* 새로 추가될 아이템에 대한 컴포넌트*/}
            {/* 특정 아이템이 선택되면 보이도록 삼항연산자를 이용해서 구현되었음 */}
            {/* NewItem 컴포넌트를 출력한다 */}
            {isClickedItem ? <NewItem data={newItemData} /> : null}

            {/* 사용자가 커스터마이징한 아이템에 대한 정보가 담긴 배열을 TreeItem 컴포넌트에
            전달해서 반복문을 통해 출력한다 */}
            {customItem.map((item, index) => (
              <TreeItem
                key={index}
                modiVar={EditorModi}
                data={item}
                scroll={scrollX}
                isOwner={isOwner}
              />
            ))}
          </div>
        </div>
      )}

      {/* 편지 작성 Modal */}
      {modalPost ? (
        <div className="postModalcontainer">
          <div className="Modal">
            {/* 상단바 부분 */}
            <div className="topBar">
              <img className="closebtnImg" onClick={onClickPost} src={close} />
            </div>
            {/* 내용 부분(작성 편지 보기, 편지 작성하기)이 보여질 부분 */}
            <div className="postContentsContainer">
              {/* 편지 작성 버튼 */}
              <div className="createPostBtnContainer">
                {isOwner ? (
                  <div className="createPostBtn" onClick={CreatePostBtnClick}>
                    {isCreatePostBtnClicked ? "NEW" : "BACK"}
                  </div>
                ) : null}
              </div>
              {/* 조회된편지들을 볼 수 있는 영역 */}
              <div
                className={
                  isCreatePostBtnClicked ? "showPostOn" : "showPostOff"
                }
              >
                {postList.map((dum, index) => (
                  <PostList
                    key={index}
                    title={dum.content}
                    time={dum.date}
                    id={dum.letterId}
                    planetOwner={isOwner}
                  />
                ))}
              </div>

              {/* 작성 영역*/}
              <div
                className={
                  isCreatePostBtnClicked ? "writePostOff" : "writePostOn"
                }
              >
                <textarea
                  className="postInput"
                  value={postInput}
                  onChange={changePostInput}
                />
                <div className="PostInputBtn" onClick={onClickPostInputBtn}>
                  POST
                </div>
              </div>
            </div>
          </div>

          {/* 모달창 외부영역 누르면 모달창 꺼지도록. */}
          <div className="Modaloutside" onClick={onClickPost}></div>
        </div>
      ) : null}

      {/* 방명록 작성 Modal */}
      {modalGuestBook ? (
        <div className="GuestBookModalContainer">
          <div className="Modal">
            {/* 상단바 부분 */}
            <div className="topBar">
              <img
                className="closebtnImg"
                onClick={onClickGuestBook}
                src={close}
              />
            </div>
            <div className="postContentsContainer">
              {/* 방명록 작성 버튼 */}
              <div className="createPostBtnContainer">
                <div
                  className="createGuestBookBtn"
                  onClick={CreateGuestBookBtnClick}
                >
                  {isCreateGuestBookBtnClicked ? "NEW" : "BACK"}
                </div>
              </div>

              {/* 조회된 방명록들을 볼 수 있는 영역 */}
              <div
                className={
                  isCreateGuestBookBtnClicked
                    ? "showGuestBookOn"
                    : "showGuestBookOff"
                }
              >
                {guestBookList.map((item, index) => (
                  // GuestBookList 컴포넌트에 배열에 담긴 값들을 전달해서 반복문으로 여러개를 출력한다
                  <GuestBookList
                    key={index}
                    content={item.content}
                    userNickname={item.userNickname}
                    date={item.date}
                    index={item.index}
                    planetOwner={isOwner}
                  />
                ))}
              </div>

              {/* 작성 영역 */}
              <div
                className={
                  isCreateGuestBookBtnClicked
                    ? "writeshowGuestOff"
                    : "writeshowGuesttOn"
                }
              >
                <textarea
                  className="postInput"
                  value={guestInput}
                  onChange={changeGuestBookInput}
                />
                <div
                  className="PostInputBtn"
                  onClick={onClickGuestBookInputBtn}
                >
                  DONE
                </div>
              </div>
            </div>
          </div>
          <div className="Modaloutside" onClick={onClickGuestBook} />
        </div>
      ) : null}

      {/* 사진 추가 Modal */}
      {modalPhoto ? (
        <div className="addPhotoContainer">
          <div className="Modal">
            {/* 상단바 부분 */}
            <div className="topBar">
              <img className="closebtnImg" onClick={onClickPhoto} src={close} />
            </div>
            {/* 내용 부분 */}
            <div className="addPhotoContentsContainer">
              {/* 미리보기 영역 */}
              {/* 사진이 없으면 미리보기 라는 텍스트가, 사진이 있으면 선택 사진이 보여진다 */}
              <div className="PreviewAreaContinaer">
                {getPhoto === "" ? (
                  <div className="noImg">미리보기</div>
                ) : (
                  <img className="imgPreview" src={getUrl} />
                )}
              </div>
              <div className="photoBtnContainer">
                <input
                  className="photoInput"
                  type="file"
                  accept="image/jpg, image/png, image/jpeg, image/gif"
                  name="image"
                  onChange={changePhoto}
                />
                <div
                  className="photoBtnOkContainer"
                  onClick={photoBtnOkClicked}
                >
                  <img className="photoBtnOk" src={okIcon} />
                </div>
              </div>
            </div>
          </div>
          <div className="Modaloutside" onClick={onClickPhoto} />
        </div>
      ) : null}
    </div>
  );
};

export default MyPlanetInside;
