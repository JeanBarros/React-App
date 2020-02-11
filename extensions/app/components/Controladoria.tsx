import * as React from 'react';
import { ReportListItens, CategoryListItens } from '../AppApplicationCustomizer';

export interface IControladoriaProps {}   

export default class Controladoria extends React.Component<IControladoriaProps> {  
  constructor(props: IControladoriaProps) {  
    super(props);

    var categoryDescription = document.createElement("DIV");
    categoryDescription.innerHTML = `<div id='categoryDescription' class='categoryDescription'>
      
    </div>`;
    
    document.getElementsByClassName('ms-SPLegacyFabricBlock')[0].appendChild(categoryDescription);
  }

  public render() {    
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