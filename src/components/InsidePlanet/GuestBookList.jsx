import "../../styles/MyPlanet.scss";
import { useRef, useEffect, useState } from "react";
import axios from "axios";
import {Card} from "react-bootstrap";
import X1 from "../../styles/images/SVG/X1.svg";

const GuestBookList = ({content,userNickname,date,index,planetOwner}) => {
    // 행성 토큰

    const planetToken = sessionStorage.getItem("planetToken");

    const guestBookListRef = useRef(null);

    const guestBookDelBtnClick = async() => {
        let classGuestBookList = guestBookListRef.current;
        console.log(typeof(index));
        const config = {
            params:{
                planetToken:planetToken,
                index:index,
                planetOwner:planetOwner
            }
        }
        await axios.delete(`http://52.78.18.110:8000/deleteguestbook`,config)
        .then((res)=>{
            console.log(res);
            classGuestBookList.remove();
        })
        .catch((err)=>{
            console.log(err);
            console.log(err.response);
            if(err.response.status === 401) {
                alert("삭제는 본인만 할 수 있습니다.")
            }
        })
    };

    return(
        <div className="guestBookList" ref={guestBookListRef}>
            <div className="guestBookUserNickName">
                작성자 : {userNickname}
                {/* <div className="guestBookDelBtn" onClick={guestBookDelBtnClick}></div> */}
                <img className="guestBookDelBtn" onClick={guestBookDelBtnClick} src={X1}/>
            </div>
            <div className="divider"></div>
            <div className="guestBookContent">
                {content}
            </div>
            <div className="guestBookDate">
                작성일자 : {date.slice(0, 10)} 
            </div>
        </div>
    )
}

export default GuestBookList;