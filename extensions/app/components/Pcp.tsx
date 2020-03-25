import * as React from 'react';
import { ReportListItens, CategoryListItens, setCategory, selectedCategory, checkFavoriteItens, absoluteWebUrl } from '../AppApplicationCustomizer';
import { sleep } from './Main';
import * as ReactDOM from 'react-dom';

export interface IPcpProps {}   

export default class Pcp extends React.Component<IPcpProps> {  
  constructor(props: IPcpProps) {  
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