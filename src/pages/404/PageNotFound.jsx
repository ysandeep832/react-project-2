import React from "react";

import "./404Style.css";

import ContentWrapper from "../../components/contentWrapper/ContentWrapper";

const PageNotFound = () => {
    return (
        <div className="pageNotFound">
            <ContentWrapper>
                <span className="bigText">404</span>
                <span className="smallText">Page not found!</span>
            </ContentWrapper>
        </div>
    );
};

export default PageNotFound;
