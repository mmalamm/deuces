import React, { Component, Fragment } from "react";
import "./Loading.css";
import Logo from "../AssetsSVG/Logo";
import { BounceLoading } from "respinner";

class Loading extends Component {
  render() {
    return (
      <Fragment>
        <div className="Loading">
          <Logo cls="Loading-logo" />
        </div>
        <div className="Loading-spinner">
          <BounceLoading fill="#708090" gap={10} />
        </div>
      </Fragment>
    );
  }
}

export default Loading;
