import * as React from 'react';
import * as ReactDOM from "react-dom";
import * as $ from "jquery";

import { BrowserRouter as Router, Switch, Route, Link, HashRouter, Redirect } from 'react-router-dom';

import Favoritos from './Favoritos';
import Downloads from './Downloads';
import Categoria from './Categoria';
import Detalhes from './Detalhes';
import DetalhesDocumento from './DetalhesDocumento';
import {language, setLoggedIn, logOut, setLanguage, showCategory, relativeSiteUrl, currentUserInfo, webTitle, absoluteWebUrl, setCategory, selectedCategory } from '../AppApplicationCustomizer';
import LandingPage from './LandingPage';
import FloatNav from './FloatNav';

export interface IMainProps {}

let categoryCollection;
let reportCollection;
let usersCollection;
let reportTileBox;
let btnUpdateFavorite;
let btnAddFavorite;

// Aguarda para garantir que elementos padrão do SharePoint sejam renderizados primeiro
export function sleep (time) {      
  return new Promise((resolve) => setTimeout(resolve, time));
}

export default class Main extends React.Component<IMainProps> {
  constructor(props: IMainProps) {  
    super(props);

    setLoggedIn(true);

    // Use for production enviroment - Obtém os dados da lista de Categorias pelo internal list name
    this.getCategoryListItems('reportCategories');
    
    // Use for development enviroment - Obtém os dados da lista de Categorias pelo display list name
    // this.getCategoryListItems('Categorias e Menu');

     this.getReportListItems('reports'); // display list name;     

    sleep(1000).then(() => {

      var header = document.createElement("DIV");
      header.innerHTML = `<div class='header'><div class='logoHeader'></div><div id='webTitle'>${webTitle}</div></div>`; 
      document.getElementsByClassName('_71hjFgizWk0Cd55RzerwA')[0].appendChild(header);

      // Remove o menu padrão do Office 365 no canto superior esquerdo
      // A classe _2kc0c9nP-qti6fefMCFonk no arquivo app.css atualmente oculta este item;
      // Utilizar descomentar o trech abaixo caso o nome da classe seja alterado
      // var O365NavMenu = document.getElementById('O365_NavHeader');
      // O365NavMenu.children[0].remove();
      
      // Cria um elemento
      const sideNavElements = <div><div className="sideNavLogo"></div><SideNav /></div>;
      
      //Renderiza o dentro da tag SideNav
      ReactDOM.render(sideNavElements, document.getElementById('sideNav')); 
      
      // Barra de ferramenta padrão de edição das páginas
      let pageCommandBar = document.getElementsByClassName("commandBarWrapper")[0];
      let topPlaceHolder = document.querySelector("[data-sp-placeholder='Top']");
            
      // Menu superior nativo do SharePoint
      let sharepointTopMenu = document.querySelector("[role='banner']");
      let pageHeader = document.querySelector("[data-automation-id='pageHeader']");
      
      if(!location.href.match('.aspx')){
        pageCommandBar.classList.add("hiddenCommandBar");
        sharepointTopMenu.classList.add("hiddenCommandBar");
        topPlaceHolder.className = "topPlaceHolder-h100";        
      }
      else{
        pageCommandBar.classList.remove("hiddenCommandBar");
        sharepointTopMenu.classList.remove("hiddenCommandBar");

        pageHeader.classList.add("hiddenCommandBar");
          // if(!location.href.match('edit'))
          //   topPlaceHolder.className = "hiddenTopPlaceHolder";
      }
    });
  }

  private getCategoryListItems(listName){    
    var reactHandler = this;    

    var spRequest = new XMLHttpRequest();    
    spRequest.open('GET', `${relativeSiteUrl}/_api/web/lists/getbytitle('${listName}')/items`,true);    
    spRequest.setRequestHeader("Accept","application/json");  
                        
    spRequest.onreadystatechange = () =>{
        if (spRequest.readyState === 4 && spRequest.status === 200){    
            var result = JSON.parse(spRequest.responseText);    
                
            reactHandler.setState({    
                items: result.value  
            }); 
            
            categoryCollection = result.value;
        }    
        else if (spRequest.readyState === 4 && spRequest.status !== 200){    
            console.log('Error Occured !');    
        }    
    };    
    spRequest.send();    
  }

