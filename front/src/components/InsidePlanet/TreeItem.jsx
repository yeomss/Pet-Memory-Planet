import "../../styles/MyPlanet.scss";
import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { delItem, modiItem } from "../../actions/item";
import axios from "axios";

// import CustomIcon from "../../styles/images/SVG/CustomIcon2.svg"
import CustomIcon from "../../styles/images/CustomIcon.png";
import X1 from "../../styles/images/SVG/X1.svg";

import tree1 from "../../styles/images/SVG/tree1.svg";
import tree2 from "../../styles/images/SVG/tree2.svg";
import tree3 from "../../styles/images/SVG/tree3.svg";
import tree4 from "../../styles/images/SVG/tree4.svg";
import tree5 from "../../styles/images/SVG/newTree1.svg";
import tree6 from "../../styles/images/SVG/newTree2.svg";
import tree7 from "../../styles/images/SVG/newTree3.svg";

const TreeItem = ({ state, modiVar, data, scroll, isOwner }) => {
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

  const dispatch = useDispatch();
  const itemss = useSelector((state) => state.item.items);
  console.log(itemss);

  //컨트롤러
  const controllerRef = useRef(null);
  let classController = null;

  const delControllerRef = useRef(null);
  let classDelController = null;
  //아이템
  const itemRef = useRef(null);
  let classitem = null;

  let isClicked = false;

  let parent = null;

  const [delCount, setDelCount] = useState(true);

  const planetToken = sessionStorage.getItem("planetToken");
  const userToken = sessionStorage.getItem("userToken");

  // 아이템 스타일
  const ContainerStyle = {
    top: data.y + "px",
    left: data.x + "px",

    width: 200 + "px",
    height: 400 + "px",
  };

  const itemStyle = {
    position: "absolute",
    width: "auto",
    height: 400 + "px",
    zIndex: 3,
    margin: 0 + "px",
  };

  // 초기화 함수.
  // 이벤트 리스너의 등록.
  // 드래그앤 드롭 이벤트를 등록한다
  const init = () => {
    classController = controllerRef.current;
    classDelController = delControllerRef.current;
    classitem = itemRef.current;

    const Container = classController.parentNode.parentNode.parentNode;
    parent = classController.parentNode.parentNode;
    parent.style.height =
      parent.offsetHeight + classController.offsetHeight + "px";

    classController.addEventListener("mousedown", function (e) {
      isClicked = true;
    });

    classController.addEventListener("mousemove", function (e) {});

    classController.addEventListener("mouseup", function (e) {
      isClicked = false;

      dispatch(
        modiItem({
          item: {
            kind: data.kind,
            x: parent.offsetLeft,
            y: parent.offsetTop,
            idx: data.index,
          },
        })
      );

      const config = {
        planetToken: planetToken,
        userToken: userToken,
        customize: itemss,
      };

      dispatch(
        modiItem({
          item: {
            kind: data.kind,
            x: parent.offsetLeft,
            y: parent.offsetTop,
            idx: data.index,
          },
        })
      );

      const config1 = {
        planetToken: planetToken,
        userToken: userToken,
        customize: itemss,
      };

      axios
        .put(`http://52.78.18.110:8000/innercustomize`, config1)
        .then((res) => {
          console.log(res);
          console.log(itemss);
        })
        .catch((err) => {
          console.log(err);
        });
    });

    // 전체 화면에 대한 마우스 움직임 이벤트
    // 여기에 컨트롤러랑 아이템 움직이는 코드 들어감.(컨트롤러를 벗어나도 계속 따라옴.)
    Container.addEventListener("mousemove", function (e) {
      if (isClicked === true) {
        Container.style.cursor = "grabbing";
        parent.style.top = e.clientY - classController.offsetHeight / 2 + "px";
        parent.style.left =
          e.clientX + (e.pageX - e.screenX) - parent.offsetWidth / 2 + "px";
      }
    });

    // 마우스를 떼면 isClicked 변수 값을 바꿔서 이벤트 적용 X
    Container.addEventListener("mouseup", function (e) {
      isClicked = false;
      Container.style.cursor = "default";
    });
  };

  // 아이템 삭제 기능
  const onClickDel = async (e) => {
    classController = controllerRef.current;
    classDelController = delControllerRef.current;
    classitem = itemRef.current;
    parent = classController.parentNode.parentNode;

    console.log(parent);
    console.log(classitem);
    console.log(state);
    parent.style.display = "none";

    // 리덕스에 저장된 배열에도 삭제
    setDelCount(!delCount);
    dispatch(
      delItem({
        item: classitem.className,
      })
    );

    const config = {
      planetToken: planetToken,
      userToken: userToken,
      customize: itemss,
      planetOwner: isOwner,
    };

    //백엔드 통신
    await axios
      .put(`http://52.78.18.110:8000/innercustomize`, config)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
      });
  };

  // 아이템 위치 변경
  // 변경된 위치 값을 리덕스에 저장
  const onClickModiHelp = () => {
    classController = controllerRef.current;
    parent = classController.parentNode.parentNode;
    dispatch(
      modiItem({
        item: {
          kind: data.kind,
          x: parent.offsetLeft,
          y: parent.offsetTop,
          idx: data.index,
        },
      })
    );
  };

  const onClickDelHelp = () => {
    classitem = itemRef.current;
    dispatch(
      delItem({
        item: classitem.className,
      })
    );
  };

  useEffect(() => {
    // 이벤트 리스너의 등록.
    init();
  }, []);

  return (
    <div className="treeContainer" style={ContainerStyle}>
      <div className="ControllerNavBar">
        <div className="dummyController" />
        <img
          src={CustomIcon}
          className={
            modiVar ? "Controller ControllerOn" : "Controller  ControllerOff"
          }
          ref={controllerRef}
          onMouseDown={onClickModiHelp}
        />
        <img
          src={X1}
          className={
            modiVar
              ? "ControllerDel ControllerDelOn"
              : "ControllerDel  ControllerDelOff"
          }
          ref={delControllerRef}
          onMouseDown={onClickDelHelp}
          onClick={onClickDel}
        />
      </div>
      {/* <div className={data.kind} ref={itemRef} style={itemStyle}></div> */}
      <img
        src={editor[data.kind - 1].name}
        className={data.kind}
        ref={itemRef}
        style={itemStyle}
      />
    </div>
  );
};

export default TreeItem;
