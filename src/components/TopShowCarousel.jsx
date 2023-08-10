import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function TopShowCarousel(props) {
  const [carouselItems, setCarouselItems] = useState([]);

  useEffect(() => {
    const fetchCarouselItems = async () => {
      const tvMazeShows = [];
      let randPage = Math.floor(Math.random() * (1196 - 1 + 1)) + 1;
      let randPageRangeMin = randPage - 25;
      let randPageRange = Math.floor(
        Math.random() * (randPage - randPageRangeMin + 1) + randPageRangeMin
      );
      let randPageStr = randPageRange.toString();
      const tvListResponse = await fetch(
        `https://www.episodate.com/api/most-popular?page=${randPageStr}`
      );
      const tvListData = await tvListResponse.json();
      const tvShowNames = await tvListData.tv_shows
        .slice(0, 12)
        .map((show) => show.name);

      for (const showName of tvShowNames) {
        const tvMazeListResponse = await fetch(
          `https://api.tvmaze.com/search/shows?q=${showName}`
        );
        const tvMazeListData = await tvMazeListResponse.json();
        if (tvMazeListData[0]) {
          if (tvMazeListData[0].show.image != null) {
            const tvMazeShow = {
              name: tvMazeListData[0].show.name,
              img: tvMazeListData[0].show.image.original,
            };
            tvMazeShows.push(tvMazeShow);
          } else {
            const tvMazeShow = {
              name: tvMazeListData[0].show.name,
              img: "imag-place-holder.png",
            };
            tvMazeShows.push(tvMazeShow);
          }
        } else {
          console.log("no result found");
        }
      }

      setCarouselItems(tvMazeShows);
    };
    fetchCarouselItems();
  }, []);

  if (carouselItems.length >= 1) {
    const responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 6,
        slidesToSlide: 3, // optional, default to 1.
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 4,
        slidesToSlide: 2, // optional, default to 1.
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1, // optional, default to 1.
      },
    };
    return (
      <div className="container-fluid">
        <h2 className="mb-0"> Popular Shows </h2>
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={true}
          autoPlay={props.deviceType !== "mobile" ? true : false}
          responsive={responsive}
          ssr={true}
          infinite={true}
          autoPlaySpeed={2500}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          sliderClass="height-adj"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          deviceType={props.deviceType}
          itemClass="item-width-adj h-100 carousel-item-padding-40-px"
          imgClass="h-100"
        >
          {carouselItems.map((series, index) => (
            <div className="size-adj">
              {series.img == "imag-place-holder.png" ? (
                <div className="h-100 text-center">
                  <p className="position-absolute w-100">{series.name}</p>
                  <img
                    key={index}
                    className="h-100 carousel-img-adj"
                    src={series.img}
                    alt={series.name}
                  />
                </div>
              ) : (
                <img
                  key={index}
                  className="h-100 carousel-img-adj"
                  src={series.img}
                  alt={series.name}
                />
              )}
            </div>
          ))}
        </Carousel>
      </div>
    );
  } else {
    const responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 6,
        slidesToSlide: 3, // optional, default to 1.
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 4,
        slidesToSlide: 2, // optional, default to 1.
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1, // optional, default to 1.
      },
    };
    return (
      <Carousel
        swipeable={false}
        responsive={responsive}
        infinite={true}
        ssr={true}
        containerClass="carousel-container"
        sliderClass="height-adj"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        deviceType={props.deviceType}
        itemClass="item-width-adj h-100 carousel-item-padding-40-px"
        imgClass="h-100"
      >
        <div className="size-adj">
          <img
            className="h-100 place-holder-img"
            src="loading-75.gif"
            alt="Placeholder"
          />
        </div>
        <div className="size-adj">
          <img
            className="h-100 place-holder-img "
            src="loading-75.gif"
            alt="Placeholder"
          />
        </div>
        <div className="size-adj">
          <img
            className="h-100 place-holder-img "
            src="loading-75.gif"
            alt="Placeholder"
          />
        </div>
        <div className="size-adj">
          <img
            className="h-100 place-holder-img "
            src="loading-75.gif"
            alt="Placeholder"
          />
        </div>
        <div className="size-adj">
          <img
            className="h-100 place-holder-img "
            src="loading-75.gif"
            alt="Placeholder"
          />
        </div>
        <div className="size-adj">
          <img
            className="h-100 place-holder-img "
            src="loading-75.gif"
            alt="Placeholder"
          />
        </div>
        <div className="size-adj">
          <img
            className="h-100 place-holder-img "
            src="loading-75.gif"
            alt="Placeholder"
          />
        </div>
      </Carousel>
    );
  }
}

export default TopShowCarousel;
