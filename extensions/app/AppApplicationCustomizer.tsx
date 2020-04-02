import { override } from '@microsoft/decorators';  
import * as React from 'react';  
import * as ReactDOM from "react-dom"; 
import * as moment from 'moment';
import {  
  BaseApplicationCustomizer,  
  PlaceholderContent,  
  PlaceholderName
} from '@microsoft/sp-application-base';

import Main, { IMainProps } from './Components/Main';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { BrowserRouter as Router, Link, HashRouter } from 'react-router-dom';
import LandingPage, { ILandingPageProps } from './Components/LandingPage';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IAppApplicationCustomizerProps {
  // This is an example; replace with your own property
  Top: string;
}

export interface ISPLists {  
  value: ISPList[];  
}  

export interface ISPList {}

export let webTitle;
export let clienteContext;
export let absoluteWebUrl;
export let relativeSiteUrl;
export let currentUserInfo;
export let reportListItens;
export let categoryListItens;
export let selectedCategory;
export let selectedReport;
export let tileBoxId;
export let language;
export let isLogged;
export let myFavorites;
let favoriteReportButton;
let reportTitle;
let reportTileBox;
let sharepointTopNav;

export function setCategory(category){
  selectedCategory = category;
}

export const setLanguage = (name, value, days = 7, path = '/') => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=' + path;

  location.reload();  
};

export const getCookie = (name) => {
  return document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=');
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, '');
};

export const setLoggedIn = (value) => {
  document.cookie = 'loggedIn=' + encodeURIComponent(value) + '; path=/';
};

export function logOut(){
  setLoggedIn(false);
  window.location.replace(absoluteWebUrl);
  //location.reload();
}

export function getDashboard(pageTitle, categoryName){
  var content = document.getElementById('customContent');
  if (content != null)
      content.style.display='none';

  window.location.replace(`${relativeSiteUrl}/SitePages/${pageTitle}.aspx?category=${categoryName}`);
}

export function getDetails(reportTitleDetails:string, reportTileId) {
  selectedReport = reportTitleDetails.trim();
  tileBoxId = reportTileId;
}

