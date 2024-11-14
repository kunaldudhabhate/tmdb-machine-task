import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api_key, img_path } from "../component/Keys";

const Singlepageview = () => {
  const [singlemovie, setsinglemovie] = useState([]);
  const [cast, setcast] = useState([]);
  const [drama, setdrama] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const params = useParams();
  const getsinglemoviedata = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${params.movieId}?api_key=${api_key}&language=en-US`
      );
      setsinglemovie(res.data);
      setdrama(res.data.genres);
      console.log(singlemovie.genres);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getsinglemoviedata();
  }, [params.movieId]);

  const getsinglecastdata = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${params.movieId}/credits?api_key=${api_key}&language=en-US`
      );
      // setsinglemovie(res.data);
      setcast(res.data.cast);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getsinglecastdata();
  }, [params.movieId]);

   // Pagination logic for cast
   const totalPages = Math.ceil(cast.length / itemsPerPage);
   const indexOfLastItem = currentPage * itemsPerPage;
   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
   const currentCast = cast.slice(indexOfFirstItem, indexOfLastItem);
 
   const handlePageChange = (pageNumber) => {
     setCurrentPage(pageNumber);
   };
  return (
    <section className="m-detail-section">
      <div>
        <div className=" singlePageColor py-3">
          <div className=" moviedetail-wrapper">
            <div className="">
              <div className="detail-wrapper-left">
                <div className="col-xl-3 m-0">
                  <div className="poster_img">
                    <img
                      src={img_path + singlemovie.poster_path}
                      className="sm-img-fluid"
                      alt=""
                    />
                  </div>
                </div>
                <div className="col-xl-9">
                  <p className="fs-4">{singlemovie.title}</p>
                  <p className="text-info fs-5">
                    Rating: {singlemovie.vote_average}
                  </p>
                  {/* <p>Release Date: {singlemovie.release_date}</p> */}
                  <div className="name-time">
                    <p>{singlemovie.runtime} min</p>
                    <div className="drama-name">
                      {drama &&
                        drama.length > 0 &&
                        drama.map((data, index) => {
                          console.log(data);

                          return <p key={index}>{data.name},</p>;
                        })}
                    </div>
                  </div>
                  <p className="budget">
                    Movie Budget: {singlemovie.budget} USD
                  </p>
                </div>
              </div>
              <p className="mx-3">
                <span className="fs-4 overview">Overview</span> <br />
                <span className="text-light">{singlemovie.overview}</span>
              </p>
            </div>
            <div className="col-xl-6">
              <img
                src={img_path + singlemovie.backdrop_path}
                className="sm-img-fluid"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      {/* cast start  */}
       {/* Cast Section with Pagination */}
       <div className="cast-main">
        <p className="cast">Cast</p>
        <div className="cast-detail">
          {currentCast.map((c, index) => (
            <div className="cast-card" key={c.id || index}>
              <img
                className="cast_img"
                src={
                  c.profile_path
                    ? img_path + c.profile_path
                    : "https://placehold.jp/300x354.png"
                }
                alt={c.name}
              />
              <div className="cast-content">
                <p>{c.name}</p>
                <p>{c.character}</p>
              </div>
            </div>
          ))}
        </div>
          </div>
      {/* Pagination Controls */}
      <div className="center">
          <div className="pagination">
            <Link
              to="#"
              onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
              className={currentPage === 1 ? "disabled" : ""}
            >
              &laquo;
            </Link>
            {[...Array(totalPages).keys()].map((number) => (
              <Link
                key={number + 1}
                to="#"
                onClick={() => handlePageChange(number + 1)}
                className={currentPage === number + 1 ? "active" : ""}
              >
                {number + 1}
              </Link>
            ))}
            <Link
              to="#"
              onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}
              className={currentPage === totalPages ? "disabled" : ""}
            >
              &raquo;
            </Link>
          </div>
        </div>
      
    </section>
  );
};

export default Singlepageview;
