import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="list-group">
        <a
          href="https://www.wunderground.com/"
          className="list-group-item list-group-item-action flex-column align-items-start active"
        >
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">
              <strong>Source</strong>
            </h5>
          </div>
          <p className="mb-1">Weather Underground</p>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
