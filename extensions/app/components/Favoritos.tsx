import * as React from 'react';
import { CategoryListItens } from '../AppApplicationCustomizer';

export interface IFavoritosProps {}

export default class Favoritos extends React.Component<IFavoritosProps> {
  constructor(props: IFavoritosProps) {  
    super(props);
  }

  public render() {
    return (
      <div className="ms-Grid-row w3-container spaceBotton">
        <div className="ms-Grid-col ms-md1 block"></div> 
          <div id="CategoryListItens"><CategoryListItens/></div> 
        <div className="ms-Grid-col ms-md1 block"></div> 
          <div id="ReportListItens"></div>          
      </div>
    );
  } 
}