  private getReportListItems(listName){ 
    var reactHandler = this;    

    var spRequest = new XMLHttpRequest();    
    spRequest.open('GET', `${relativeSiteUrl}/_api/web/lists/getbytitle('${listName}')/items`,true);    
    spRequest.setRequestHeader("Accept","application/json");  
                        
    spRequest.onreadystatechange = () =>{
        if (spRequest.readyState === 4 && spRequest.status === 200){    
          var result = JSON.parse(spRequest.responseText);    
              
          reactHandler.setState({    
              items: result.value  
          }); 
          
          reportCollection = result.value;
        }    
        else if (spRequest.readyState === 4 && spRequest.status !== 200){    
            console.log('Error Occured !');    
        }    
    };    
    spRequest.send();    
  }

  private OpenCloseSideNav(){
    var element = document.getElementById("sideNav"); 
    element.classList.toggle("sideNav");

    language == "pt"?
      document.getElementById("btnTranslateEN-small").style.opacity = "0.3"
    :
      document.getElementById("btnTranslatePT-small").style.opacity = "0.3";        
  }  

  public render() {

    setTimeout(() => { 
      let loadScreen = document.getElementById('loadScreen');
      loadScreen.remove();

      let sharepointTopNav = document.getElementById('spPageCanvasContent');
      sharepointTopNav.classList.remove("initialContentOverlay");
    }, 1500);

    return (
      <div>        
        {location.href.match('category') ? <FloatNav/> : null }          
        <HashRouter>   
          <nav className="w3-sidebar w3-bar-block w3-card w3-animate-left" id="sideNav"> 
          </nav>  
          <div> 
            {/* Define o componente padrão a ser exibido ao carregar a página */}
            {/* A estrutura de endereço URL e roteamento dos componentes não adiciona nenhuma extensão em nome de arquivos, 
            portanto, se não há uma extensão, define-se a rota para o componente inicial desejado */}
            {!location.href.match('.aspx') ?
              <Redirect exact from="/#" to="favoritos" />
            :
              null
            }

            {/* Se o usuário está voltando de outro link visitado no contexto do portal, neste caso, a página de relatórios */}
            {document.referrer.match('.aspx') ?
              // Se o usuário alternar entre os links do menu flutuante, substitui a url sem direcionar para outro componente 
              location.href.match('category') ?
                null
              :              
                <div>
                  {/* obtém a categria que foi clicada no menu lateral e armazenada localmente e então envia o resultado obtido
                  como argumento do método SetCategory para a variável selectedCategory */}
                  {setCategory(localStorage.getItem("selectedCategory"))}

                  {/* Após a variável ser atualizada, redireciona para o componente adequado */}
                  {selectedCategory == "Downloads" ?
                    <Redirect exact from="/#" to="downloads" />
                  :
                    selectedCategory == "Favoritos" ?
                      <Redirect exact from="/#" to="favoritos" />
                    :                  
                      selectedCategory == "Favorites" ?
                        <Redirect exact from="/#" to="favoritos" />
                    :
                      <Redirect exact from="/#" to="categoria" />
                  }
                </div>
            :
              null              
            }
            
            <Switch>  
              <Route path='/landingPage' component={LandingPage} />                   
              <Route path='/favoritos' component={Favoritos} />
              <Route path='/downloads' component={Downloads} />
              <Route path='/categoria' component={Categoria} />
              <Route path='/detalhes' component={Detalhes} />
              <Route path='/detalhesDocumento' component={DetalhesDocumento} />                     
            </Switch> 
          </div> 
        </HashRouter>
        <div><button onClick={this.OpenCloseSideNav} className="w3-xlarge btnOpenNav">☰<span>Menu</span></button></div>        
      </div>
    );
  }
}

export function addFavoriteItem(reportTitle, userlogin, tileBoxId) {

  var listName = "favorites";
  var url = absoluteWebUrl;

  // Obtém o tile (box dos relatórios) da página de acordo com o ID fornecido
  reportTileBox = document.getElementById(tileBoxId);

  btnAddFavorite = document.getElementById('btnAddFavorite' + tileBoxId);
  btnUpdateFavorite = document.getElementById('btnUpdateFavorite' + tileBoxId);

    // Obtém os items da lista
  getListItems(listName, url, (data) => {
    
    let favoriteListItems = data.d.results;

    if(favoriteListItems.length > 0){
      favoriteListItems.forEach(checkItem);
    }
    else{
      createListItem(reportTitle, userlogin);
      reportTileBox.setAttribute('data-favorite-checked', 'true');
    }

    function checkItem(item) {
      if(reportTitle == item.Title && item.userName != userlogin){
        createListItem(reportTitle, userlogin);
        if(reportTileBox != null)
          reportTileBox.setAttribute('data-favorite-checked', 'true');        
      }
      else if(reportTitle == item.Title && item.userName == userlogin) {
        return;
      }
      else if(reportTitle != item.Title && item.userName != userlogin) {
        createListItem(reportTitle, userlogin);
        if(reportTileBox != null)
          reportTileBox.setAttribute('data-favorite-checked', 'true');
      }
      else if(reportTitle != item.Title && item.userName == userlogin) {
        createListItem(reportTitle, userlogin);
        if(reportTileBox != null)
          reportTileBox.setAttribute('data-favorite-checked', 'true');
      }         
    }

    if(btnAddFavorite != null && btnUpdateFavorite != null){
      // Oculta botão para adicionar
      btnAddFavorite.classList.add('hiddenButton');
      btnAddFavorite.classList.remove('visibleButton');

      // Exibe botão para atualizar
      btnUpdateFavorite.classList.add('visibleButton');
      btnUpdateFavorite.classList.remove('hiddenButton');
    }    
  }, (data) => {
      alert("Ocorreu um erro!");
  });    
}

