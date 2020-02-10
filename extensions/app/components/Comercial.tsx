import * as React from 'react';
import { ReportListItens, showCategory, Welcome, SharePointWebTitle, CategoryListItens } from '../AppApplicationCustomizer';


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
        <CategoryListItens></CategoryListItens> 
        <div className="ms-Grid-col ms-md1 block"></div> 
          <ReportListItens></ReportListItens>
      </div>
    );
  } 
}