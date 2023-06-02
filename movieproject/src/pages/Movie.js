import React, { useState, useEffect, useRef } from "react";
import MovieItem from "../components/MovieItem";
import "./Movie.scss";
import axios from "axios";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { Link } from "react-router-dom";

const Movie = () => {
  const category = [
    // 장르, 등급 조회
    { id: 0, name: "장르 전체", state: null },
    { id: 1, name: "액션", state: "액션" },
    { id: 2, name: "로맨스", state: "로맨스" },
    { id: 3, name: "판타지", state: "판타지" },
    { id: 4, name: "공포", state: "공포" },
    { id: 5, name: "애니메이션", state: "애니메이션" },
    { id: 6, name: "드라마", state: "드라마" },
    { id: 7, name: "기타", state: "기타" },
  ];

  const classcategory = [
    { id: 0, name: "등급 전체", state: null },
    { id: 1, name: "전체 관람가", state: "액션" },
    { id: 2, name: "12세 관람가", state: "로맨스" },
    { id: 3, name: "15세 관람가", state: "판타지" },
    { id: 4, name: "청소년 관람불가", state: "공포" },
  ];

  const [categoryItem, setCategoryItem] = useState(category[0]);
  const [toggle, setToggle] = useState(false);
  const [txs, setTxs] = useState(null);
  //  const [loading, setLoading] = useState(false);

  const useInterval = (callback, delay) => {
    const savedCallback = useRef(null);

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      const executeCallback = () => {
        savedCallback.current();
      };

      const timerId = setInterval(executeCallback, delay);

      return () => clearInterval(timerId);
    }, []);
  };

  const onClick = () => {
    setToggle(!toggle);
  };

  const onChange = (id) => {
    setCategoryItem(category[id]);
    setToggle(!toggle);
  };

  useInterval(() => {
    const fetchData = async () => {
      //      setLoading(true);
      try {
        const response = await axios.get("/movies");
        let filteredTxs = [];
        for (let i = 0; i < response.data.movies.length; i++) {
          if (categoryItem.state === null)
            filteredTxs.push(response.data.movies[i]);
          else if (response.data.movies[i].genre === categoryItem.state)
            filteredTxs.push(response.data.movies[i]);
        }
        setTxs(filteredTxs);
      } catch (e) {
        console.log(e);
      }
      //      setLoading(false);
    };
    fetchData();
  }, 500);

  if (!txs) {
    return null;
  }

  return (
    <div className="Movie">
      <div className="PageName">
        <h1>영화 차트</h1>
      </div>
      <div className="Bar"></div>
      <ul className="TxList">
        <div className="Filter" onClick={onClick}>
          <div className="Category">&nbsp; {categoryItem.name}</div>
          {(() => {
            if (!toggle) return <MdExpandMore />;
            else return <MdExpandLess />;
          })()}
        </div>
        <div></div>
        <div></div>
        {toggle && (
          <div className="select-dropdown">
            {category.map((cate) => (
              <div
                className={(() => {
                  if (cate.name === categoryItem.name)
                    return "select-item selected";
                  else return "select-item";
                })()}
                key={cate.id}
                onClick={() => onChange(cate.id)}
              >
                &nbsp; {cate.name}
              </div>
            ))}
          </div>
        )}
        {txs.map((txs) => (
          <MovieItem txs={txs} key={txs.id} />
        ))}
      </ul>
      <Link to="/movie_create">
        <button className="moviecreate">영화 등록하기</button>
      </Link>
    </div>
  );
};
export default Movie;
