import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import "../styles/Search.scss";

const Search = () => {
  const dummy = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  //   const [sliced, setSliced] = useState(["처음", "두번쨰", "세번쨰"]);
  //   const [result, setResult] = useState(dummy.slice(0, 3));
  //   const [itemIdx, setItemIdx] = useState(0);
  const [result, setResult] = useState(dummy.slice(0, 3));
  const [itemIdx, setItemIdx] = useState(0);
  //   const [items, setItems] = useState(3);
  //   const [preItem, setPreItem] = useState(0);

  //   const [preCoverUrl, setPreCoverUrl] = useState("");
  //   const [coverUrl, setCoverUrl] = useState("");

  //   const getData = () => {
  //     let result = dummy.slice(preItem, items);
  //     setSliced(result);
  //     console.log(result);
  //   };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const test = () => {
    let scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    let scrollTop = Math.max(
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
    let clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight * 0.95) {
      setItemIdx(itemIdx + 1);
      setResult(result.concat(dummy.slice(itemIdx, itemIdx + 1)));
      console.log(itemIdx);
      console.log(result);
    }
  };

  useEffect(() => {
    // getData();
    window.addEventListener("scroll", test, true);
    return () => window.removeEventListener("scroll", test, true);
  }, [test]);

  return (
    <div className="search">
      <div className="box">검색 박스</div>
      <div className="planets">
        {result.map((v, idx) => (
          <div className="planet" key={idx}>
            {v}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
