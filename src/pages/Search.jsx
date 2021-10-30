import React, { useEffect, useCallback, useState } from "react";
import "../styles/Search.scss";
import Bubble from "../components/bubble";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";

const Search = (props) => {
  // 옵션 선택
  const [searchData, setSearchData] = useState("");

  useEffect(() => {
    setSearchData(props.data);
    console.log("searchData:", searchData);
  }, [props, searchData]);

  return (
    <div className="search">
      <div className="search-datas">
        {searchData ? (
          searchData.map((v, idx) => (
            <Link
              to={{
                pathname: `/MyPlanetZoom/${v.planetId}`,
                state: {
                  color: v.color,
                },
              }}
            >
              <div
                className="search-data"
                key={idx}
                style={{
                  background: `linear-gradient(60deg, ${v.color[1]} , ${v.color[0]}) `,
                  opacity: "0.9",
                }}
              >
                {v.planetId}
                <br />
                {v.planetNickname}
                <br />
                {v.userNickname}
              </div>
            </Link>
          ))
        ) : (
          <Loading />
        )}
      </div>

      <Bubble />
    </div>
  );
};

export default Search;
