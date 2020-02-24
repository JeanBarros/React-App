import * as React from 'react';
import { ReportListItens, CategoryListItens } from '../AppApplicationCustomizer';

export interface IControladoriaProps {} 

export default class Controladoria extends React.Component<IControladoriaProps> {  
  constructor(props: IControladoriaProps) {  
      super(props);
  }

  public render() {    
    return (
      <div className="ms-Grid-row w3-container spaceBotton">
        <div className="ms-Grid-col ms-md1 block"></div> 
          <div id="CategoryListItens"><CategoryListItens/></div> 
        <div className="ms-Grid-col ms-md1 block"></div> 
          <div id="ReportListItens"><ReportListItens/></div>          
      </div>
    );
  } 
}