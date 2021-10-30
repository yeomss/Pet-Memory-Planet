import "../../styles/MyPlanet.scss";
import { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { tempNewItem } from "../../actions/item";

import tree1 from "../../styles/images/SVG/tree1.svg";
import tree2 from "../../styles/images/SVG/tree2.svg";
import tree3 from "../../styles/images/SVG/tree3.svg";
import tree4 from "../../styles/images/SVG/tree4.svg";
import tree5 from "../../styles/images/SVG/newTree1.svg";
import tree6 from "../../styles/images/SVG/newTree2.svg";
import tree7 from "../../styles/images/SVG/newTree3.svg";

const NewItem = ({ data }) => {
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
  const [curName, setCurName] = useState(data);

  const newItemRef = useRef(null);
  let curX = 0;
  let curY = 0;

  // 컴포넌트가 생성되면서 새로 만들 아이템에 대해 이벤트를 등록한다.
  const init = () => {
    const classNewItem = newItemRef.current;

    const container = classNewItem.parentNode;

    let isClicked = false;

    if (classNewItem != null && container != null) {
      classNewItem.addEventListener("mousedown", function (e) {
        isClicked = true;
        curX = e.offsetX;
        curY = e.offsetY;
      });

      classNewItem.addEventListener("mouseup", function (e) {
        isClicked = false;

        dispatch(
          tempNewItem({
            item: {
              kind: curName,
              x: classNewItem.offsetLeft,
              y: classNewItem.offsetTop,
            },
          })
        );
      });

      classNewItem.addEventListener("mousemove", function (e) {
        if (isClicked === true) {
          classNewItem.style.left =
            classNewItem.offsetLeft + (e.offsetX - curX) + "px";
          classNewItem.style.top =
            classNewItem.offsetTop + (e.offsetY - curY) + "px";
        }
      });
    }
  };

  // 아이템 위치가 변경 될 때 마다 위치정보를 리덕스에 저장한다
  const changed = () => {
    const classNewItem = newItemRef.current;
    setCurName(classNewItem.innerHTML);
    dispatch(
      tempNewItem({
        item: {
          kind: data,
          x: classNewItem.offsetLeft,
          y: classNewItem.offsetTop,
        },
      })
    );
  };

  useEffect(() => {
    // 아이템 박스 이벤트 리스너 등록 단계
    init();
    return changed();
  }, [data]);

  useEffect(() => {
    changed();
    return changed();
  }, [data]);

  return (
    // 새 아이템 컴포넌트 컨테이너
    <div className="NewItemContainer" ref={newItemRef}>
      {/* 선택 아이템을 이미지로 보여줄 영역 */}
      <img className="newItem" src={editor[data - 1].name} />
    </div>
  );
};

export default NewItem;
