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
import LandingPage, { ILandingPageProps } from './Components/LandingPage';
import { SPHttpClient, ISPHttpClientOptions, SPHttpClientResponse } from '@microsoft/sp-http';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';

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

let webTitle;
var relativeSiteUrl;
let reportListItens;
let categoryListItens;
export let language;
let selectedCategory = 'Comercial';

export const setLanguage = (name, value, days = 7, path = '/') => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=' + path;

  location.reload();  
}

export const getCookie = (name) => {
  return document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=')
    return parts[0] === name ? decodeURIComponent(parts[1]) : r
  }, '')
}

const deleteCookie = (name, path) => {
  setLanguage(name, '', -1, path)
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class AppApplicationCustomizer
  extends BaseApplicationCustomizer<IAppApplicationCustomizerProps> {
    private _topPlaceholder: PlaceholderContent | undefined;
  public domElement: any;

    constructor(){
      super();

      language = getCookie('language')
      console.log(language);

      var head = document.getElementsByTagName('HEAD')[0];

      var appStyle = document.createElement('link'); 
      appStyle.rel = 'stylesheet'; 
      appStyle.type = 'text/css'; 
      appStyle.href = '/sites/lab02/Style%20Library/app.css';  

      var sideNavStyle = document.createElement('link'); 
      sideNavStyle.rel = 'stylesheet'; 
      sideNavStyle.type = 'text/css'; 
      sideNavStyle.href = '/sites/lab02/Style%20Library/sideNav.css';  

      // Append link element to HTML head 
      head.appendChild(appStyle);
      head.appendChild(sideNavStyle);
    }
    
    @override  
    public onInit(): Promise<void> {  
      
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
      });        
    }
    
    private _renderCategoryList(listName:string): void {        
      this._getListData(listName)  
        .then((response) => {
          categoryListItens = response.value;
      });        
    }

    public _renderPlaceHolders(): void {  
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
            /*const elem: React.ReactElement<IMainProps> = React.createElement(Main,{});  
            ReactDOM.render(elem, this._topPlaceholder.domElement);*/ 
            
            const elem: React.ReactElement<ILandingPageProps> = React.createElement(LandingPage,{});  
            ReactDOM.render(elem, this._topPlaceholder.domElement);

            // Obtém o título do site
            webTitle = this.context.pageContext.web.title;

            relativeSiteUrl = this.context.pageContext.web.serverRelativeUrl;
            console.log(relativeSiteUrl);

            // Cria um elemento com seu valor definido para o título do site
            const webTitleElement = <input type="hidden" id="siteName" name="custId" value={webTitle}></input>;            

            // Renderiza o elemento (neste caso não será visível porque o elemento é um input hidden)
            ReactDOM.render(webTitleElement, document.getElementById('root'));
            
            this._renderReportList('Reports'); // List display name
            this._renderCategoryList('Categorias e Menu'); // List display name 
          }       
       }  
      }      
    }

    private _onDispose(): void   
    {  
      console.log('[AppApplicationCustomizer._onDispose] Disposed custom top placeholders.');        
    }
}

export class SideNav extends React.Component{  
  
