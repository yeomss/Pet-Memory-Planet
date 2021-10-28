import "../../styles/MyPlanet.scss";
import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, checkChange, tempNewItem } from "../../actions/item";

import tree1 from "../../styles/images/SVG/tree1.svg";
import tree2 from "../../styles/images/SVG/tree2.svg";
import tree3 from "../../styles/images/SVG/tree3.svg";
import tree4 from "../../styles/images/SVG/tree4.svg";
import tree5 from "../../styles/images/SVG/newTree1.svg";
import tree6 from "../../styles/images/SVG/newTree2.svg";
import tree7 from "../../styles/images/SVG/newTree3.svg";

/*
innercustomize
여기에 
받은대로 전달.
[
    [

    ]
]
*/

const NewItem = ({data}) => {

    const editor = [
        {
            name:tree1,
            str:"tree1"
        },
        {
            name:tree2,
            str:"tree2"
        },
        {
            name:tree3,
            str:"tree3"
        },
        {
            name:tree4,
            str:"tree4"
        },
        {
            name:tree5,
            str:"tree5"
        },
        {
            name:tree6,
            str:"tree6"
        },
        {
            name:tree7,
            str:"tree7"
        },
    ]

    const dispatch = useDispatch();
    const [curName, setCurName] = useState(data);

    const newItemRef = useRef(null);
    let curX = 0;
    let curY = 0;

    const init = () => {
        console.log("뭔데");
        console.log(data);
        const classNewItem = newItemRef.current;

        const container = classNewItem.parentNode;
              
        let isClicked = false;
        
        if(classNewItem != null && container != null) {
            classNewItem.addEventListener("mousedown", function(e) {
                isClicked = true;
                curX = e.offsetX;
                curY = e.offsetY;
            });
            
            classNewItem.addEventListener("mouseup", function(e) {
                isClicked = false;
                
                //전달 해야할 값.
                dispatch(tempNewItem({
                    item : {kind: curName, x:classNewItem.offsetLeft, y:classNewItem.offsetTop }
                }))
            });

            classNewItem.addEventListener("mousemove", function(e) {
                if(isClicked === true) {

                    //화면 내에서 위치
                    //console.log(e.clientY - e.offsetY);
                    classNewItem.style.left = classNewItem.offsetLeft + (e.offsetX - curX) +"px";
                    classNewItem.style.top = classNewItem.offsetTop + (e.offsetY - curY) + "px";
                }
            })
            
        }
    };

    const changed = () => {
        const classNewItem = newItemRef.current;
        // console.log(classNewItem.innerHTML);
        setCurName(classNewItem.innerHTML);
        dispatch(tempNewItem({
            item : {kind: data, x:classNewItem.offsetLeft, y:classNewItem.offsetTop }
        }))
    }

    useEffect(()=> {

        // 아이템 박스 이벤트 리스너 등록 단계
        init();
    },[data])

    useEffect(()=> {
        // console.log("단순변화");
        changed();
    },[data])

    return(
        <div className="NewItemContainer" ref={newItemRef}>
            <img className="newItem" src={editor[data-1].name}/>
        </div>
    )
}

export default NewItem;