// Aguarda para garantir que os dados da lista sejam retornados antes de utilizá-los nos componentes
function sleep (time) {      
  return new Promise((resolve) => setTimeout(resolve, time));
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class AppApplicationCustomizer
  extends BaseApplicationCustomizer<IAppApplicationCustomizerProps> {
    private _topPlaceholder: PlaceholderContent | undefined;
  public domElement: any;

    constructor(){
      super();

      language = getCookie('language');
      console.log('Language: ' + language);

      isLogged = getCookie('loggedIn');
      console.log('Is logged: ' + isLogged);

      var head = document.getElementsByTagName('HEAD')[0];

      var appStyle = document.createElement('link'); 
      appStyle.rel = 'stylesheet'; 
      appStyle.type = 'text/css'; 
      appStyle.href = '/sites/Lab02/Style%20Library/app.css';  

      var sideNavStyle = document.createElement('link'); 
      sideNavStyle.rel = 'stylesheet'; 
      sideNavStyle.type = 'text/css'; 
      sideNavStyle.href = '/sites/Lab02/Style%20Library/sideNav.css';
      
      var jQuery=document.createElement('script');
      jQuery.setAttribute("type","text/javascript");
      jQuery.setAttribute("src", "https://code.jquery.com/jquery-3.4.1.js");
      
      // Append link element to HTML head 
      head.appendChild(appStyle);
      head.appendChild(sideNavStyle);
      head.appendChild(jQuery);

      // Define qual será o primeiro componente a ser exibido, de acordo com o idioma
      language == "pt" ?
        selectedCategory = "Favoritos"
      :
        selectedCategory = "Favorites";      
    } 
    
    @override  
    public onInit(): Promise<void> { 

      if(isLogged == "true"){
        sharepointTopNav = document.getElementById('spPageCanvasContent');
        sharepointTopNav.className = "initialContentOverlay";
      
        // sharepointTopNav = document.getElementById('spPageCanvasContent');
        // sharepointTopNav.innerText='Por favor, aguarde...';
      }      
      
      this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders);
      return Promise.resolve<void>();  
    }

    private _getListData(listName: string): Promise<ISPLists> {  
      return this.context.spHttpClient.get(`${this.context.pageContext.web.absoluteUrl}/_api/lists/GetByTitle('${listName}')/items`,  
      SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {   
        debugger; 
        return response.json();  
      });  
    }

    private _renderReportList(listName:string): void {        
      this._getListData(listName)  
        .then((response) => {
          reportListItens = response.value;
          //console.log(reportListItens);          
      });        
    }
    
    private _renderCategoryList(listName:string): void {        
      this._getListData(listName)  
        .then((response) => {
          categoryListItens = response.value;
          //console.log(categoryListItens);
      });        
    }

    private _renderPlaceHolders(): void {  
      // Handling the top placeholder  
      if (!this._topPlaceholder)   
      {  
        this._topPlaceholder = this.context.placeholderProvider.tryCreateContent(  
          PlaceholderName.Top,  
          { onDispose: this._onDispose }  
        );  
   // The extension should not assume that the expected placeholder is available.  
        if (!this._topPlaceholder)   
        {  
          console.error("The expected placeholder (Top) was not found.");  
          return;  
        }  
        if (this.properties) {  
          let topString: string = this.properties.Top;  
          if (!topString) {  
            topString = "(Top property was not defined.)";  
          }  
          if (this._topPlaceholder.domElement) { 

            // Use for production enviroment
            // this._renderReportList('reports'); // interbal list name
            // this._renderCategoryList('reportCategories'); // internal list name

            // Use for development enviroment
            this._renderReportList('reports'); // display list name
            this._renderCategoryList('Categorias e Menu'); // display list name

            console.log('Inicializou o componente principal');            

            sleep(500).then(() => {  
              if(isLogged == "false"){
                const elem: React.ReactElement<ILandingPageProps> = React.createElement(LandingPage,{});  
                ReactDOM.render(elem, this._topPlaceholder.domElement);
              }
              else{
                const elem: React.ReactElement<IMainProps> = React.createElement(Main,{});  
                ReactDOM.render(elem, this._topPlaceholder.domElement);                
              }
            });             
            
            // Obtém o título do site
            webTitle = this.context.pageContext.web.title;

            // Obtém a URL relativa do site
            relativeSiteUrl = this.context.pageContext.web.serverRelativeUrl;
            console.log('Relative path: ' + relativeSiteUrl);

            // Obtém a URL abosluta do site
            absoluteWebUrl = this.context.pageContext.legacyPageContext.webAbsoluteUrl;
            console.log('Absolute URL: ' + absoluteWebUrl);

            clienteContext = this.context;

            // Obtém informações sobre o usuário logado
            currentUserInfo = this.context.pageContext.legacyPageContext; 
            console.log("Propriedades do usuário atual:");
            console.log(currentUserInfo);
            console.log('User Name: ' + currentUserInfo.userDisplayName + ', Login Name: ' + currentUserInfo.userLoginName +   ', User ID: ' + currentUserInfo.userId);
          }       
       }  
      }      
    }

    private _onDispose(): void   
    {  
      console.log('[AppApplicationCustomizer._onDispose] Disposed custom top placeholders.');        
    }
}

export function showDownloads(category:string) {
  selectedCategory = category.trim();

  var element = document.getElementById("sideNav"); 
  element.classList.toggle("sideNav");
}

export function showCategory(category:string) {
  selectedCategory = category.trim();

  switch(selectedCategory) {
    case "Downloads":
      break;
    case "Favoritos":
      break;
    case "Favorites":
      break;
    default:
      // Cria os elementos
      const categoryListElements = <CategoryListItens />;
      const reportListElements = <ReportListItens />;
      
      //Renderiza os elementos criados dentro das tags
      ReactDOM.render(categoryListElements, document.getElementById('CategoryListItens'));
      ReactDOM.render(reportListElements, document.getElementById('ReportListItens'));

      checkFavoriteItens();
  }  

  var element = document.getElementById("sideNav"); 
  element.classList.toggle("sideNav");
}

