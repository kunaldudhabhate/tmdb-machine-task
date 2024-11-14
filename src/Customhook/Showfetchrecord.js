import React, { useState } from "react";
import { Link } from "react-router-dom";
import { img_path } from "../component/Keys";

const Showfetchrecord = ({ apidata, label }) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil((apidata?.length || 0) / itemsPerPage);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = apidata.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container-fluid dark-bg">
      <div className="container">
        <h1 className="title text-center p-5">{label}</h1>
        <div className="row">
          {currentItems && currentItems.length > 0 ? (
            currentItems.map(({ original_title, vote_average, poster_path, id }) => (
              <div className="col-xl-3 movies-col" key={id}>
                <Link className="container-anchor" to={`/singlepage/${id}`}>
                  <img
                    src={img_path + poster_path}
                    alt={original_title}
                    className="img-fluid"
                  />
                  <p className="text-center pt-3 mb-1 text-light text-decoration-none">
                    {original_title}
                  </p>
                  <p className="text-center mb-50 text-light text-decoration-none">
                    Rating: {vote_average}/10
                  </p>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center text-light">No records found</p>
          )}
        </div>
        {/* Pagination */}
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
      </div>
    </div>
  );
};

export default Showfetchrecord;
