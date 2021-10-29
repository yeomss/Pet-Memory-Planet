import axios from "axios";
import React, { useEffect, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import useInput from "../hooks/useInput";
import "../styles/Search.scss";

const Search = () => {
  // 옵션 선택
  const [selected, onChangeSelected] = useInput("행성 번호");
  const [search, onChangeSearch] = useInput("");
  const [searchData, setSearchData] = useState();
  const [planetId, setPlanetId] = useState("");

  // 검색 이벤트
  const onClickSearch = useCallback(() => {
    let url = `http://52.78.18.110:8000/searchPlanet?select=${selected}&content=${search}`;
    console.log("url: ", url);

    axios
      .get(url)
      .then((res) => {
        console.log(res);
        setSearchData(res.data);
      })
      .catch((err) => console.log(err));
  }, [selected, search]);

  const ontest = () => {
    console.log("selected: ", selected);
    console.log("search: ", search);

    let planetId = searchData[0].planetId;

    let token = sessionStorage.getItem("token");
    let url = `http://52.78.18.110:8000/showplanet?userToken=${token}&planetId=${planetId}`;
    axios
      .get(url)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const onClickPlanet = () => {};

  return (
    <div className="search">
      <div className="box">
        <select placeholder="검색" value={selected} onChange={onChangeSelected}>
          <option value="행성 번호">행성 번호</option>
          <option value="행성 이름">행성 이름</option>
          <option value="사용자">사용자</option>
        </select>
        <input type="text" value={search} onChange={onChangeSearch} />
        <button onClick={onClickSearch}>검색</button>
      </div>
      <button onClick={ontest}>selected</button>

      <div>
        {searchData
          ? searchData.map((v, idx) => <div key={idx}>{v.planetId}</div>)
          : null}
      </div>
    </div>
  );
};

export default Search;