  public render(){
    console.log(categoryListItens);
    const headings = categoryListItens.map((item) =>
      <li key={item.Id}>        
        <HashRouter>  
          {/* A coluna linkPath armazena os parâmetros a serem utilzados para referenciar o componente de cada categoria */}
          {/* a função normalize() combinada com a regex converte acentos e cedilha para caracteres não acentuados e "c". */}
          {item.linkType == "Top link" ? 
            language == "pt" ?
              <Link to={`/${item.linkPath.normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`} 
                className="w3-bar-item w3-button sideNavHeading" onClick={() => showCategory(item.Title)}>
                {/* A coluna linkTitle0 armazena o título do link a ser exibido no menu */}
                <div className="sideNavIcons" style = {{background: `url(${item.icon})`}}></div>
                <span>{item.Title}</span>
              </Link>
            :
              <Link to={`/${item.linkPath.normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`} 
                className="w3-bar-item w3-button sideNavHeading" onClick={() => showCategory(item.Title)}>
                {/* A coluna linkTitle0 armazena o título do link a ser exibido no menu */}
                <div className="sideNavIcons" style = {{background: `url(${item.icon})`}}></div>
                <span>{item.titleEN}</span>
              </Link>            
          : null}
          {item.linkType == "Heading" ? 
            <div className="sideNavHeading">
              <li className="spacerTop"></li>
              {/* A coluna linkTitle0 armazena o título do link a ser exibido no menu */}
              <div className="sideNavIcons" style = {{background: `url(${item.icon})`}}></div>
              {item.Title}
            </div>
          : null}                    
        </HashRouter>          
      </li>      
    );
    const subLinks = categoryListItens.map((item) =>
      <li key={item.Id}>        
        <HashRouter>          
          {item.linkType == "Sublink" ?             
              <li>
                {language == 'pt' ?
                  <Link to={`/${item.linkPath.normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}                 
                    className="w3-bar-item w3-button" onClick={() => showCategory(item.Title)}>
                    {/* A coluna linkTitle0 armazena o título do link a ser exibido no menu */}
                    <span>{item.Title}</span>
                  </Link>
                : 
                  <Link to={`/${item.linkPath.normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}                 
                    className="w3-bar-item w3-button" onClick={() => showCategory(item.titleEN)}>
                    {/* A coluna linkTitle0 armazena o título do link a ser exibido no menu */}
                    <span>{item.titleEN}</span>
                  </Link>
                }
              </li>              
          : null}        
        </HashRouter>          
      </li> 
    );
    const bottomLinks = categoryListItens.map((item) =>
      <li key={item.Id}>        
        <HashRouter>          
          {item.linkType == "Bottom link" ?             
              <li>
                {language == 'pt' ?
                  <Link to={'/'} 
                    className="w3-bar-item w3-button sideNavLinkBottom">
                    <div className="sideNavIcons" style = {{background: `url(${item.icon})`}}></div>
                    <span>{item.Title}</span>
                  </Link>
                :
                  <Link to={'/'} 
                    className="w3-bar-item w3-button sideNavLinkBottom">
                    <div className="sideNavIcons" style = {{background: `url(${item.icon})`}}></div>
                    <span>{item.titleEN}</span>
                  </Link>
                }
              </li>
          : null}         
        </HashRouter>          
      </li>      
    );
    
    return(      
      <ul className="sideNavBottom">
        <li>
          {headings}
          <ul className="sideNavSubLinks">
            {subLinks}
          </ul>
        </li>
        <li className="spacerBottom"></li>
        {bottomLinks}
        <div className="btnTranslateContainer-small">
          <button id="btnTranslatePT-small" onClick={() => setLanguage('language', 'pt', 365, '/')} className="btnTranslatePT-small"></button> 
          <button id="btnTranslateEN-small" onClick={() => setLanguage('language', 'en', 365, '/')} className="btnTranslateEN-small"></button>       
        </div>               
      </ul>
    );
  }
}

export class SharePointWebTitle extends React.Component{
  public render(){
    return(webTitle);
  }
}

export function showCategory(category:string) {
  //alert(category);
  //document.getElementById('categoryDescription').innerHTML = category;
  selectedCategory = category;

  var element = document.getElementById("sideNav"); 
    element.classList.toggle("sideNav");
}

export function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

export class ReportListItens extends React.Component{

public render(){

  console.log(reportListItens);

  const reports = reportListItens.map((item) =>
    <section key={item.Id}>
      {item.visibleOnTile == true ? 
        language == "pt" ?
          selectedCategory == item.categoryLookupValue ?
            <div className="ms-Grid-col ms-sm12 ms-md4 block">
              <div className="tileBox">
                <div className="tileBoxOverlay">
                  <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm8 ms-md8">
                      <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm4 ms-md4">
                          <div className="reportCategoryIcon" style = {{background: `url(${item.reportIcon})`}}>                                            
                          </div>
                        </div>  
                        <div className="ms-Grid-col ms-sm8 ms-md8 reportCategoryDescription">
                          {item.Title}
                        </div>
                      </div>                    
                    </div>           
                    <div className="ms-Grid-col ms-sm4 ms-md4">
                      <div className="reportCategoryInfo">
                        <i className="ms-Icon ms-Icon--FavoriteStarFill"></i>
                        <br></br>
                        <strong>Tipo:</strong>
                        <div className="reportCategoryType">                      
                          <i className="ms-Icon ms-Icon--PowerBILogo"></i>
                          <span>Dashboard</span>
                        </div>
                      </div>
                    </div>
                  </div>
                    <div className="tileBoxToolBar">
                      <HashRouter>
                        <Link className="btnDetalhes" to={`/detalhes`}>Detalhes</Link>                      
                      </HashRouter>
                        <a href={`${relativeSiteUrl}/SitePages/${item.reportPage}.aspx`} className="btnDashboard">Dashboard</a>
                  </div>
                </div>
              </div>
            </div>
          : null
        :
          selectedCategory == item.categoryENLookupValue ?
            <div className="ms-Grid-col ms-sm12 ms-md4 block">
              <div className="tileBox">
                <div className="tileBoxOverlay">
                  <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm8 ms-md8">
                      <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm4 ms-md4">
                          <div className="reportCategoryIcon" style = {{background: `url(${item.reportIcon})`}}>                                            
                          </div>
                        </div>  
                        <div className="ms-Grid-col ms-sm8 ms-md8 reportCategoryDescription">
                          {item.reportTitleEN}
                        </div>
                      </div>                    
                    </div>           
                    <div className="ms-Grid-col ms-sm4 ms-md4">
                      <div className="reportCategoryInfo">
                        <i className="ms-Icon ms-Icon--FavoriteStarFill"></i>
                        <br></br>
                        <strong>Type:</strong>
                        <div className="reportCategoryType">                      
                          <i className="ms-Icon ms-Icon--PowerBILogo"></i>
                          <span>Dashboard</span>
                        </div>
                      </div>
                    </div>
                  </div>
                    <div className="tileBoxToolBar">
                      <HashRouter>
                        <Link className="btnDetalhes" to={`/detalhes`}>Details</Link>                      
                      </HashRouter>
                        <a href={`${relativeSiteUrl}/SitePages/${item.reportPage}.aspx`} className="btnDashboard">Dashboard</a>
                  </div>
                </div>
              </div>
            </div>
          : null
      : null}     
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
  
    console.log(categoryListItens);

    const categories = categoryListItens.map((item) =>
      <section key={item.Id}>
        {selectedCategory == item.Title ?          
          <div className="ms-Grid-col ms-sm12 ms-md10 block pageDescription">
            <div id="categoryName">
                <h1>{item.Title}</h1>
                <p>{item.description}</p>
              </div>            
          </div>
        : 
        selectedCategory == item.titleEN ?          
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
            selectedCategory == item.categoryLookupValue ?
              <div className="spaceBotton">
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
                      <div className="reportDetailImage">
                        <div className="tileBoxOverlay">
                          <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm4 ms-md4">
                              <div className="categoryIcon">
                                <div className="reportCategoryIcon" style = {{background: `url(${item.reportIcon})`}}></div>                      
                              </div>
                            </div>  
                            <div className="ms-Grid-col ms-sm8 ms-md8">
                              {item.Title}
                            </div>
                          </div> 
                        </div>
                      </div>
                      <div className="reportDetailsToolBar">              
                        <a href={`${relativeSiteUrl}/SitePages/Report.aspx`} className="btnDashboard-Large">Dashboard</a>
                        <p>
                          <a href="#" className="btnAddFavorites">Adicionar aos Favoritos</a>
                        </p>
                      </div>                    
                    </div>
                  </div>
                </div>
              </div>      
            :
              null
          :
            selectedCategory == item.categoryENLookupValue ?
              <div className="spaceBotton">
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
                      <div className="reportDetailImage">
                        <div className="tileBoxOverlay">
                          <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm4 ms-md4">
                              <div className="categoryIcon">
                                <div className="reportCategoryIcon" style = {{background: `url(${item.reportIcon})`}}></div>                      
                              </div>
                            </div>  
                            <div className="ms-Grid-col ms-sm8 ms-md8">
                              {item.reportTitleEN}
                            </div>
                          </div> 
                        </div>
                      </div>
                      <div className="reportDetailsToolBar">              
                        <a href={`${relativeSiteUrl}/SitePages/Report.aspx`} className="btnDashboard-Large">Dashboard</a>
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