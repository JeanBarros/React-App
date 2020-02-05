import * as React from 'react';
import { ReportListItens } from '../AppApplicationCustomizer';

export interface IControladoriaProps {}   

export default class Controladoria extends React.Component<IControladoriaProps> {  
  constructor(props: IControladoriaProps) {  
    super(props);
  }

  public render() {    
    return (
      <div className="ms-Grid-row w3-container spaceBotton">
        <div className="ms-Grid-col ms-md1 block"></div> 
          <div className="ms-Grid-col ms-sm12 ms-md10 block pageDescription">
            <div id="categoryName">Controladoria</div>
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