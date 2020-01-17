import * as React from 'react';

import "../sideNav.css";

export interface IcontentProps {}   

export default class Content extends React.Component<IcontentProps> {  
  constructor(props: IcontentProps) {  
    super(props);
  }

  public OpenCloseSideNav(){
    var element = document.getElementById("sideNav"); 
    element.classList.toggle("sideNav");
  }

  public render() {
    
    return (
      <div>
        <div className="w3-sidebar w3-bar-block w3-card w3-animate-left" id="sideNav">
          <a href="#" className="w3-bar-item w3-button">Link 1</a>
          <a href="#" className="w3-bar-item w3-button">Link 2</a>
          <a href="#" className="w3-bar-item w3-button">Link 3</a>
        </div>
        <div className="w3-teal">
          <button onClick={this.OpenCloseSideNav} className="w3-xlarge btnOpenNav">☰<span>Menu</span></button>
          <div className="w3-container">
            <h1>My Page</h1>
          </div>
        </div>
        <div id="myDIV" className="w3-container">
          <p>This sidebar is hidden by default</p>
          <p>You must click on the "hamburger" icon (top left) to open it.</p>
          <p>The sidebar will hide a part of the page content.</p>
        </div>
      </div>
    );
  } 
}