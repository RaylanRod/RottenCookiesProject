import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { useEffect, useState } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


function DocumentaryCarousel(props) {

    const [carouselItems, setCarouselItems] = useState([]);

    useEffect(() => {

    const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ODBhNDFmYjI0YTE0N2VjMDAyMzRiNDBiN2I1MzU1OSIsInN1YiI6IjY0OTUxODhmZDVmZmNiMDExYzVhZDU3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LJ1GeGwx8BaLzjiamCrHLMKwtte_yDQwN8mG4K8N1tU'
            }
        };

    const fetchCarouselItems = async () => {
        let randPage =  Math.floor(Math.random() * (551 - 1 + 1)) + 1;
        let randPageStr = randPage.toString();

        const tvListResponse = await fetch(`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${randPageStr}&sort_by=popularity.desc&with_genres=99&with_original_language=en`, options);
        const tvListData = await tvListResponse.json();

        const tvShowNames = tvListData.results.slice(0, 10).map(show => show.name);
        // console.log(tvShowNames);
        const tvMazeShows = [];
        for (const showName of tvShowNames) {
            
        const tvMazeListResponse = await fetch(`http://api.tvmaze.com/search/shows?q=${showName}`);
        const tvMazeListData = await tvMazeListResponse.json();
        // this call to TvMaze APi with our first API list of names fails because some names arent in the TvMaze API 
        // I only add the TvMaze Data to our Carousel if the information is found 
        if (tvMazeListData[0]) {
            if (tvMazeListData[0].show.image != null) {
                const tvMazeShow = {
                    name: tvMazeListData[0].show.name,
                    img: tvMazeListData[0].show.image.original
                };
                tvMazeShows.push(tvMazeShow);
            } else {
                const tvMazeShow = {
                    name: tvMazeListData[0].show.name,
                    img: "imag-place-holder.png"
                };
                tvMazeShows.push(tvMazeShow);
            }


        } else {
            console.log("no result found")
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
                slidesToSlide: 3 // optional, default to 1.
            },
            tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 4,
                slidesToSlide: 2 // optional, default to 1.
            },
            mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1,
                slidesToSlide: 1 // optional, default to 1.
            }
            };


        return (
            <>
                <div className="container-fluid">
                    <h2 className="mb-0"> Crime Shows </h2>
                    <Carousel swipeable={false} draggable={false}  showDots={true} autoPlay={props.deviceType !== "mobile" ? true : false} responsive={responsive} ssr={true} infinite={true}  autoPlaySpeed={2500} keyBoardControl={true} customTransition="all .5" transitionDuration={500} containerClass="carousel-container" sliderClass="height-adj" removeArrowOnDeviceType={["tablet", "mobile"]} deviceType={props.deviceType} itemClass="item-width-adj h-100 carousel-item-padding-40-px" imgClass="h-100">
                        {carouselItems.map((series, index) => ( 
                            <div className="size-adj">
                                {series.img == "imag-place-holder.png" ? <div className="h-100 text-center"><p className="position-absolute w-100">{series.name}</p><img key={index} className="h-100 carousel-img-adj" src={series.img} alt={series.name} /></div> : <img key={index} className="h-100 carousel-img-adj" src={series.img} alt={series.name} />}
                            </div>
                            )
                        )}
                    </Carousel>
                </div>
            </>
        );
    } else {
        const responsive = {
            desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 6,
                slidesToSlide: 3 // optional, default to 1.
            },
            tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 4,
                slidesToSlide: 2 // optional, default to 1.
            },
            mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1,
                slidesToSlide: 1 // optional, default to 1.
            }
            };
        return (
            <Carousel
            swipeable={false} responsive={responsive} infinite={true} ssr={true} containerClass="carousel-container" sliderClass="height-adj" removeArrowOnDeviceType={["tablet", "mobile"]} deviceType={props.deviceType} itemClass="item-width-adj h-100 carousel-item-padding-40-px" imgClass="h-100">
            <div className="size-adj">
                <img className="h-100 place-holder-img" src="loading-75.gif" alt="Placeholder" />
            </div>
            <div className="size-adj">
                <img className="h-100 place-holder-img " src="loading-75.gif" alt="Placeholder"  />
            </div>
            <div className="size-adj">
                <img className="h-100 place-holder-img " src="loading-75.gif" alt="Placeholder"  />
            </div>
            <div className="size-adj">
                <img className="h-100 place-holder-img " src="loading-75.gif" alt="Placeholder"  />
            </div>
            <div className="size-adj">
                <img className="h-100 place-holder-img " src="loading-75.gif" alt="Placeholder"  />
            </div>
            <div className="size-adj">
                <img className="h-100 place-holder-img " src="loading-75.gif" alt="Placeholder"  />
            </div>
            <div className="size-adj">
                <img className="h-100 place-holder-img " src="loading-75.gif" alt="Placeholder"  />
            </div>
            </Carousel>
        )
    }

}

export default DocumentaryCarousel;