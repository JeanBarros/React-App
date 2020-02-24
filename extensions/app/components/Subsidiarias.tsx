import * as React from 'react';
import { ReportListItens, CategoryListItens } from "../AppApplicationCustomizer";

export interface ISubsidiariasProps {}   

export default class Subsidiarias extends React.Component<ISubsidiariasProps> {  
  constructor(props: ISubsidiariasProps) {  
    super(props);
  }

  public render() {    
    return (
      <div id="customContent" className="ms-Grid-row w3-container content">
        <div className="ms-Grid-col ms-md1 block"></div> 
          <div id="CategoryListItens"><CategoryListItens/></div> 
        <div className="ms-Grid-col ms-md1 block"></div> 
          <div id="ReportListItens"><ReportListItens/></div>          
      </div>
    );
  } 
}