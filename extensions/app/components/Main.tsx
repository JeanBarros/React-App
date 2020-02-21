import * as React from 'react';
import * as ReactDOM from "react-dom";  
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';
import { SPComponentLoader } from '@microsoft/sp-loader'; //Não remover

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
import Report from './Report';
import {SharePointWebTitle, language, setLoggedIn, categoryListItens, showCategory, logOut, setLanguage} from '../AppApplicationCustomizer';
import LandingPage from './LandingPage';

export interface IMainProps {}

let subLinks;
let categoryCollection;

export default class Main extends React.Component<IMainProps> {
  public domElement: any;  
  constructor(props: IMainProps) {  
    super(props);

    setLoggedIn(true) 
    this.RetrieveSPData();
    // sleep time expects milliseconds
    function sleep (time) {      
      return new Promise((resolve) => setTimeout(resolve, time));
    }

    // Usage!
    sleep(500).then(() => {
        // Do something after the sleep!
        
        // Cria um elemento
        const sideNavElements = <div><div className="sideNavLogo"></div><SideNav /></div>;            

        // Renderiza o dentro da tag SideNav
        ReactDOM.render(sideNavElements, document.getElementById('sideNav'));
        //ReactDOM.render(<SideNav />, document.getElementById('sideNav'));         
    });

    SPComponentLoader.loadScript('https://code.jquery.com/jquery-3.4.1.js', {
        globalExportsName: 'jQuery'
        }).then(($: any) => {
        this.jQuery = $;

        // after all JS files are successfully loaded
        setTimeout(() => {
          var header = document.createElement("DIV");
          header.innerHTML = "<div class='header'><div class='logoHeader'></div><div id='webTitle'></div></div>"; 
          document.getElementsByClassName('_71hjFgizWk0Cd55RzerwA')[0].appendChild(header);
          $('._2kc0c9nP-qti6fefMCFonk').css({'display':'none', 'font-size': 'initial', 'border': 'solid 1px red', 'float': 'left'});
        }, 500);
          
          // Obtém o valor do <input hidden field> e o define no elemento webTitle
        //   var siteName = $('#siteName').val();
        //   $('#webTitle').text(siteName);

          // Cabeçalho padrão das páginas modernas
          var mainHeader = document.getElementsByClassName("ms-CompositeHeader-collapsible")[0].parentNode.parentNode;
          mainHeader.parentNode.removeChild(mainHeader);

          ReactDOM.render(<SharePointWebTitle />, document.getElementById('webTitle'));        
      });
  }
  private jQuery: any;

  RetrieveSPData(){    
    var reactHandler = this;    

    var spRequest = new XMLHttpRequest();    
    spRequest.open('GET', "/sites/lab02/_api/web/lists/getbytitle('Categorias%20e%20Menu')/items",true);    
    spRequest.setRequestHeader("Accept","application/json");  
                        
    spRequest.onreadystatechange = function(){    
          
        if (spRequest.readyState === 4 && spRequest.status === 200){    
            var result = JSON.parse(spRequest.responseText);    
                
            reactHandler.setState({    
                items: result.value  
            }); 
            
            categoryCollection = result.value;
            console.log(categoryCollection)
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
                  <Route path='/report' component={Report} />                         
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
                <div className="sideNavIcons" style = {{background: `url(${item.icon})`}}></div>
                <span>{item.Title}</span>
              </Link>              
              </div>
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
      </li>);
    subLinks = categoryCollection.map((item) =>
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
    console.log(subLinks)
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
                  <div className="sideNavIcons"></div>
                  <span>Sair</span>
                </Link> 
              :
                <Link to={'/landingPage'} onClick={() => logOut()}
                  className="w3-bar-item w3-button sideNavLinkBottom">
                  <div className="sideNavIcons"></div>
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