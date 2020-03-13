import * as React from 'react';
import { CategoryListItens, checkFavoriteItens, FavoriteListItens, FavoriteCategoryListItens, language, setCategory, selectedCategory } from '../AppApplicationCustomizer';

export interface IFavoritosProps {}

function showOnlyFavorites(){
  let reportTileBox = document.getElementsByClassName('tileBox');

  for(let i = 0; i < reportTileBox.length; i++){
    if(reportTileBox[i].getAttribute('data-favorite-checked') == "false"){
      reportTileBox[i].parentElement.classList.add('hiddenReportTileBox');
    }
  }
}

// Aguarda para garantir que elementos padrão do SharePoint sejam renderizados primeiro
function sleep (time) {      
  return new Promise((resolve) => setTimeout(resolve, time));
}

export default class Favoritos extends React.Component<IFavoritosProps> {
  constructor(props: IFavoritosProps) {  
    super(props);

    setCategory(selectedCategory);

    sleep(100).then(() => {
      checkFavoriteItens();
      showOnlyFavorites();
    });
  }

  public render() {
    return (
      <div id="customContent" className="ms-Grid-row w3-container content">
        <div className="ms-Grid-col ms-md1 block"></div> 
          <div id="CategoryListItens"><FavoriteCategoryListItens/></div> 
        <div className="ms-Grid-col ms-md1 block"></div> 
          <div id="ReportListItens"><FavoriteListItens/></div>          
      </div>
    );
  } 
}