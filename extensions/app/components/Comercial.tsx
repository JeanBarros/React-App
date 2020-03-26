import * as React from 'react';
import { ReportListItens, CategoryListItens, checkFavoriteItens, setCategory, selectedCategory, absoluteWebUrl } from '../AppApplicationCustomizer';
import { BrowserRouter as Redirect } from 'react-router-dom';
import * as ReactDOM from 'react-dom';
import { sleep } from './Main';

export interface IComercialProps {} 

export default class Comercial extends React.Component<IComercialProps> {  
  constructor(props: IComercialProps) {  
      super(props);

      if(location.href.match('.aspx')){
        window.location.replace(absoluteWebUrl);
      }      

      setCategory(selectedCategory);

      sleep(200).then(() => { 
        
      // Cria os elementos
      const categoryListElements = <CategoryListItens />;
      const reportListElements = <ReportListItens />;
      
      //Renderiza os elementos criados dentro das tags
      ReactDOM.render(categoryListElements, document.getElementById('CategoryListItens'));
      ReactDOM.render(reportListElements, document.getElementById('ReportListItens'));

      checkFavoriteItens();        
      });
    }

    public render() {
      return (
        <div id="customContent" className="ms-Grid-row w3-container content">
          <div className="ms-Grid-col ms-md1 block"></div> 
            <div id="CategoryListItens"></div> 
            <div className="ms-Grid-col ms-md1 block"></div> 
            <div id="ReportListItens"></div>
        </div>        
      );
    } 
}