function addFavorites(itemTitle, itemId){   

  reportTileBox = document.getElementsByClassName('tileBox');
  if(reportTileBox.length > 1)
    reportTileBox = document.getElementsByClassName('tileBox')[itemId];
  else
    reportTileBox = document.getElementsByClassName('tileBox')[0];

  // Grava o relatório favoritado no localStorage  
  if(window.localStorage.favoriteItems == undefined){
    localStorage.setItem('favoriteItems', itemTitle);

    favoriteReportButton = document.getElementsByClassName('btnFavorite');
    reportTitle = document.getElementsByClassName('reportTitle');

    // Adiciona uma nova classe para alterar o ícone
    favoriteReportButton[itemId].classList.remove('btnFavorite-icon-outline');        
    favoriteReportButton[itemId].classList.add('btnFavorite-icon-filled');

    reportTileBox.setAttribute('data-favorite-checked', 'true');
  }
  else{
    // Obtém a lista de strings do itens salvos
    myFavorites = localStorage.getItem('favoriteItems');    

    // Obtém o array de favoritos salvos no localStorage
    let favorites = myFavorites.split(',');

    favorites.forEach(logArrayElements);

    // Se existirem dados, converte os dados existentes para um array
    // Caso contrário, cria um array    
    myFavorites = myFavorites ? myFavorites.split(',') : [];

    if(reportTileBox.getAttribute('data-favorite-checked') == "true"){

      // Sempre limpa o LocalStorage antes de iniciar a gravação
      var storage = window.localStorage;
      storage.clear();      

      for(let i = 0; i < favorites.length; i++){
        if(favorites[i] == itemTitle){
          favorites.splice([i], 1);
          if(favorites.length > 0)
            storage.setItem("favoriteItems", favorites.toString());
        }
      }

      // Alterna entre as classes para trocar o ícone
      favoriteReportButton[itemId].classList.remove('btnFavorite-icon-filled');
      favoriteReportButton[itemId].classList.add('btnFavorite-icon-outline');
      reportTileBox.setAttribute('data-favorite-checked', 'false');
    }
    else{
      // Adiciona um novo item ao localStorage array
      myFavorites.push(itemTitle);

      // Salva no localStorage
      localStorage.setItem('favoriteItems', myFavorites.toString());        
      
      // Adiciona uma nova classe para alterar o ícone
      favoriteReportButton[itemId].classList.add('btnFavorite-icon-filled');
      reportTileBox.setAttribute('data-favorite-checked', 'true');
    }
  }
}

function logArrayElements(element, index, favoriteItem) {  
  if(favoriteItem != null && reportTitle[index] !== undefined){
    if(element === reportTitle[index].innerHTML){
      favoriteReportButton[index].classList.remove('btnFavorite-icon-outline');        
      favoriteReportButton[index].classList.add('btnFavorite-icon-filled');
    }
  }
}

export function checkFavoriteItens(){
  
  // Obtém os relatórios visíveis na tela
  reportTileBox = document.getElementsByClassName('tileBox');

  // Obtém a lista de strings do itens salvos
  myFavorites = localStorage.getItem('favoriteItems');

  if(myFavorites != null){
    // Obtém o array de favoritos salvos no localStorage
    let favorites = myFavorites.split(',');
    
    favoriteReportButton = document.getElementsByClassName('btnFavorite');
    reportTitle = document.getElementsByClassName('reportTitle');

    favorites.forEach(addFavoriteIcon);  
  }

  function addFavoriteIcon(element) {
    for(let i = 0; i < reportTitle.length; i++){      
      if(element == reportTitle[i].innerHTML){
        favoriteReportButton[i].classList.remove('btnFavorite-icon-outline');        
        favoriteReportButton[i].classList.add('btnFavorite-icon-filled');
        reportTileBox[i].setAttribute('data-favorite-checked', 'true');
      }
    }
  }    
}

