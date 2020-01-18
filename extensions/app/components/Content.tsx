import * as React from 'react';

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
        <div>
          <button onClick={this.OpenCloseSideNav} className="w3-xlarge btnOpenNav">☰<span>Menu</span></button>
          <div className="ms-Grid-row w3-container">
            <div className="ms-Grid-col ms-md1 block">A</div> 
            <div className="ms-Grid-col ms-sm12 ms-md10 block pageDescription">
              <h1>Controladoria</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultrices dapibus egestas. 
                Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. 
                Vivamus efficitur urna vel velit porttitor tempus. Aliquam arcu orci, laoreet a tortor in, 
                sollicitudin blandit ex. Ut dapibus dui vel nulla efficitur, posuere venenatis leo volutpat. 
                Mauris vel interdum felis. Duis iaculis blandit lacus eget pellentesque. 
                Aenean sit amet justo vitae mauris iaculis imperdiet. Nunc lacus dolor, convallis venenatis elit a, 
                viverra posuere ante. Aliquam pulvinar elit non semper hendrerit. Proin dapibus sagittis diam id feugiat. 
                Aliquam non dapibus arcu. Pellentesque sit amet dui porta, ultricies nisl ut, dictum turpis. 
                Vivamus interdum in elit in dapibus. Phasellus felis magna, dapibus sed tristique eget, feugiat sed mi. 
                Aliquam magna massa, maximus vitae lacus sit amet, pharetra posuere justo.</p>
            </div> 
            <div className="ms-Grid-col ms-md1 block">C</div>
          </div>
          <div className="ms-Grid-row w3-container">
            <div className="ms-Grid-col ms-sm12 ms-md4 block">
              <p>This sidebar is hidden by default</p>
            </div> 
            <div className="ms-Grid-col ms-sm12 ms-md4 block">
              <p>You must click on the "hamburger" icon (top left) to open it.</p>  
            </div> 
            <div className="ms-Grid-col ms-sm12 ms-md4 block">
              <p>The sidebar will hide a part of the page content.</p>
            </div>
          </div>
        </div>
      </div>
    );
  } 
}