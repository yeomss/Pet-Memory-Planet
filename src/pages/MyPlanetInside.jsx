import { useRef, useEffect, useState } from "react";
import "../styles/MyPlanet.scss";
import PostList from "../components/InsidePlanet/PostList";
import close from "../styles/images/close.png"
import setting from "../styles/images/pngwing.com.png"
import axios from "axios";
import P5Wrapper from "react-p5-wrapper";
import particles from "../components/particles.js";
import TreeItem from "../components/InsidePlanet/TreeItem";
import NewItem from "../components/InsidePlanet/NewItem";

import { useDispatch, useSelector } from "react-redux";
import { addItem, newItem, tempNewItem } from "../actions/item";
import GuestBookList from "../components/InsidePlanet/GuestBookList";

import dashBoard1 from "../styles/images/SVG/dashBoard_sky.svg";
import dashBoard2 from "../styles/images/SVG/dashBoard_purple.svg";
import frame from "../styles/images/SVG/frame2.svg";
import adderFrame from "../styles/images/SVG/adderFrame.svg";
import post from "../styles/images/SVG/post.svg";

import one from "../styles/images/SVG/1.svg";
import two from "../styles/images/SVG/2.svg";
import three from "../styles/images/SVG/3.svg";
import four from "../styles/images/SVG/4.svg";
import X1 from "../styles/images/SVG/X1.svg"

import enterDoorRight from "../styles/images/SVG/enterDoorRight.svg"
import enterDoorLeft from "../styles/images/SVG/enterDoorLeft.svg"

import okIcon from "../styles/images/okIcon.png";

// 나무
import tree1 from "../styles/images/SVG/tree1.svg";
import tree2 from "../styles/images/SVG/tree2.svg";
import tree3 from "../styles/images/SVG/tree3.svg";
import tree4 from "../styles/images/SVG/tree4.svg";
import tree5 from "../styles/images/SVG/newTree1.svg";
import tree6 from "../styles/images/SVG/newTree2.svg";
import tree7 from "../styles/images/SVG/newTree3.svg";

