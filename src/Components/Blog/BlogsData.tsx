import React, { useState, useEffect } from "react";
import { BASEURL } from "../../../constans/index";
import axios from "axios";
import "./blog.scss";
import AddBlog from "./AddBlog";
import DropDown from "./DropDown";
export default function BlogsData({
  menuCollapse,
  menuIconClick,
  handleToggleSidebar,
  menuToggle,
}) {
  const [blogs, setBlogs] = useState();
  const [query, setQuery] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const handleCardClick = (row) => {
    // console.log(row);
    setSelectedCard(row);
  };
  //   getAllBlogs
  async function getAllBlogs(searchQuery) {
    const params = new URLSearchParams({
      search: searchQuery,
      page: 1,
      limit: 20,
    });
    const response = await axios
      .get(`${BASEURL}/blog/get_all_blogs?${params.toString()}`, {
        headers: { authorization: localStorage.getItem("usertoken") },
      })
      // handel error if request faild
      .catch((err) => {
        console.log(err);
      });

    setBlogs(response?.data?.data);
  }
  console.log(blogs);
  useEffect(() => {
    getAllBlogs(query);
  }, [query]);
  return (
    <>
      {menuCollapse ? (
        <div className="container mt-4" style={{ width: "1500px" }}>
          <div className="d-flex justify-content-end mb-2">
            <AddBlog />
          </div>
          <div className="row g-3">
            {blogs?.map((blog) => {
              return (
                <div
                  className="col "
                  key={blog.id}
                  onClick={() => handleCardClick(blog)}
                >
                  <div className="card ">
                    <img src={blog.image} className="" alt="blogImage" />
                    <div className="card-body">
                      <DropDown
                        Blogs={blogs}
                        handleCardClick={handleCardClick}
                        selectedCard={selectedCard}
                        setSelectedCard={setSelectedCard}
                      />
                      <p>
                        <span className="blog__type">{blog.title}</span>
                        {/* <span className="blog_date">13 March 2023</span> */}
                      </p>
                      <p className="card-text">{blog.short_description}</p>
                      <p className="card-descrption">{blog.description}</p>
                      <a href="">Read More...</a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="container mt-4" style={{ width: "1150px" }}>
          <div className="d-flex justify-content-end mb-2">
            <AddBlog />
          </div>

          <div className="row">
            {blogs?.map((blog) => {
              return (
                <div
                  className="col "
                  key={blog.id}
                  onClick={() => handleCardClick(blog)}
                >
                  <div className="card ">
                    <img src={blog.image} className="" alt="blogImage" />
                    <div className="card-body">
                      <DropDown
                        Blogs={blogs}
                        handleCardClick={handleCardClick}
                        selectedCard={selectedCard}
                        setSelectedCard={setSelectedCard}
                      />
                      <p>
                        <span className="blog__type">{blog.title}</span>
                        {/* <span className="blog_date">13 March 2023</span> */}
                      </p>
                      <p className="card-text">{blog.short_description}</p>
                      <p className="card-descrption">{blog.description}</p>
                      <a href="">Read More...</a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
