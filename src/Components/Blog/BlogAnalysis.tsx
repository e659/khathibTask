import React from "react";
import posts from "../../assets/images/Blog/posts.png";
import users from "../../assets/images/Blog/users.png";
import review from "../../assets/images/Blog/review.png";
export default function BlogAnalysis({
  menuCollapse,
  menuIconClick,
  handleToggleSidebar,
  menuToggle,
}) {
  return (
    <>
      <section className="mt-3 overFlow___sec ms-3">
        <div className="container">
          <div className="row gx-5 employ__analysis">
            <div className="col overflow__div p-3">
              <div className="d-flex justify-content-between">
                <div>
                  <p>Posts</p>
                  <p style={{color:"rgba(70, 147, 214, 1)"}} className="analysis_number">10</p>
                </div>
                <div className="">
                  <img src={posts} alt="" />
                </div>
              </div>
            </div>

            <div className="col overflow__div p-3 mx-5">
              <div className="d-flex justify-content-between">
                <div>
                  <p> Blogs viewers</p>
                  <p style={{color:"rgba(70, 147, 214, 1)"}}  className="analysis_number">3</p>
                </div>
                <div className="">
                  <img src={review} alt="" />
                </div>
              </div>
            </div>
            <div className="col overflow__div p-3">
              <div className="d-flex justify-content-between">
                <div>
                  <p>Users</p>
                  <p style={{color:"rgba(70, 147, 214, 1)"}}  className="analysis_number">2</p>
                </div>
                <div className="">
                  <img src={users} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
