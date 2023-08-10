import React, { useState, useEffect, useRef } from "react";
import cookie from "../assets/cookie.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import * as bootstrap from "bootstrap";

function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [videoId, setVideoId] = useState("");
  const [videoLoaded, setVideoLoaded] = useState(false);
  const playerRef = useRef(null);

  const handleSearch = () => {
    console.log("Performing search:", searchQuery);
    setVideoId(""); // Reset the video ID
    setSearchQuery(""); // Clear the search bar
    fetchVideos();
    openModal();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const fetchVideos = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=AIzaSyBsE47E8DLIHgY4_ymj81vvKthrTPn2HCc&q= ${searchQuery} trailer`
      );
      const data = await response.json();
      const videoId = data.items[0].id.videoId;
      setVideoId(videoId);
      console.log(videoId);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const openModal = () => {
    const videoModal = document.getElementById("videoModal");
    const bootstrapModal = new bootstrap.Modal(videoModal);
    bootstrapModal.show();
  };

  const closeModal = () => {
    const videoModal = document.getElementById("videoModal");
    const bootstrapModal = bootstrap.Modal.getInstance(videoModal);
    bootstrapModal.hide();
    resetModal();
  };

  const resetModal = () => {
    if (playerRef.current) {
      playerRef.current.destroy(); // Destroy the YouTube player
    }
    setVideoId(""); // Reset the video ID
  };

  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      setVideoLoaded(true);
    };
  }, []);

  useEffect(() => {
    if (videoLoaded && videoId) {
      playerRef.current = new window.YT.Player("videoPlayer", {
        height: "350",
        width: "100%",
        videoId: videoId,
      });
    } else if (!videoId) {
      resetModal();
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy(); // Clean up the YouTube player when component unmounts
      }
    };
  }, [videoLoaded, videoId]);

  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand cookiespacer" href="#">
              <img
                src={cookie}
                alt="Rotten Cookies Logo"
                className="logo"
                style={{ width: "30px", height: "30px" }}
              />{" "}
              Rotten Cookies
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbarNav"
            >
              <ul className="navbar-nav align-items-baseline">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Genres
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    RunTimes
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link disabled">Actors</a>
                </li>
                <li className="nav-item me-5">
                  <a className="nav-link disabled">Eras</a>
                </li>
                <li>
                  <div className="input-group input-group-sm mb-3">
                    <span
                      className="input-group-text"
                      id="inputGroup-sizing-sm"
                      onClick={handleSearch}
                    >
                      <span role="img" aria-label="Search" aria-hidden="true">
                        🔎
                      </span>
                    </span>

                    <input
                      type="text"
                      className="form-control border rounded search-input"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                      value={searchQuery}
                      onChange={(evt) => setSearchQuery(evt.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div
        id="videoModal"
        className="modal fade"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={closeModal}
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <div
                id="videoPlayer"
                style={{ height: "350px", width: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;

//https://www.googleapis.com/youtube/v3/search?key=AIzaSyBsE47E8DLIHgY4_ymj81vvKthrTPn2HCc&q= ${searchQuery} trailer
