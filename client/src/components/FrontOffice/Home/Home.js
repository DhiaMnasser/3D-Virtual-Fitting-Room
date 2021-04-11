import React, { useState, useEffect } from "react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import banner from "./opening.png";
import { deleteProduct } from "../../../redux/slices/products";
import { useDispatch } from "react-redux";
import { addItemToCart, getCurrentBasket } from "../../../redux/slices/orders";
import Avatar from "../Avatar/Avatar";
import Chatbot from "../Chatbot/Chat";
function Home(props) {
  return (
    <>
      <section
        class="banner set-bg"
        data-setbg={banner}
        style={{ background: "url(" + banner + ") no-repeat center " }}
      >
        <div class="container">
          <div class="row">
            <div class="col-xl-7 col-lg-8 m-auto">
              <div class="banner__slider owl-carousel owl-loaded owl-drag">
                <div class="owl-stage-outer">
                  <div class="owl-stage">
                    <div class="owl-item active" style={{ width: 690 + "px" }}>
                      <div class="banner__item">
                        <div class="banner__text">
                          <span></span>
                          <h1></h1>
                          {/* <a href="#">Shop now</a> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="owl-nav disabled">
                  <button type="button" role="presentation" class="owl-prev">
                    <span aria-label="Previous">‹</span>
                  </button>
                  <button type="button" role="presentation" class="owl-next">
                    <span aria-label="Next">›</span>
                  </button>
                </div>
                <div class="owl-dots">
                  <button role="button" class="owl-dot">
                    <span></span>
                  </button>
                  <button role="button" class="owl-dot">
                    <span></span>
                  </button>
                  <button role="button" class="owl-dot active">
                    <span></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div class="discount__text">
        <div class="discount__text__title">
          <span>Discount</span>
          <h2>Summer 2021</h2>
          <h5>
            <span>Sale</span> 50%
          </h5>
        </div>
        <div class="discount__countdown" id="countdown-time">
          <div class="countdown__item">
            <span>30</span> <p>Day</p>{" "}
          </div>
          <div class="countdown__item">
            <span>13</span> <p>Hour</p>{" "}
          </div>
          <div class="countdown__item">
            <span>14</span> <p>Min</p>{" "}
          </div>
          <div class="countdown__item">
            <span>38</span> <p>Sec</p>{" "}
          </div>
        </div>
        <a href="#">Shop now</a>
      </div>
      <Chatbot/>
    </>
  );
}

export default Home;
