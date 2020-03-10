import * as React from 'react';
import { ReportListItens, CategoryListItens, checkFavoriteItens } from '../AppApplicationCustomizer';

export interface IComercialProps {} 

// Aguarda para garantir que elementos padrão do SharePoint sejam renderizados primeiro
function sleep (time) {      
  return new Promise((resolve) => setTimeout(resolve, time));
}

export default class Comercial extends React.Component<IComercialProps> {  
  constructor(props: IComercialProps) {  
      super(props);

      
      sleep(500).then(() => {
        checkFavoriteItens()
      });
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