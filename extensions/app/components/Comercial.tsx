import * as React from 'react';
import { ReportListItens, showCategory, Welcome, SharePointWebTitle } from '../AppApplicationCustomizer';
import * as ReactDOM from 'react-dom';
import Favoritos from './Favoritos';

export interface IComercialProps {}   

export default class Comercial extends React.Component<IComercialProps> {  
  constructor(props: IComercialProps) {  
    super(props);

    var categoryDescription = document.createElement("DIV");
    categoryDescription.innerHTML = `<div id='categoryDescription' class='categoryDescription'>
      
    </div>`;
    
    document.getElementsByClassName('ms-SPLegacyFabricBlock')[0].appendChild(categoryDescription); 
    //ReactDOM.render(<SharePointWebTitle />, document.getElementById('categoryDescription'));
  }

  public render() {

    //document.getElementById('categoryDescription').innerHTML = "XXX";
    
    return (
      <div className="ms-Grid-row w3-container spaceBotton">
        <div className="ms-Grid-col ms-md1 block"></div> 
          <div className="ms-Grid-col ms-sm12 ms-md10 block pageDescription">
            <div id="categoryName">Comercial</div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultrices dapibus egestas. 
              Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. 
              Vivamus efficitur urna vel velit porttitor tempus. Aliquam arcu orci, laoreet a tortor in, 
              sollicitudin blandit ex. Ut dapibus dui vel nulla efficitur, posuere venenatis leo volutpat. 
              Mauris vel interdum felis. Duis iaculis blandit lacus eget pellentesque.</p>
          </div> 
        <div className="ms-Grid-col ms-md1 block"></div> 
          <ReportListItens></ReportListItens>
      </div>
    );
  } 
}