export class ReportListItens extends React.Component{
public render(){  
  var count = 0;
  const reports = reportListItens.map((item) =>    
    <section key={item.Id}> 
      {language == "pt" ?
        item.categoryLookupValue != null ?
          selectedCategory == item.categoryLookupValue ?
            <div className="ms-Grid-col ms-sm12 ms-md4 block">
              <div id={item.Id.toString()} data-tileBox-id={count} data-favorite-checked="false" className="tileBox" style = {{background: `url(${item.reportBackground}) no-repeat center center`, backgroundSize: "cover"}}>
                <div className="tileBoxOverlay">
                  <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm8 ms-md8">
                      <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm4 ms-md4">
                          <div className="reportCategoryIcon" style = {{background: `url(${item.reportIcon}) no-repeat center center`}}>                                            
                          </div>
                        </div>  
                        <div className="ms-Grid-col ms-sm8 ms-md8 reportTitle">
                          {item.Title}
                        </div>
                      </div>                    
                    </div>           
                    <div className="ms-Grid-col ms-sm4 ms-md4">
                      <div className="reportCategoryInfo">
                        <button className="btnFavorite btnFavorite-icon-outline" onClick={() => addFavorites(item.Title, parseInt(document.getElementById(item.Id).getAttribute('data-tileBox-id')))}>
                        </button>
                        <div className="reportCategoryType">
                          <span>Tipo:</span>                      
                          <div className="iconType">
                            <span>Dashboard</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                    <div className="tileBoxToolBar">
                      <HashRouter>
                        <Link onClick={() => getDetails(item.Title, parseInt(document.getElementById(item.Id).getAttribute('data-tileBox-id')))} className="btnDetalhes" to={`/detalhes`}>
                          <div className="btnDetalhes-Icon">&nbsp;</div>
                          <span>Detalhes</span>
                        </Link>                      
                      </HashRouter>
                      <button className="btnDashboard" onClick={() => getDashboard(item.reportPage, item.categoryLookupValue)}>
                        <div className="btnDashboard-Icon">&nbsp;</div>
                        <span>Dashboard</span>
                      </button>
                  </div>
                </div>
              </div>
            </div>
          : 
            null
        :
        null
      :
        item.categoryENLookupValue != null ?
          selectedCategory == item.categoryENLookupValue ?
            <div className="ms-Grid-col ms-sm12 ms-md4 block">
              <div id={item.Id.toString()} data-tileBox-id={count} data-favorite-checked="false" className="tileBox" style = {{background: `url(${item.reportBackground}) no-repeat center center`, backgroundSize: "cover"}}>
                <div className="tileBoxOverlay">
                  <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm8 ms-md8">
                      <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm4 ms-md4">
                          <div className="reportCategoryIcon" style = {{background: `url(${item.reportIcon}) no-repeat center center`}}>                                            
                          </div>
                        </div>  
                        <div className="ms-Grid-col ms-sm8 ms-md8 reportTitle">
                          {item.reportTitleEN}
                        </div>
                      </div>                    
                    </div>           
                    <div className="ms-Grid-col ms-sm4 ms-md4">
                      <div className="reportCategoryInfo">                      
                        <button className="btnFavorite btnFavorite-icon-outline" onClick={() => addFavorites(item.reportTitleEN, parseInt(document.getElementById(item.Id).getAttribute('data-tileBox-id')))}>
                        </button>                 
                        <div className="reportCategoryType">
                          <span>Type:</span>                      
                          <div className="iconType">
                            <span>Dashboard</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                    <div className="tileBoxToolBar">
                      <HashRouter>
                        <Link onClick={() => getDetails(item.reportTitleEN, parseInt(document.getElementById(item.Id).getAttribute('data-tileBox-id')))} className="btnDetalhes" to={`/detalhes`}>
                          <div className="btnDetalhes-Icon">&nbsp;</div>
                          <span>Details</span>
                        </Link>                      
                      </HashRouter>
                      <button className="btnDashboard" onClick={() => getDashboard(item.reportPage, item.categoryENLookupValue)}>
                        <div className="btnDashboard-Icon">&nbsp;</div>
                        <span>Dashboard</span>
                      </button>
                  </div>
                </div>
              </div>
            </div>
          : null
        :
          null
        }
        
        <span style={{display:'none'}}>{count += 1}</span>            
    </section>                 
    );

    return(
      <div>        
        {reports}        
      </div>
    );
  }
}