// Cria o item na lista de favoritos
function createListItem(reportTitle, userlogin){
  return getFormDigest(absoluteWebUrl).then((data) => {
    $.ajax ({
      url: absoluteWebUrl + "/_api/web/lists/GetByTitle('favorites')/items",  
        type: "POST",  
        data: JSON.stringify({ __metadata: { type: "SP.Data.FavoritesListItem" }, Title: reportTitle, userName: userlogin}),

        headers:  
        {  
            "Accept": "application/json;odata=verbose",  
            "Content-Type": "application/json;odata=verbose",  
            "X-RequestDigest": data.d.GetContextWebInformation.FormDigestValue,  
            "X-HTTP-Method": "POST"  
        },
        
        // success: (data, status, xhr) =>{
        //   console.log("O item foi adicionado aos favoritos");
        // },

        success: (status, xhr) =>{
          console.log("O item foi adicionado aos favoritos");
        },

        error: (xhr, status, error) => {
          console.log(JSON.stringify(error));
        }
    });              
  });
}

// Obtém a lista dos itens favoritados
export function getFavoriteItems() {
  var listName = "favorites";
  var url = absoluteWebUrl;

  getListItems(listName, url, (data) => {

      let favoriteItemsCollection = data.d.results;

      // Obtém os relatórios visíveis na tela
      reportTileBox = document.getElementsByClassName('tileBox');

      let favoriteItensMessage = document.getElementById('favoriteItensMessage');

      favoriteItemsCollection.forEach(checkFavoriteItems);

      function checkFavoriteItems(element) {
        for(let i = 0; i < reportTileBox.length; i++){      
          if(element.Title == document.getElementsByClassName('reportTitle')[i].innerHTML){
            if(element.userName == currentUserInfo.userLoginName){
              reportTileBox[i].setAttribute('data-favorite-checked', 'true');              
              favoriteItensMessage.style.display="none";
            }              
          }          
        }
      }
      
      showOnlyFavorites();
      
  }, (data) => {
      alert("Ocorreu um erro!");
  });
}

// Obtém a lista dos itens favoritados
export function getFavoriteItemsByCategory() {
  var listName = "favorites";
  var url = absoluteWebUrl;

  getListItems(listName, url, (data) => {
      let favoriteItems = data.d.results;

      // Obtém os relatórios visíveis na tela
      reportTileBox = document.getElementsByClassName('tileBox');

      favoriteItems.forEach(checkFavoriteItems);

      function checkFavoriteItems(element) {
        for(let i = 0; i < reportTileBox.length; i++){      
          if(element.Title == document.getElementsByClassName('reportTitle')[i].innerHTML){
            if(element.userName == currentUserInfo.userLoginName)
              reportTileBox[i].setAttribute('data-favorite-checked', 'true');            
          }          
        }
      }
      
      for(let i = 0; i < favoriteItems.length; i++){

        btnUpdateFavorite = document.getElementsByClassName('btnUpdateFavorite')[i];
        btnAddFavorite = document.getElementsByClassName('btnFavorite')[i];

        if(reportTileBox[i] != null){
          if(reportTileBox[i].getAttribute('data-favorite-checked') == "true"){
            if(btnUpdateFavorite != null || btnAddFavorite != null){
              // Oculta botão para adicionar
              btnAddFavorite.classList.add('hiddenButton');

              // Exibe botão para atualizar
              btnUpdateFavorite.classList.add('visibleButton');
            }          
          }
        }
      }
      
  }, (data) => {
      alert("Ocorreu um erro!");
  });
}

