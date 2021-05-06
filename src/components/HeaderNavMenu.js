import React from "react";

const HeaderNavMenu = ({ img, span, alt }) => {
  return (
    <div>
      <a>
        <img src={img} alt={alt} />
        <span>{span}</span>
      </a>
    </div>
  );
};

export default HeaderNavMenu;
