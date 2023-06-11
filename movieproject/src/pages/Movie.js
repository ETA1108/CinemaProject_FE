import React, { useState, useEffect, useRef } from "react";
import MovieItem from "../components/MovieItem";
import "./Movie.scss";
import axios from "axios";
import { Link } from "react-router-dom";

const Movie = () => {
  const category = [
    // 장르, 등급 조회
    { id: 0, name: "영화 전체", state: null },
    { id: 1, name: "액션", state: "액션" },
    { id: 2, name: "로맨스", state: "로맨스" },
    { id: 3, name: "판타지", state: "판타지" },
    { id: 4, name: "공포", state: "공포" },
    { id: 5, name: "애니메이션", state: "애니메이션" },
    { id: 6, name: "드라마", state: "드라마" },
    //{ id: 7, name: "기타", state: "기타" },
    { id: 7, name: "전체 관람가", state: "전체 관람가" },
    { id: 8, name: "12세 관람가", state: "12세 관람가" },
    { id: 9, name: "15세 관람가", state: "15세 관람가" },
    { id: 10, name: "청소년 관람불가", state: "청소년 관람불가" },
  ];

  const [categoryItem, setCategoryItem] = useState(category[0]);
  const [txs, setTxs] = useState(null);

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

  const onChange = (id) => {
    setCategoryItem(category[id]);
  };

  useInterval(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/movies");
        let filteredTxs = [];
        for (let i = 0; i < response.data.movies.length; i++) {
          if (categoryItem.state === null)
            filteredTxs.push(response.data.movies[i]);
          else if (
            response.data.movies[i].genre === categoryItem.state ||
            response.data.movies[i].rating === categoryItem.state
          )
            filteredTxs.push(response.data.movies[i]);
        }
        setTxs(filteredTxs);
      } catch (e) {
        console.log(e);
      }
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
            &nbsp; <div>{cate.name}</div>
          </div>
        ))}
      </div>
      <ul className="TxList">
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
