import * as React from 'react';
import { ReportListItens, CategoryListItens, checkFavoriteItens, setCategory, language, selectedCategory } from '../AppApplicationCustomizer';
import * as ReactDOM from 'react-dom';
import { checkPermissions } from './Main';

export interface IComercialProps {} 

// Aguarda para garantir que elementos padrão do SharePoint sejam renderizados primeiro
function sleep (time) {      
  return new Promise((resolve) => setTimeout(resolve, time));
}

export default class Comercial extends React.Component<IComercialProps> {  
  constructor(props: IComercialProps) {  
      super(props);

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