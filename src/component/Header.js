import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { api_key, img_path } from "./Keys";
import { IoMenu } from "react-icons/io5";
import { HiXMark } from "react-icons/hi2";
const Header = () => {
  const inputValue = useRef();
  const [singleMovieApi, setSingleMovieApi] = useState();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const SearchValue = (ev) => {
    ev.preventDefault();
    // console.log(inputValue.current.value);

    const movie_name = inputValue.current.value;
    console.log(movie_name);

    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${movie_name}&page=1`
    )
      .then((res) => res.json())
      .then((val) => {
        // console.log(val);
        console.log(val.results[0]);
        setSingleMovieApi(val.results[0]);
      });

    return singleMovieApi;
  };
  return (
    <div className="main">
      <header className="header">
        <nav className="nav">
          <div className="logo">
            <Link to="/" className="logotext">
              MovieDB
            </Link>
          </div>
          <div className="navigation">
            <ul className="list-item">
              <li className="item">
                <Link className="anchor-link" to="/">
                  Popular
                </Link>
              </li>
              <li className="item">
                <Link className="anchor-link" to="/toprated">
                  Top Rated
                </Link>
              </li>
              <li className="item">
                <Link className="anchor-link" to="/upcoming">
                  Upcoming
                </Link>
              </li>
            </ul>
            <div className="searchbox">
              <form>
                <div className="serach">
                  <input
                    className="search-input"
                    placeholder="Movie Name"
                    type="search"
                    aria-label="Search"
                    ref={inputValue}
                  />
                </div>
                <button
                  className="btn btn-outline-secondary bg-secondary text-light "
                  type="submit"
                  onClick={SearchValue}
                >
                  Search
                </button>
              </form>
            </div>
          </div>
          <div className="mobile-icons" onClick={toggleMenu}>
          {isMenuOpen ? <HiXMark className="icons" /> : <IoMenu  className="icons"/>}
        </div>
        </nav>
      </header>
      {/* Mobile Navigation */}
      {isMenuOpen && (
          <div className="mob-nav">
            <ul className="mob-list-item">
              <li className="mob-item">
                <Link className="mob-anchor-link" to="/">Popular</Link>
              </li>
              <li className="mob-item">
                <Link className="mob-anchor-link" to="/toprated">Top Rated</Link>
              </li>
              <li className="mob-item">
                <Link className="mob-anchor-link" to="/upcoming">Upcoming</Link>
              </li>
            </ul>
            <div className="mob-searchbox">
              <form className="mob-form">
                <input
                  className="search-input mob-search-input"
                  placeholder="Movie Name"
                  type="search"
                  aria-label="Search"
                  ref={inputValue}
                />
                <button
                  className="btn btn-outline-secondary mob-search-btn bg-secondary text-light"
                  type="submit"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        )}
          
      {/* mobile close  */}
      <div className=" container-fluid dark-bg">
        <div className="search-result-main container">
          <div className="row">
            {singleMovieApi && Object.keys(singleMovieApi) && (
              <>
                <Link className="container-anchor" to={`/singlepage/${singleMovieApi.id}`}>
                  <img
                    src={img_path + singleMovieApi.poster_path}
                    alt={singleMovieApi.title}
                    className="img-fluid"
                  />
                  <p className="text-center pt-3 mb-1 text-light text-decoration-none">
                    {singleMovieApi.title}
                  </p>
                  <p className="text-center mb-50 text-light text-decoration-none">
                    Rating: {singleMovieApi.vote_average}/10
                  </p>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
