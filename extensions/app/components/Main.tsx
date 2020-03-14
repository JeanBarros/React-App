import * as React from 'react';
import * as ReactDOM from "react-dom";  
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';

import Favoritos from './Favoritos';
import Downloads from './Downloads';
import Comercial from './Comercial';
import Controladoria from './Controladoria';
import Manutencao from './Manutencao';
import Mina from './Mina';
import Pcp from './Pcp';
import Rh from './Rh';
import Subsidiarias from './Subsidiarias';
import Detalhes from './Detalhes';
import DetalhesDocumento from './DetalhesDocumento';
import {SharePointWebTitle, language, setLoggedIn, logOut, setLanguage, showCategory, relativeSiteUrl} from '../AppApplicationCustomizer';
import LandingPage from './LandingPage';
import FloatNav from './FloatNav';

export interface IMainProps {}

let categoryCollection;

// Aguarda para garantir que elementos padrão do SharePoint sejam renderizados primeiro
function sleep (time) {      
  return new Promise((resolve) => setTimeout(resolve, time));
}

export default class Main extends React.Component<IMainProps> {
  constructor(props: IMainProps) {  
    super(props);

    setLoggedIn(true);

    // Obtém os dados da lista de Categorias pelo interal name
    this.getCategoryListItems('Categorias e Menu');

    sleep(500).then(() => {

      var header = document.createElement("DIV");
      header.innerHTML = "<div class='header'><div class='logoHeader'></div><div id='webTitle'></div></div>"; 
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
      
      if(!location.href.match('.aspx')){
        pageCommandBar.classList.add("hiddenCommandBar");
        sharepointTopMenu.classList.add("hiddenCommandBar");
        topPlaceHolder.className = "topPlaceHolder-h100";
      }
      else{
        pageCommandBar.classList.remove("hiddenCommandBar");
        sharepointTopMenu.classList.remove("hiddenCommandBar");
          // if(!location.href.match('edit'))
          //   topPlaceHolder.className = "hiddenTopPlaceHolder";
      }

      ReactDOM.render(<SharePointWebTitle />, document.getElementById('webTitle'));
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

  public OpenCloseSideNav(){
    var element = document.getElementById("sideNav"); 
    element.classList.toggle("sideNav");

    language == "pt"?
      document.getElementById("btnTranslateEN-small").style.opacity = "0.3"
    :
      document.getElementById("btnTranslatePT-small").style.opacity = "0.3";        
  }

  public render() { 
    return (
      <div>
        <div id="root"></div>
          {location.href.match('.aspx') ?
            <FloatNav/>
          :
            null
          }          
          <HashRouter>   
            <nav className="w3-sidebar w3-bar-block w3-card w3-animate-left" id="sideNav"> 
            </nav>  
            <div> 
              <Switch>   
                  <Route exact path='/landingPage' component={LandingPage} /> 
                  <Route path='/favoritos' component={Favoritos} />
                  <Route path='/downloads' component={Downloads} />
                  <Route path='/comercial' component={Comercial} />
                  <Route path='/controladoria' component={Controladoria} />
                  <Route path='/manutencao' component={Manutencao} />
                  <Route path='/mina' component={Mina} />
                  <Route path='/pcp' component={Pcp} />
                  <Route path='/rh' component={Rh} />
                  <Route path='/subsidiarias' component={Subsidiarias} /> 
                  <Route path='/detalhes' component={Detalhes} />
                  <Route path='/detalhesDocumento' component={DetalhesDocumento} />                     
              </Switch> 
            </div> 
          </HashRouter>
        <div>
         <button onClick={this.OpenCloseSideNav} className="w3-xlarge btnOpenNav">☰<span>Menu</span></button>          
        </div>
      </div>
    );
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
              <div>
              <Link to={`/${item.linkPath.normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`} 
                className="w3-bar-item w3-button sideNavHeading" onClick={() => showCategory(item.Title)}>
                {/* A coluna linkTitle0 armazena o título do link a ser exibido no menu */}
                <div className="sideNavIcons" style = {{background: `url(${item.icon}) no-repeat center center`}}></div>
                <span>{item.Title}</span>
              </Link>              
              </div>
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
              <Link to={`/${item.linkPath.normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}                 
                className="w3-bar-item w3-button" onClick={() => showCategory(item.Title)}>
                {/* A coluna linkTitle0 armazena o título do link a ser exibido no menu */}
                <span>{item.Title}</span>
              </Link>
                            
              </div>
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
          <button id="btnTranslatePT-small" onClick={() => setLanguage('language', 'pt', 365, '/')} className="btnTranslatePT-small"></button> 
          <button id="btnTranslateEN-small" onClick={() => setLanguage('language', 'en', 365, '/')} className="btnTranslateEN-small"></button>       
        </div>  
      </ul>
    );
  }
}