export class CategoryListItens extends React.Component{
  public render(){  
    const categories = categoryListItens.map((item) =>
      <section key={item.Id}>
        {selectedCategory == item.Title.trim() ?          
          <div className="ms-Grid-col ms-sm12 ms-md10 block pageDescription">
            <div id="categoryName">
                <h1>{item.Title}</h1>
                <p>{item.description}</p>
              </div>            
          </div>
        : 
        selectedCategory == item.titleEN.trim() ?          
          <div className="ms-Grid-col ms-sm12 ms-md10 block pageDescription">
            <div id="categoryName">
              <h1>{item.titleEN}</h1>
              <p>{item.descriptionEN}</p>
            </div>            
          </div>
        : null}                
      </section>                 
      );
  
      return(
        <div>        
          {categories}
        </div>
      );
    }
}

export class ReportDetails extends React.Component{
  public render(){    
    const reportDetails = reportListItens.map((item) =>
      <section key={item.Id}>          
        {language == 'pt' ?
          selectedCategory == item.categoryLookupValue || selectedCategory == "Favoritos" ?
            selectedReport == item.Title ?
              <div data-tileBox-id={tileBoxId} className="content">
              <div className="ms-Grid-row w3-container">
                <div className="ms-Grid-col ms-md1 block"></div> 
                <div className="ms-Grid-col ms-sm12 ms-md10 block pageDescription">              
                </div> 
                <div className="ms-Grid-col ms-md1 block"></div>
              </div>
              <div className="ms-Grid-row w3-container">
                <div className="ms-Grid-col ms-sm12 ms-md9 block detalhes">                    
                  <div>
                    <h1>{item.Title}</h1>
                    <p><span>Categoria: </span>{item.categoryLookupValue}</p>
                    <p><span>Tipo: </span>Dashboard</p>
                    <p><span>Autor: </span>{item.author0}</p>
                    <p><span>Data de criação: </span>{moment(item.Created).format('DD/MM/YYYY')}</p>
                    <p>{item.reportDetails}</p>
                  </div>           
                </div>                
                <div className="ms-Grid-col ms-sm12 ms-md3 block">                
                  <div className="reportDetailRightBox">
                    <div className="reportDetailImage" style = {{background: `#2E2E2E url(${item.reportBackground}) no-repeat center center`}}>
                      <div className="tileBoxOverlay">
                        <div className="ms-Grid-row">
                          <div className="ms-Grid-col ms-sm4 ms-md4">
                            <div className="categoryIcon">
                              <div className="reportCategoryIcon" style = {{background: `url(${item.reportIcon}) no-repeat center center`}}></div>                      
                            </div>
                          </div>  
                          <div className="ms-Grid-col ms-sm8 ms-md8">
                            {item.Title}
                          </div>
                        </div> 
                      </div>
                    </div>
                    <div className="reportDetailsToolBar">              
                      <button className="btnDashboard-Large" onClick={() => getDashboard(item.reportPage, item.categoryLookupValue)}>
                        <div className="btnDashboard-Icon">&nbsp;</div>
                        <span>Dashboard</span>
                      </button>
                      <p>
                        {/* É necessário informar o id do tile que foi clicado;
                        Retardar a criação do botão para garantir que antes a página de detalhes seja
                        criada com o data-tileBox-id */}
                        {/* <a onClick={() => addFavorites(item.Title, 0)} href="#" className="btnAddFavorites">Adicionar aos Favoritos</a> */}
                        <a onClick={() => addFavorites(item.Title, parseInt(document.getElementById(item.Id).getAttribute('data-tileBox-id')))} href="#" className="btnAddFavorites">Adicionar aos Favoritos</a>
                      </p>
                    </div>                    
                  </div>
                </div>
              </div>
            </div>      
            :
              null
          :
            null
        :
          selectedCategory == item.categoryENLookupValue ?
            selectedReport == item.reportTitleEN ?
              <div className="content">
              <div className="ms-Grid-row w3-container">
                <div className="ms-Grid-col ms-md1 block"></div> 
                <div className="ms-Grid-col ms-sm12 ms-md10 block pageDescription">              
                </div> 
                <div className="ms-Grid-col ms-md1 block"></div>
              </div>
              <div className="ms-Grid-row w3-container">
                <div className="ms-Grid-col ms-sm12 ms-md9 block detalhes">                    
                  <div>
                    <h1>{item.reportTitleEN}</h1>
                    <p><span>Category: </span>{item.categoryENLookupValue}</p>
                    <p><span>Type: </span>Dashboard</p>
                    <p><span>Author: </span>{item.author0}</p>
                    <p><span>Creation date: </span>{moment(item.Created).format('DD/MM/YYYY')}</p>
                    <p>{item.reportDetailsEN}</p>
                  </div>
                </div>                
                <div className="ms-Grid-col ms-sm12 ms-md3 block">
                  <div className="reportDetailRightBox">
                    <div className="reportDetailImage" style = {{background: `#2E2E2E url(${item.reportBackground}) no-repeat center center`}}>
                      <div className="tileBoxOverlay">
                        <div className="ms-Grid-row">
                          <div className="ms-Grid-col ms-sm4 ms-md4">
                            <div className="categoryIcon">
                              <div className="reportCategoryIcon" style = {{background: `url(${item.reportIcon}) no-repeat center center`}}></div>                      
                            </div>
                          </div>  
                          <div className="ms-Grid-col ms-sm8 ms-md8">
                            {item.reportTitleEN}
                          </div>
                        </div> 
                      </div>
                    </div>
                    <div className="reportDetailsToolBar">              
                      <button className="btnDashboard-Large" onClick={() => getDashboard(item.reportPage, item.categoryENLookupValue)}>
                        <div className="btnDashboard-Icon">&nbsp;</div>
                        <span>Dashboard</span>
                      </button>
                      <p>
                        <a href="#" className="btnAddFavorites">Add to Favorites</a>
                      </p>
                    </div>                    
                  </div>
                </div>
              </div>
            </div>      
            :
              null
          :
            null
        }        
      </section>                 
      );
  
      return(
        <div>        
          {reportDetails}
        </div>
      );
    }
}