// Atualiza o item na lista de favoritos
export function uptadeFavoriteItem(reportTitle, userlogin, tileBoxId) {

  var listName = "favorites";
  var url = absoluteWebUrl;

  // Obtém o conjunto de todos os box na tela
  let reportTileBoxCollection = document.getElementsByClassName('tileBox');

  // Exibe mensagem para o usuário
  let favoriteItensMessage = document.getElementById('favoriteItensMessage');
  
  // Obtém o tile (box dos relatórios) da página de acordo com o ID fornecido
  reportTileBox = document.getElementById(tileBoxId);

  btnAddFavorite = document.getElementById('btnAddFavorite' + tileBoxId);
  btnUpdateFavorite = document.getElementById('btnUpdateFavorite' + tileBoxId);

  // Obtém os items da lista
  getListItems(listName, url, (data) => {
    
    let favoriteListItems = data.d.results;

    if(favoriteListItems.length > 0){
      favoriteListItems.forEach(checkItem);
    }
    else{
      createListItem(reportTitle, userlogin);
      reportTileBox.setAttribute('data-favorite-checked', 'true');
    }

    function checkItem(item) {
      
      if(reportTitle == item.Title){
        if(item.userName == userlogin){

          deleteListItemById(item.Id);
          
          if(location.href.match('favoritos')){
            reportTileBox.parentElement.remove();

            if(reportTileBoxCollection.length == 0){
              favoriteItensMessage.style.display="block";
            }
          }
          else{
            reportTileBox.setAttribute('data-favorite-checked', 'false');

            // Exibe botão para adicionar
            btnAddFavorite.classList.add('visibleButton');
            btnAddFavorite.classList.remove('hiddenButton');

            // Oculta botão para atualizar
            btnUpdateFavorite.classList.remove('visibleButton');
            btnUpdateFavorite.classList.add('hiddenButton');
          }
        }        
      }     
    }    
  }, (data) => {
      alert("Ocorreu um erro!");
  });  
}

// Remove o item na lista de favoritos
function deleteListItemById(itemId) {

  return getFormDigest(absoluteWebUrl).then((data) => {
    $.ajax ({
        url: absoluteWebUrl + "/_api/web/lists/GetByTitle('favorites')/items(" + itemId + ")",    
        type: "POST",  
        headers:  
        {  
            "X-RequestDigest": data.d.GetContextWebInformation.FormDigestValue,  
            "IF-MATCH": "*",  
            "X-HTTP-Method": "DELETE"  
        },

        // success: (data, status, xhr) => {
        //   console.log("O item foi removido dos favoritos");
        // },
        
        success: (status, xhr) => {
          console.log("O item foi removido dos favoritos");
        },

        error: (xhr, status, error) => {
          console.log("Ocorreu um erro");
        }
    });
  });
}

function getFormDigest(webUrl) {
  return $.ajax({
      url: webUrl + "/_api/contextinfo",
      method: "POST",
      headers: { "Accept": "application/json; odata=verbose" }
  });
}

function getListItems(listName, siteurl, success, failure) {
  $.ajax({
      url: siteurl + "/_api/web/lists/GetByTitle('" + listName + "')/items?$select=Title, Id, userName",
      method: "GET",
      headers: { "Accept": "application/json; odata=verbose" },
      success: (data) => {
          success(data);
      },
      error: (data) => {
          failure(data);
      }      
  });
}

export function showOnlyFavorites(){
  reportTileBox = document.getElementsByClassName('tileBox');
  
  for(let i = 0; i <= reportTileBox.length; i++){
    if(reportTileBox.length == 1){
      if(reportTileBox[0].getAttribute('data-favorite-checked') == "false"){
        //reportTileBox[i].parentElement.classList.add('hiddenReportTileBox');
        reportTileBox[0].parentElement.remove();
      }
    }
    else{
      if(reportTileBox[i].getAttribute('data-favorite-checked') == "false"){
        reportTileBox[i].parentElement.remove();
      }
    }    
  }
}

function checkUsersPermission(itemTitle) {
  let reportCategory; 
  
  // Itera pela lista Reports
  if(reportCollection != undefined){
    for (let i=0; i < reportCollection.length; i++){
      // Verifica o idioma atualmente selecionado
      if(language == "pt"){
        if(reportCollection[i].categoryLookupValue != null)
          reportCategory = reportCollection[i].categoryLookupValue.trim();
      }
      else{
        if(reportCollection[i].categoryENLookupValue != null)
          reportCategory = reportCollection[i].categoryENLookupValue.trim();
      }
  
      // Verifica se há algum relatório na lista, relacionado à categoria informada no parâmetro da função
      if(reportCategory == itemTitle){
        if(reportCollection[i].usersList != null){
          usersCollection = reportCollection[i].usersList.split(';');
  
          for (let j=0; j < usersCollection.length; j++){
            if(currentUserInfo.userLoginName == usersCollection[j].trim() || currentUserInfo.userLoginName == usersCollection[j].trim()){
              console.log('Usuário autorizado no item: ' + itemTitle);
              return true;           
            }
          }
        }
      }
    }
  }
}

