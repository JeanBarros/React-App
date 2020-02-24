import * as React from 'react';
import { ReportListItens, CategoryListItens } from '../AppApplicationCustomizer';

export interface IComercialProps {} 

export default class Comercial extends React.Component<IComercialProps> {  
  constructor(props: IComercialProps) {  
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