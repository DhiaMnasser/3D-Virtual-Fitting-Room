import React, { Component } from "react";

export class Footer extends Component {
  render() {
    return (
      
        <footer className="sticky-footer bg-white">
          <div className="container my-auto">
            <div className="copyright text-center my-auto">
              <span>Copyright © 3D VFR {new Date().getFullYear()}</span>
            </div>
          </div>
        </footer>
      
    );
  }
}

export default Footer;
