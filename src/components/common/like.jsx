import React from "react";

const Like = props => {
  let iconClass = "fa fa-heart";
  if (!props.liked) iconClass += "-o";
  return (
    <React.Fragment>
      <i onClick={props.onClick} style={{ cursor: "pointer" }} className={iconClass} aria-hidden="true"></i>
    </React.Fragment>
  );
};

export default Like;