const MyPlanetInside = (state) => {
    //리덕스

    // 아이템들 저장할 배열
    const item = useSelector((state)=> state.item.items);

    // 새로 추가한 아이템이 담겨있는 객체
    const newTempItem = useSelector((state)=> state.item.newTempItem);
    const dispatch = useDispatch();

    // 로딩
    const [isLoading, setisLoading] = useState(true);

    // 행성 토큰
    const planetToken = sessionStorage.getItem("planetToken");
    const userToken = sessionStorage.getItem("userToken");

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
    const [postInput,setPostInput] = useState("");

    // 편지 리스트
    const [postList, setPostList] = useState([]);

    //전체 컨텐츠 컨테이너 contentsContainer
    const contentsContainerRef = useRef(null);

    // 행성 주인임을 나타내는값을 저장할 변수
    const [isOwner, setIsOwner] = useState(false);

    // -----------------------------------------------
    // -----------------------------------------------
    // 방명록

    // 방명록 작성 모달창
    const [modalGuestBook, setModalGuestBook] = useState(false);

    // 편지 새로 작성하기 버튼이 눌림 감지 변수
    const [isCreateGuestBookBtnClicked, setCreateGuestBookBtnClick] = useState(false);

    // 방명록 작성값
    const [guestInput,setGuestInput] = useState("");

    // 방명록 리스트
    const [guestBookList, setGuestBookList] = useState([]);

    // -----------------------------------------------
    // -----------------------------------------------
    // 사진

    // 방명록 작성 모달창
    const [modalPhoto, setModalPhoto] = useState(false);

    const [getPhoto, setPhoto] = useState('');

    const [getUrl, setUrl] = useState('');

    const [photoList, setPhotoList] = useState([]);

    const [isphotoBtnClicked, setPhotoBtn] = useState(false);

    const [testImg, setImg] = useState('');

    // 사람 움직임 변수

    // 좌우
    const [isRight, setIsRight] = useState(true);

    // 움직임
    const [isMove, setIsMove] = useState(false);


    const changePostInput = (e) => {
        setPostInput(e.target.value);
    }

    const changeGuestBookInput = (e) => {
        setGuestInput(e.target.value);
    }

    //우체통 클릭 이벤트
    const onClickPost = () => {
        setmodalPost(!modalPost);
        setCreatePostBtnClick(!modalPost);
        setPostInput("");
        getPostData();

    };
    
    // 스크롤 이벤트
    // 마우스가 contents 위에 있을때만 작동. 
    const scrollMove = (e) => {
        let E = e.nativeEvent.wheelDelta
        // console.log(e.nativeEvent.pageX);
        // console.log(e.nativeEvent);

        setScrollX(e.nativeEvent.pageX);


        if(E === 120) {
            setIsRight(true);
            setIsMove(!isMove);

            window.scrollBy(-100,10);

            setScrollX(scrollX-30);
            if (scrollX < 0) {
                setScrollX(0);
            }
        }
        else {
            setIsRight(false);
            setIsMove(!isMove);

            window.scrollBy(100,10);
            setScrollX(scrollX + 30);
        }
    };

    const getPostData = async() => {
        const config1 = {
            params: {
              planetToken: planetToken,
            }
          };

        // 편지 목록 가져오기
        await axios.get(`http://52.78.18.110:8000/viewletterlist`, config1)
        .then((res)=>{
            // console.log(res);
            setPostList(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    };


    const getData = async() => {
        const config1 = {
            params: {
              planetToken: planetToken,
            }
        };

        //   기본 정보
        await axios.get(`http://52.78.18.110:8000/enterplanet`,config1)
        .then((res)=>{
            console.log(res);

            setCustomItem(res.data.customizeList);
            dispatch(newItem({
                newItem : res.data.customizeList
            }))
            setPhotoList(res.data.memories);
            // customItem.map((item,index) => (
            //     console.log(item)
            // ))

            setIsOwner(res.data.planetOwner);
            setisLoading(false);
            photoList.map((photo,index)=> {
                console.log(photo);
            });
        })
        .catch((err)=>{
            console.log(err);
            console.log(err.response)
        });       
    }

    // 수정 환경으로 변경
    const onClickSetting = () => {
        setEditor(!isOpenEditor);
    }

    // 아이템 추가 관련
    const onClickEditor = () => {
        setEditorMenu(!isOpenEditorMenu);
    }

    // 아이템 수정 관련
    const onClickEditorModify = () => {
        setEditorModi(!EditorModi);
    }

    // 저장버튼 helper
    const onClickEditorSaveHelp = async() => {
        if(newTempItem.x != undefined) {
            await dispatch(addItem({
                addItem : newTempItem
            }))
        }
    };

    //저장 버튼
    const onCLickEditorSave = async() => {
        if(newTempItem.x === undefined) {
            alert("저장된 값이 없습니다.");
        }
        else {
            await dispatch(addItem({
                addItem : newTempItem
            }))
            
            const config = {
                planetToken: planetToken,
                userToken: userToken,
                customize:item,
                planetOwner:isOwner
            };
        
            await axios.put(`http://52.78.18.110:8000/innercustomize`,config)
            .then((res)=>{
                dispatch(tempNewItem({
                    item : {data:"x"}
                }))
                
                // console.log(res);
                console.log("커스터마이징 저장 성공");
                
                state.history.go(0);
            })
            .catch((err)=>{
                console.log("커스터마이징 저장 실패");
                console.log(err);
                console.log(err.response);
            })   
        }
    }

    const itemClick = (e) => {
        let temp = e.target.className.slice(12,20);
        if(curItem === "") {
            setCurItem(temp);
            setIsClickedItem(!isClickedItem);

            setNewItemData(temp);
        }
        else {
            if(curItem === temp) {
                setIsClickedItem(!isClickedItem);
                setCurItem("");
            }
            else {
                setCurItem(temp);
                setNewItemData(temp);
            }
        }
    };

    const CreatePostBtnClick = () => {
        setCreatePostBtnClick(!isCreatePostBtnClicked);
        setPostInput("");
    }

    const onClickPostInputBtn = async() => {
        const config = {
            planetToken: planetToken,
            content:postInput,
            planetOwner:isOwner
        };
        await axios.post(`http://52.78.18.110:8000/createletter`, config)
        .then((res)=>{
            // console.log(res);
            console.log("편지 작성 성공");
            getPostData();
            setCreatePostBtnClick(!isCreatePostBtnClicked);
            setPostInput("");
        })
        .catch((err)=>{
            console.log("편지 작성 실패");
            console.log(err);
            console.log(err.response)
        })
    }

    // 방명록 관련
    const onClickGuestBook = () => {
        setModalGuestBook(!modalGuestBook);
        setCreateGuestBookBtnClick(!modalGuestBook);
        getGuestBookData();
    }

    const CreateGuestBookBtnClick = () => {
        setCreateGuestBookBtnClick(!isCreateGuestBookBtnClicked);
        setGuestInput("");
    }

    const getGuestBookData = async() => {
        const config = {
            params: {
                planetToken: planetToken,
            }
        };

        await axios.get(`http://52.78.18.110:8000/viewguestbook`,config)
        .then((res)=> {
            // console.log(res);
            console.log("방명록 데이터 조회 성공");
            setGuestBookList(res.data.guestBook);
        })
        .catch((err) => {
            console.log("방명록 데이터 조회 실패");
            console.log(err);
            console.log(err.response);
        })
    }

    // 사진 추가 부분
    const onClickaddPhoto = () => {
        setModalPhoto(!modalPhoto);
    };

    const onClickPhoto = () => {
        setModalPhoto(!modalPhoto);
        setPhoto('');
    }

    // 방명록 작성 확인 버튼
    const onClickGuestBookInputBtn = async() => {
        const config = {
            planetToken: planetToken,
            content:guestInput
        };
        await axios.post(`http://52.78.18.110:8000/createguestbook`, config)
        .then((res)=>{
            // console.log(res);
            console.log("방명록 작성 성공");
            getGuestBookData();
            setCreateGuestBookBtnClick(!isCreateGuestBookBtnClicked);
            setGuestInput("");
        })
        .catch((err)=>{
            console.log("방명록 작성 실패");
            console.log(err);
            console.log(err.response);
        })
    }

    const changePhoto = (e) => {
        e.preventDefault();

        
        let reader = new FileReader();
        let file = e.target.files[0];
        
        console.log(file);
        reader.onloadend = () => {
            setPhoto(file);
            setUrl(reader.result);

            // console.log(getUrl);
        }

        reader.readAsDataURL(file);
    }

    const photoBtnOkClicked = async() => {
        if(getPhoto === '') {
            alert('이미지가 없습니다.')
        }
        else {
            let formData = new FormData();
            formData.append("planetToken", planetToken);
            formData.append("userToken", userToken);
            formData.append("image", getPhoto);
            formData.append("planetOwner", isOwner);

            const config = {
                headers: {
                    "content-type": "multipart/form-data",
                }
            }

            await axios.post(`http://52.78.18.110:8000/memories`, formData, config)
            .then((res)=>{
                //console.log(res);
                console.log("이미지 업로드 성공");
                setPhoto('');
                setModalPhoto(!modalPhoto);
                getData();
            })
            .catch((err)=>{
                console.log("이미지 업로드 실패");
                console.log(err);
                console.log(err.response);
                // if(err.response.status === 500) {
                //     alert('이미지 크기가 ')
                // }
            })
        }
    }

    const photoDelBtnClicked = async(e) => {
        let idx = `${e.target.parentNode.parentNode.children[2].className}`;

        idx = idx.slice(10,20);
        //console.log(url);


        const config = {
            params: {
                planetToken:planetToken,
                deleteImage:photoList[idx],
                planetOwner:isOwner
            }
        };

        await axios.delete(`http://52.78.18.110:8000/memorydelete`, config)
        .then((res)=>{
            // console.log(res);
            console.log("이미지 삭제 성공");
            getData();
        })
        .catch((err)=>{
            console.log("이미지 삭제 실패");
            console.log(err);
            console.log(err.response);
            // if(err.response.status === 500) {
            //     alert('이미지 크기가 ')
            // }
        })
    };

    const onClickeditorPhotoDelBtn = () => {
        console.log("??")
        setPhotoBtn(!isphotoBtnClicked);
    }

    useEffect(()=> {
        getData();
    },[])

    return (
        <div className="container">
            {isLoading ? (
                <div className="loaderContainer">
                    <div className="lloader">
                    <P5Wrapper sketch={particles} />
                        <div>Loading</div>
                        <div className="circleContainer">
                            <div className="circle circle21"></div>
                            <div className="circle circle31"></div>
                            <div className="circle circle41"></div>
                            <div className="circle circle5"></div>
                            <div className="circle circle6"></div>
                            <div className="circle circle7"></div>
                            <div className="circle circle8"></div>
                            <div className="circle circle9"></div>
                            <div className="circle circle10"></div>
                            <div className="circle circle11"></div>
                            <div className="circle circle12"></div>
                            <div className="circle circle13"></div>
                            <div className="circle circle14"></div>
                            <div className="circle circle15"></div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="subContainer">
                    {/* 수정 환경 전환 컨테이너 */}
                    <div className="planetNavbar">
                        {/* 수정 환경으로 전환. */}
                        <div className="editorWindow" onClick={onClickSetting}>
                        { (isOpenEditorMenu===true) ||(EditorModi===true)||(isphotoBtnClicked===true) ? (<div className="redDot"></div>):(<div className="noDot"></div>)}
                            <img className="editorWindowBtn" src={setting}/>
                        </div>
                    </div>

                    {/* 수정 관련 메뉴 */}
                    {/* 기존 아이템 위치 변경, 추가 기능을 가진 메뉴 */}
                    
                    <div className={isOpenEditor? "editorSideBar editorSideBarOpen" : "editorSideBar editorSideBarClose"} >
                    {/* 아이템 추가 메뉴 버튼 */}
                        <div>
                            {isOpenEditorMenu? (<div className="redDot"></div>):(<div className="noDot"></div>)}
                            <div className={isOpenEditorMenu? "editorBtn editorBtnOpen" : "editorBtn editorBtnClose"}
                            onClick={onClickEditor} > Item </div>
                        </div>
                        {/* 기존 아이템 변경 버튼 */}
                        <div>
                            {EditorModi? (<div className="redDot"></div>):(<div className="noDot"></div>)}
                            <div className="editorModifyBtn" onClick={onClickEditorModify}>Cstm</div>
                        </div>

                        {/* 저장 버튼 (필요한지 모르겠지만 일단 추가.)*/}
                        <div className="editorSaveBtn" onMouseDown={onClickEditorSaveHelp} onClick={onCLickEditorSave}>SAVE</div>
                    
                        {/* 추억관 이미지 삭제 관리 버튼 */}
                        <div>
                            {isphotoBtnClicked? (<div className="redDot"></div>):(<div className="noDot"></div>)}

                            <div className="editorPhotoDelBtn" onClick={onClickeditorPhotoDelBtn}>Photo</div>
                        </div>
                    </div>

                    {/* 아이템 추가 박스 실제 영역 */}
                    <div className={isOpenEditorMenu? "editorContainer editorContainerOpen" : "editorContainer editorContainerClose"}>
                        {editor.map((edit,index)=>(
                        <div className={`edititem`} onClick={itemClick} key={index}>
                            <img className={`itemImg ${edit.str}`}src={edit.name}/>
                        </div>
                        ))}
                    </div>

                    <div className="contentsContainer"  onWheel={scrollMove}  ref={contentsContainerRef}>

                        {/* 변경사항 확인 버튼 */}
                        <div className="editorOkBtn"/>

                        {/* 아이템 영역 */}
                        <div className="sky"></div>
                        <div className="land"></div>
                        <div className="skyInside"></div>
                        <div className="landInside"></div>

                        <div className="subland1"></div>
                        <div className="subland2"></div>

                        {/* 우체통 */}
                        {/* <div className="post" onClick={onClickPost}></div> */}
                        <img className="post" src={post} onClick={onClickPost}/>

                        {/* 방명록 */}
                        <img className="guestBook1" onClick={onClickGuestBook} src={dashBoard1} />
                        <img className="guestBook2" onClick={onClickGuestBook} src={dashBoard2} />

                        {/* 입구 문 */}
                        <img className="enterDoorLeft" src={enterDoorLeft}/>
                        <img className="enterDoorRight" src={enterDoorRight}/>


                        {/* 사진 출력 */}
                        <div className="PhotoListContainer">
                            {photoList.map((photo,index)=> (
                                <div className="photoContainer">
                                    <div className="photoDelBtnContainer">
                                        {isphotoBtnClicked? (
                                            <img className="photoDelBtn" onClick={photoDelBtnClicked} src={X1}/>
                                        ) : (null)}
                                    </div>
                                    {/* <img className={"photoList "+ index} src={require("../" + photo)}/> */}
                                        <img className="frame" src={frame}/>
                                        <img className={"photoList "+ index} src={`http://52.78.18.110:8000/${photo}`}/>
                                        {/* <div className="frame"></div> */}
                                </div>
                            ))}
                            {/* 사진 추가 */}
                            <img className="addPicture" src={adderFrame} onClick={onClickaddPhoto}/>
                        </div>

                        {/* 사람*/}
                        {isRight? (
                            <img className="human" src={isMove? three : four}/>
                            ) : (
                            <img className="human" src={isMove? one : two}/>
                        )}

                        {/* 새로 추가될 아이템에 대한 컴포넌트*/}
                        {isClickedItem? (
                            <NewItem
                                data={newItemData}
                            />
                        ) : (null)}

                        {customItem.map((item,index)=> (
                            <TreeItem
                                key={index}
                                modiVar={EditorModi}
                                data = {item}
                                scroll = {scrollX}
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
                            <img className="closebtnImg" onClick={onClickPost} src={close}/>
                        </div>
                        {/* 내용 부분(작성 편지 보기, 편지 작성하기)이 보여질 부분 */}
                        <div className="postContentsContainer">

                            {/* 편지 작성 버튼 */}
                            <div className="createPostBtnContainer">
                                {isOwner ? (                                
                                <div className="createPostBtn"  onClick={CreatePostBtnClick}>
                                    {isCreatePostBtnClicked? "NEW" : "BACK"}
                                </div>) : (null)}

                            </div>
                            {/* 조회 */}
                            <div className={isCreatePostBtnClicked? "showPostOn" : "showPostOff"}>
                                {postList.map((dum,index) => (
                                    <PostList
                                        key={index}
                                        title={dum.content}
                                        time={dum.date}
                                        id={dum.letterId}
                                        planetOwner = {isOwner}
                                    />
                                ))}
                            </div>

                            {/* 작성 */}
                            <div className={isCreatePostBtnClicked? "writePostOff" : "writePostOn"} >
                                <textarea className="postInput" value={postInput} onChange={changePostInput} />
                                <div className="PostInputBtn" onClick={onClickPostInputBtn}>POST</div>
                            </div>

                            {/* 디테일 */}
                            <div>

                            </div>
                        </div>
                    </div>

                    {/* 모달창 외부영역 누르면 모달창 꺼지도록. */}
                    <div className="Modaloutside" onClick={onClickPost}></div>
                </div>
            ) : (null)}

            {/* 방명록 작성 Modal */}
            {modalGuestBook? (
                <div className="GuestBookModalContainer">
                    <div className="Modal">
                        {/* 상단바 부분 */}
                        <div className="topBar">
                            <img className="closebtnImg" onClick={onClickGuestBook} src={close}/>
                        </div>
                        <div className="postContentsContainer">
                            {/* 방명록 작성 버튼 */}
                            <div className="createPostBtnContainer">
                                <div className="createGuestBookBtn"  onClick={CreateGuestBookBtnClick}>
                                    {isCreateGuestBookBtnClicked? "NEW" : "BACK"}
                                </div>
                            </div>

                            {/* 조회 */}
                            <div className={isCreateGuestBookBtnClicked? "showGuestBookOn" : "showGuestBookOff"}>
                                {guestBookList.map((item,index) =>(
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

                            {/* 작성 */}
                            <div className={isCreateGuestBookBtnClicked? "writeshowGuestOff" : "writeshowGuesttOn"} >
                                <textarea className="postInput" value={guestInput} onChange={changeGuestBookInput} />
                                <div className="PostInputBtn" onClick={onClickGuestBookInputBtn}>DONE</div>
                            </div>

                        </div>

                        {/* 글자수 100자 제한. */}
                    </div>
                    <div className="Modaloutside" onClick={onClickGuestBook}/>
                </div>
            ) : (null)}

            {/* 사진 추가 Modal */}
            {modalPhoto? (
                <div className="addPhotoContainer">
                    <div className="Modal">
                        {/* 상단바 부분 */}
                        <div className="topBar">
                            <img className="closebtnImg" onClick={onClickPhoto} src={close}/>
                        </div>
                        <div className="addPhotoContentsContainer">
                            <div className="PreviewAreaContinaer">
                                {
                                    getPhoto === '' ? (
                                    <div className="noImg">미리보기</div>
                                        ) : (
                                    <img className="imgPreview" src={getUrl}/>
                                    )}
                            </div>
                            <div className="photoBtnContainer">
                                <input className="photoInput" type="file" accept='image/jpg, image/png, image/jpeg, image/gif' name='image' onChange={changePhoto}/>
                                <div className="photoBtnOkContainer" onClick={photoBtnOkClicked}>
                                    <img className="photoBtnOk"  src={okIcon}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="Modaloutside" onClick={onClickPhoto}/>
                </div>
            ) : (null)}
        </div>
    )
}

export default MyPlanetInside;