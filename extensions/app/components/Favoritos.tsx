import * as React from 'react';
import { checkFavoriteItens, FavoriteListItens, FavoriteCategoryListItens, language, setCategory, selectedCategory } from '../AppApplicationCustomizer';
import * as ReactDOM from 'react-dom';

export interface IFavoritosProps {}

let favoriteItensMessage;

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

    sleep(500).then(() => {

      // Cria os elementos
      const favoriteReportsDescription = <FavoriteCategoryListItens />;
      const favoriteReports = <FavoriteListItens />;      
      
      //Renderiza os elementos criados dentro das tags
      ReactDOM.render(favoriteReportsDescription, document.getElementById('CategoryListItens'));
      ReactDOM.render(favoriteReports, document.getElementById('ReportListItens'));      

      checkFavoriteItens();
      showOnlyFavorites();

      if(localStorage.getItem('favoriteItems') != null){
        favoriteItensMessage = document.getElementById('favoriteItensMessage');
        favoriteItensMessage.style.display="none";  
      }
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