class SideNav extends React.Component{    
  public render(){

    const headings = categoryCollection.map((item) =>
      <li key={item.Id}>
        <HashRouter>  
          {/* A coluna linkPath armazena os parâmetros a serem utilzados para referenciar o componente de cada categoria */}
          {/* a função normalize() combinada com a regex converte acentos e cedilha para caracteres não acentuados e "c". */}
          {item.linkType == "Top link" ? 
            language == "pt" ?
              <Link to={`/${item.linkPath.normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`} 
                className="w3-bar-item w3-button sideNavHeading" onClick={() => showCategory(item.Title)}>                
                {/* A coluna linkTitle0 armazena o título do link a ser exibido no menu */}
                <div className="sideNavIcons" style = {{background: `url(${item.icon}) no-repeat center center`}}></div>
                <span>{item.Title}</span>
              </Link>
            :
              <Link to={`/${item.linkPath.normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`} 
                className="w3-bar-item w3-button sideNavHeading" onClick={() => showCategory(item.titleEN)}>
                {/* A coluna linkTitle0 armazena o título do link a ser exibido no menu */}
                <div className="sideNavIcons" style = {{background: `url(${item.icon}) no-repeat center center`}}></div>
                <span>{item.titleEN}</span>
              </Link>            
          : null}
          {item.linkType == "Heading" ? 
            <div className="sideNavHeading">
              <li className="spacerTop"></li>
              {/* A coluna linkTitle0 armazena o título do link a ser exibido no menu */}
              <div className="sideNavIcons" style = {{background: `url(${item.icon}) no-repeat center center`}}></div>
              {item.Title}
            </div>
          : null}                    
        </HashRouter>          
      </li>);
      const subLinks = categoryCollection.map((item) =>
      <li key={item.Id}>    
      <HashRouter>          
        {item.linkType == "Sublink" ?             
          <li>
            {language == 'pt' ?
              <div>
                {checkUsersPermission(item.Title.trim()) == true ?
                  <Link to={`/categoria`}                 
                    className="w3-bar-item w3-button" onClick={() => showCategory(item.Title)}>
                    {/* A coluna linkTitle0 armazena o título do link a ser exibido no menu */}                 
                    <span>{item.Title}</span>              
                  </Link>
                : 
                  null
                }           
              </div>
            : 
              <div>
                {checkUsersPermission(item.titleEN.trim()) == true ?
                  <Link to={`/categoria`}                 
                    className="w3-bar-item w3-button" onClick={() => showCategory(item.titleEN)}>
                    {/* A coluna titleEN armazena o título do link a ser exibido no menu */}
                    <span>{item.titleEN}</span>
                  </Link>
                :
                  null
                }
              </div>
            }
          </li>              
        : null}        
      </HashRouter>          
    </li>); 
    
    return( 
      <ul className="sideNavBottom">
        <li>
          {headings}
          <ul id="sublinks" className="sideNavSubLinks">
            {subLinks}  
          </ul>
        </li>
        <li className="spacerBottom"></li>
          <HashRouter>  
            <li>    
              {language == 'pt' ?    
                <Link to={'/landingPage'} onClick={() => logOut()}
                  className="w3-bar-item w3-button sideNavLinkBottom">
                  <div className="sideNavIcons logoutIcon"></div>
                  <span>Sair</span>
                </Link> 
              :
                <Link to={'/landingPage'} onClick={() => logOut()}
                  className="w3-bar-item w3-button sideNavLinkBottom">
                  <div className="sideNavIcons logoutIcon"></div>
                  <span>Logout</span>
                </Link> 
              }  
            </li>      
          </HashRouter>
        <div className="btnTranslateContainer-small">
          <button id="btnTranslatePT-small" onClick={() => setLanguage('language', 'pt', 365, '/')} className="btnTranslatePT-small" title="Português"></button> 
          <button id="btnTranslateEN-small" onClick={() => setLanguage('language', 'en', 365, '/')} className="btnTranslateEN-small" title="English"></button>       
        </div>  
      </ul>
    );
  }
}