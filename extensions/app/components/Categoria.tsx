import * as React from 'react';
import { selectedCategory, absoluteWebUrl, showCategory } from '../AppApplicationCustomizer';
import { sleep } from './Main';

export interface ICategoriaProps {}

export default class Categoria extends React.Component<ICategoriaProps> { 
  
  constructor(props: ICategoriaProps) {  
      super(props);
      
      // if(location.href.match('.aspx')){
      //   window.location.replace(absoluteWebUrl);
      // }      

      sleep(200).then(() => { 
        
       showCategory(selectedCategory);
       
       let sideNavPane = document.getElementById("sideNav"); 
       sideNavPane.classList.toggle("sideNav");
            
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