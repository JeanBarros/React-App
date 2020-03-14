import * as React from 'react';
import { ReportListItens, CategoryListItens, setCategory, selectedCategory, checkFavoriteItens } from '../AppApplicationCustomizer';

export interface IMinaProps {}

// Aguarda para garantir que elementos padrão do SharePoint sejam renderizados primeiro
function sleep (time) {      
  return new Promise((resolve) => setTimeout(resolve, time));
}

export default class Mina extends React.Component<IMinaProps> {  
  constructor(props: IMinaProps) {  
    super(props);

    setCategory(selectedCategory);

      sleep(500).then(() => {      
        checkFavoriteItens();
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