export class FavoriteListItens extends React.Component{
  public render(){
  var count = 0;
  const reports = reportListItens.map((item) =>    
    <section key={item.Id}>        
      {language == "pt" ?        
        <div className="ms-Grid-col ms-sm12 ms-md4 block">
            <div id={item.Id.toString()} data-tileBox-id={count} data-favorite-checked="false" className="tileBox" style = {{background: `url(${item.reportBackground}) no-repeat center center`, backgroundSize: "cover"}}>
              <div className="tileBoxOverlay">
                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-sm8 ms-md8">
                    <div className="ms-Grid-row">
                      <div className="ms-Grid-col ms-sm4 ms-md4">
                        <div className="reportCategoryIcon" style = {{background: `url(${item.reportIcon}) no-repeat center center`}}>                                            
                        </div>
                      </div>  
                      <div className="ms-Grid-col ms-sm8 ms-md8 reportTitle">
                        {item.Title}
                      </div>
                    </div>                    
                  </div>           
                  <div className="ms-Grid-col ms-sm4 ms-md4">
                    <div className="reportCategoryInfo">
                      <button className="btnFavorite btnFavorite-icon-outline" onClick={() => addFavorites(item.Title, parseInt(document.getElementById(item.Id).getAttribute('data-tileBox-id')))}>
                      </button>
                      <div className="reportCategoryType">
                        <span>Tipo:</span>                      
                        <div className="iconType">
                          <span>Dashboard</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                  <div className="tileBoxToolBar">
                    <HashRouter>
                      <Link onClick={() => getDetails(item.Title, parseInt(document.getElementById(item.Id).getAttribute('data-tileBox-id')))} className="btnDetalhes" to={`/detalhes`}>
                        <div className="btnDetalhes-Icon">&nbsp;</div>
                        <span>Detalhes</span>
                      </Link>                      
                    </HashRouter>
                    <button className="btnDashboard" onClick={() => getDashboard(item.reportPage, item.categoryLookupValue)}>
                      <div className="btnDashboard-Icon">&nbsp;</div>
                      <span>Dashboard</span>
                    </button>
                </div>
              </div>
            </div>
          </div>
      :
        <div className="ms-Grid-col ms-sm12 ms-md4 block">
              <div id={item.Id.toString()} data-tileBox-id={count} data-favorite-checked="false" className="tileBox" style = {{background: `url(${item.reportBackground}) no-repeat center center`, backgroundSize: "cover"}}>
                <div className="tileBoxOverlay">
                  <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm8 ms-md8">
                      <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm4 ms-md4">
                          <div className="reportCategoryIcon" style = {{background: `url(${item.reportIcon}) no-repeat center center`}}>                                            
                          </div>
                        </div>  
                        <div className="ms-Grid-col ms-sm8 ms-md8 reportTitle">
                          {item.reportTitleEN}
                        </div>
                      </div>                    
                    </div>           
                    <div className="ms-Grid-col ms-sm4 ms-md4">
                      <div className="reportCategoryInfo">                      
                        <button className="btnFavorite btnFavorite-icon-outline" onClick={() => addFavorites(item.Title, parseInt(document.getElementById(item.Id).getAttribute('data-tileBox-id')))}>
                        </button>                 
                        <div className="reportCategoryType">
                          <span>Type:</span>                      
                          <div className="iconType">
                            <span>Dashboard</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                    <div className="tileBoxToolBar">
                      <HashRouter>
                        <Link className="btnDetalhes" to={`/detalhes`}>
                          <div className="btnDetalhes-Icon">&nbsp;</div>
                          <span>Details</span>
                        </Link>                      
                      </HashRouter>
                      <button className="btnDashboard" onClick={() => getDashboard(item.reportPage, item.categoryENLookupValue)}>
                        <div className="btnDashboard-Icon">&nbsp;</div>
                        <span>Dashboard</span>
                      </button>
                  </div>
                </div>
              </div>
            </div>
      }
      <span style={{display:'none'}}>{count += 1}</span>            
    </section>                 
    );

    return(
      <div>        
        {reports}        
      </div>
    );
  }
}

export class FavoriteCategoryListItens extends React.Component{
  public render(){  
    const categories = categoryListItens.map((item) =>
      <section key={item.Id}>
        {language == "pt" ?
          selectedCategory == item.Title.trim() ?
            <div className="ms-Grid-col ms-sm12 ms-md10 block pageDescription">
              <div id="categoryName">
                <h1>{item.Title}</h1>
                <p>{item.description}</p>
                <div id="favoriteItensMessage">Você ainda não possui itens favoritados</div>                
              </div>            
            </div>
          : 
          null
        :
          selectedCategory == item.titleEN.trim() ?          
          <div className="ms-Grid-col ms-sm12 ms-md10 block pageDescription">
            <div id="categoryName">
              <h1>{item.titleEN}</h1>
              <p>{item.descriptionEN}</p>
              <div id="favoriteItensMessage">You don't have any favorite items yet</div>
            </div>            
          </div>
        : 
          null
        }                
      </section>                 
      );
  
      return(
        <div>        
          {categories}
        </div>
      );
    }
}