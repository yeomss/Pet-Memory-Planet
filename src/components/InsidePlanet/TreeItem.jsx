import "../../styles/MyPlanet.scss";
import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { delItem, modiItem } from "../../actions/item";
import axios from "axios";

// import CustomIcon from "../../styles/images/SVG/CustomIcon2.svg"
import CustomIcon from "../../styles/images/CustomIcon.png"
import X1 from "../../styles/images/SVG/X1.svg"

import tree1 from "../../styles/images/SVG/tree1.svg";
import tree2 from "../../styles/images/SVG/tree2.svg";
import tree3 from "../../styles/images/SVG/tree3.svg";
import tree4 from "../../styles/images/SVG/tree4.svg";
import tree5 from "../../styles/images/SVG/newTree1.svg";
import tree6 from "../../styles/images/SVG/newTree2.svg";
import tree7 from "../../styles/images/SVG/newTree3.svg";


const TreeItem = ({state,modiVar,data, scroll, isOwner}) => {

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

   //  const [isClicked, setClick] = useState(false);
    // 스타일
    const ContainerStyle = {
        top : data.y + "px",
        left : data.x + "px",

        width : 200 + "px",
        height : 400 + "px",

    }

    const itemStyle = {
        position: "absolute",
        width: "auto",
        height: 400 + "px",
        zIndex: 3,
        margin: 0 + "px"
    }

    /*
        작동 방식
        컨트롤러 위에 마우스 클릭하면 특정 변수 변경  -> true
        if(true) {
            전체 화면 크기 내에서 onmouseMove 이벤트 등록
            마우스 움직이는 곳으로 나무와 컨트롤러의 위치 변경
        }

        else if(false) {
            
        }
    */

    // 초기화 함수.
    // 이벤트 리스너의 등록.
    const init = () => {
        classController = controllerRef.current;
        classDelController = delControllerRef.current;
        classitem=itemRef.current;
        /*
        let test = [
            {
                id:1
            },
            {
                id:2
            },
            {
                id:3
            }
            ,
            {
                id:3
            }
            ,
            {
                id:3
            },
            {
                id:2
            }
        ];
        
        let find = 3;

        const idx = test.findIndex(function(item) {return item.id === find})
        if(idx > -1)test.splice(idx,1);
        
        
        console.log(test);
        */
        
        const Container = classController.parentNode.parentNode.parentNode;
        parent = classController.parentNode.parentNode;
        parent.style.height = parent.offsetHeight + classController.offsetHeight + "px";

        classController.addEventListener("mousedown", function (e) {
            isClicked = true;
        })

        classController.addEventListener("mousemove",function(e) {
            // 컨트롤러 위에서 움직이도록 하면 컨트롤러를 벗어나는 경우 움직이지 않음.
            // if(isClicked===true){

            // }
        });

        classController.addEventListener("mouseup",function(e) {
            isClicked = false;

            console.log("클릭해제");

            // 이동이 끝나고
            console.log("왼쪽으로부터" + parent.offsetLeft);
            console.log("위에서" + parent.offsetTop);
            console.log(data.index);

            dispatch(modiItem({
                item: { kind:data.kind, x:parent.offsetLeft, y:parent.offsetTop, idx:data.index}
            }))

            const config = {
                planetToken: planetToken,
                userToken: userToken,
                customize:itemss
            };
        
            axios.put(`http://52.78.18.110:8000/innercustomize`,config)
            .then((res)=>{
                console.log(res);
                
                //tate.history.go(0);
            })
            .catch((err)=>{
                console.log(err);
            })  



        });

        // 전체 화면에 대한 마우스 움직임 이벤트
        // 여기에 컨트롤러랑 아이템 움직이는 코드 들어감.(컨트롤러를 벗어나도 계속 따라옴.)
        Container.addEventListener("mousemove",function(e) {
            // console.log(e);
            // console.log(e.x);
            if(isClicked===true){
                Container.style.cursor = "grabbing";
                parent.style.top = e.clientY - classController.offsetHeight/2 + "px";
                parent.style.left = e.clientX - parent.offsetWidth/2  + "px";
            }
        });

        Container.addEventListener("mouseup",function(e) {
            isClicked = false;
            Container.style.cursor = "default";
        });
    }

    const onClickDel = async(e) => {

        classController = controllerRef.current;
        classDelController = delControllerRef.current;
        classitem=itemRef.current;
        parent = classController.parentNode.parentNode;

        console.log(parent);
        console.log(classitem);
        console.log(state);
        parent.style.display = "none";
        setDelCount(!delCount);
        dispatch(delItem({
               item:classitem.className
        }));

        const config = {
            planetToken: planetToken,
            userToken: userToken,
            customize:itemss,
            planetOwner:isOwner
        };
    
        
        await axios.put(`http://52.78.18.110:8000/innercustomize`,config)
        .then((res)=>{
            console.log(res);
            
            //tate.history.go(0);
        })
        .catch((err)=>{
            console.log(err);
            console.log(err.response);
        })   
    };

    const onClickModiHelp = () => {
        classController = controllerRef.current;
        parent = classController.parentNode.parentNode;
        dispatch(modiItem({
            item: { kind:data.kind, x:parent.offsetLeft, y:parent.offsetTop, idx:data.index}
        }))
    }

    const onClickDelHelp = () => {
        classitem=itemRef.current;
        dispatch(delItem({
            item:classitem.className
     }));
    }

    useEffect(()=> {
        // 이벤트 리스너의 등록.
        init();
    },[])

    return(
    <div className="treeContainer" style={ContainerStyle}>
        <div className="ControllerNavBar">
            <div className="dummyController"/>
            <img src={CustomIcon} className={modiVar? ("Controller ControllerOn") : ("Controller  ControllerOff")}  ref={controllerRef} onMouseDown={onClickModiHelp}/>
            <img src={X1} className={modiVar? ("ControllerDel ControllerDelOn") : ("ControllerDel  ControllerDelOff")} ref={delControllerRef} onMouseDown={onClickDelHelp} onClick={onClickDel}/>
        </div>
       {/* <div className={data.kind} ref={itemRef} style={itemStyle}></div> */}
       <img src={editor[data.kind-1].name} className={data.kind} ref={itemRef} style={itemStyle}/>
    </div>
    )
};


export default TreeItem;