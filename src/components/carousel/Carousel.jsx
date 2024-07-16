// import React, { useRef } from "react";
// import {
//     BsFillArrowLeftCircleFill,
//     BsFillArrowRightCircleFill,
// } from "react-icons/bs";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import dayjs from "dayjs";

// import ContentWrapper from "../contentWrapper/ContentWrapper";
// import Img from "../lazyLoadImage/Img";
// import PosterFallback from "../../assets/no-poster.png";
// import CircleRating from "../circleRating/CircleRating";
// import Genres from "../genres/Genres";

// import "./carouselStyle.css";

// const Carousel = ({ data, loading, endpoint, title }) => {
//     const carouselContainer = useRef();
//     const { url } = useSelector((state) => state.home);
//     console.log("url checking", url)
//     const navigate = useNavigate();

//     const navigation = (dir) => {
//         const container = carouselContainer.current;

//         const scrollAmount =
//             dir === "left"
//                 ? container.scrollLeft - (container.offsetWidth + 20)
//                 : container.scrollLeft + (container.offsetWidth + 20);

//         container.scrollTo({
//             left: scrollAmount,
//             behavior: "smooth",
//         });
//     };

//     const skItem = () => {
//         return (
//             <div className="skeletonItem">
//                 <div className="posterBlock skeleton"></div>
//                 <div className="textBlock">
//                     <div className="title skeleton"></div>
//                     <div className="date skeleton"></div>
//                 </div>
//             </div>
//         );
//     };

//     console.log(data)

//     return (
//         <div className="carousel">
//             <ContentWrapper>
//                 {title && <div className="carouselTitle">{title}</div>}
//                 <BsFillArrowLeftCircleFill
//                     className="carouselLeftNav arrow"
//                     onClick={() => navigation("left")}
//                 />
//                 <BsFillArrowRightCircleFill
//                     className="carouselRighttNav arrow"
//                     onClick={() => navigation("right")}
//                 />
//                 {!loading ? (
//                     <div className="carouselItems" ref={carouselContainer}>
//                         {data?.map((item) => {
//                             const posterUrl = item.poster_path  ? url.poster + item.poster_path : PosterFallback;
                          
//                             return (
//                                 <div key={item.id} className="carouselItem"  onClick={() =>navigate(`/${item.media_type || endpoint}/${ item.id }` )} >
//                                     <div className="posterBlock">
//                                         <Img src={posterUrl} />
//                                         <CircleRating  rating={item.vote_average.toFixed(1 )} />
//                                         <Genres data={item.genre_ids.slice(0, 2)}/>
//                                     </div>
//                                     <div className="textBlock">
//                                         <span className="title">
//                                             {item.title || item.name}
//                                         </span>
//                                         <span className="date">
//                                             {dayjs(item.release_date || item.first_air_date).format(
//                                                 "MMM D, YYYY"
//                                             )}
//                                         </span>
//                                     </div>
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 ) : (
//                     <div className="loadingSkeleton">
//                         {skItem()}
//                         {skItem()}
//                         {skItem()}
//                         {skItem()}
//                         {skItem()}
//                     </div>
//                 )}
//             </ContentWrapper>
//         </div>
//     );
// };

// export default Carousel;


///////////////////////////////////////////////////////////////////////////////////////////////////



import React, { useRef, useEffect } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import { getApiConfiguration } from "../../store/homeSlice";

import "./carouselStyle.css";

const Carousel = ({ data, loading, endpoint, title }) => {
    const carouselContainer = useRef();
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        // Example API call to get configuration
        const fetchApiConfiguration = async () => {
            const response = await fetch('/path/to/api/configuration');
            const data = await response.json();
            dispatch(getApiConfiguration(data.images));
        };

        fetchApiConfiguration();
    }, [dispatch]);

    const navigation = (dir) => {
        const container = carouselContainer.current;

        const scrollAmount =
            dir === "left"
                ? container.scrollLeft - (container.offsetWidth + 20)
                : container.scrollLeft + (container.offsetWidth + 20);

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
    };

    const skItem = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
            </div>
        );
    };

    console.log("Data:", data);
    console.log("URL State:", url);

    return (
        <div className="carousel">
            <ContentWrapper>
                {title && <div className="carouselTitle">{title}</div>}
                <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow"
                    onClick={() => navigation("left")}
                />
                <BsFillArrowRightCircleFill
                    className="carouselRighttNav arrow"
                    onClick={() => navigation("right")}
                />
                {!loading ? (
                    <div className="carouselItems" ref={carouselContainer}>
                        {data?.map((item) => {
                            const posterUrl = item.poster_path ? url.poster + item.poster_path : PosterFallback;
                            console.log("Poster URL:", posterUrl);

                            return (
                                <div key={item.id} className="carouselItem" onClick={() => navigate(`/${item.media_type || endpoint}/${item.id}`)}>
                                    <div className="posterBlock">
                                        {/* <Img src={posterUrl} /> */}
                                        <img src={posterUrl} alt="imggee" />
                                        <CircleRating rating={item.vote_average.toFixed(1)} />
                                        <Genres data={item.genre_ids.slice(0, 2)} />
                                    </div>
                                    <div className="textBlock">
                                        <span className="title">
                                            {item.title || item.name}
                                        </span>
                                        <span className="date">
                                            {dayjs(item.release_date || item.first_air_date).format("MMM D, YYYY")}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="loadingSkeleton">
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Carousel;

