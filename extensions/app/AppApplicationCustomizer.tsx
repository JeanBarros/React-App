import { override } from '@microsoft/decorators';  
import * as React from 'react';  
import * as ReactDOM from "react-dom"; 
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
let reportListItens;

/** A Custom Action which can be run during execution of a Client Side Application */
export default class AppApplicationCustomizer
  extends BaseApplicationCustomizer<IAppApplicationCustomizerProps> {
    private _topPlaceholder: PlaceholderContent | undefined;
  public domElement: any;

    constructor(){
      super();

      var head = document.getElementsByTagName('HEAD')[0];

      var appStyle = document.createElement('link'); 
      appStyle.rel = 'stylesheet'; 
      appStyle.type = 'text/css'; 
      appStyle.href = '/sites/Lab02/Style%20Library/app.css';  

      var sideNavStyle = document.createElement('link'); 
      sideNavStyle.rel = 'stylesheet'; 
      sideNavStyle.type = 'text/css'; 
      sideNavStyle.href = '/sites/Lab02/Style%20Library/sideNav.css';  

      // Append link element to HTML head 
      head.appendChild(appStyle);
      head.appendChild(sideNavStyle);
    }
    
    @override  
    public onInit(): Promise<void> {  
      
      this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders);  
      
      return Promise.resolve<void>();  
    }

    private _getListData(): Promise<ISPLists> {  
      return this.context.spHttpClient.get(`${this.context.pageContext.web.absoluteUrl}/_api/lists/GetByTitle('reports')/items`,  
      SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {   
        debugger; 
        return response.json();  
      });  
    }

    private _renderListAsync(): void {        
      this._getListData()  
        .then((response) => {
          reportListItens = response.value;
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

            // Cria um elemento com seu valor definido para o título do site
            const webTitleElement = <input type="hidden" id="siteName" name="custId" value={webTitle}></input>;            

            // Renderiza o elemento (neste caso não será visível porque o elemento é um input hidden)
            ReactDOM.render(webTitleElement, document.getElementById('root'));
            
            this._renderListAsync();            

          }       
       }  
      }      
    }

    private _onDispose(): void   
    {  
      console.log('[AppApplicationCustomizer._onDispose] Disposed custom top placeholders.');        
    }
}

class Car extends React.Component<any> {
  public render() {
    return <h2>I am a {this.props.brand.color}&nbsp;{this.props.brand.model}!
    </h2>;
  }
}

export class Garage extends React.Component {
  public render() {    
    const carinfo = {name: "Ford", model: "Mustang", color: "red"};
    return (
      <div>
      <h1>Who lives in my garage?</h1>
      <Car brand={carinfo} />
      </div>
    );
  }
}

export class SideNav extends React.Component{  
  public render(){
    console.log(reportListItens)
    const headings = reportListItens.map((item) =>
      <li key={item.Id}>        
        <HashRouter>  
          {/* A coluna linkPath armazena os parâmetros a serem utilzados para referenciar o componente de cada categoria */}
          {/* a função normalize() combinada com a regex converte acentos e cedilha para caracteres não acentuados e "c". */}
          {item.linkType == "Top link" ? 
            <Link to={`/${item.linkPath.normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`} 
              className="w3-bar-item w3-button sideNavHeading">
              {/* A coluna linkTitle0 armazena o título do link a ser exibido no menu */}
              <div className="sideNavIcons" style = {{background: `url(${item.icon})`}}></div>
              <span>{item.linkTitle0}</span>
            </Link>
          : null}
          {item.linkType == "Heading" ? 
            <div className="sideNavHeading">
              <li className="spacerTop"></li>
              {/* A coluna linkTitle0 armazena o título do link a ser exibido no menu */}
              <div className="sideNavIcons" style = {{background: `url(${item.icon})`}}></div>
              {item.linkTitle0}
            </div>
          : null}                    
        </HashRouter>          
      </li>      
    );
    const subLinks = reportListItens.map((item) =>
      <li key={item.Id}>        
        <HashRouter>
          {item.linkType == "Sublink" ?             
              <li>
                <Link to={`/${item.linkPath.normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`} 
                  className="w3-bar-item w3-button">
                  {/* A coluna linkTitle0 armazena o título do link a ser exibido no menu */}
                  <span>{item.linkTitle0}</span>
                </Link>
              </li>
          : null}        
        </HashRouter>          
      </li>      
    );
    const bottomLinks = reportListItens.map((item) =>
      <li key={item.Id}>        
        <HashRouter>          
          {item.linkType == "Bottom link" ?             
              <li>
                <Link to={'#'} 
                  className="w3-bar-item w3-button sideNavLinkBottom">
                  <div className="sideNavIcons" style = {{background: `url(${item.icon})`}}></div>
                  <span>{item.linkTitle0}</span>
                </Link>
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
      </ul>
    );
  }
}

export class SharePointWebTitle extends React.Component{
  public render(){
    return(webTitle);
  }
}

export class ReportListItens extends React.Component{ 

  showReportDetails = (linkPath: string) => {
    alert(linkPath)
  }

  public render(){
    const reports = reportListItens.map((item) =>
      <div key={item.Id} className="ms-Grid-col ms-sm12 ms-md4 block">
        {item.visibleOnTile == true ? 
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
                <button onClick={() => this.showReportDetails(`/${item.linkPath.normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`)} className="btnDetalhes">Detalhes</button>
                <button className="btnDashboard">Dashboard</button>
              </div>
            </div>
          </div>  
        : null}        
      </div>                 
     );
    
    return(
      <div>
        {reports}
      </div>
    );
  }
}