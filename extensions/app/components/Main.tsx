import * as React from 'react';
import * as ReactDOM from "react-dom";  
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
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
import {SharePointData, SharePointWebTitle} from '../AppApplicationCustomizer'

export interface IMainProps {}   

export default class Main extends React.Component<IMainProps> {
  public domElement: any;  
  constructor(props: IMainProps) {  
    super(props);

    SPComponentLoader.loadScript('https://code.jquery.com/jquery-3.4.1.js', {
        globalExportsName: 'jQuery'
        }).then(($: any) => {
        this.jQuery = $;

        // after all JS files are successfully loaded
        // setTimeout(function(){
          
        // }, 2000);

        var header = document.createElement("DIV");
          header.innerHTML = "<div class='header'><div class='logoHeader'></div><div id='webTitle'></div></div>"; 
          document.getElementsByClassName('_71hjFgizWk0Cd55RzerwA')[0].appendChild(header); 

          $('._2kc0c9nP-qti6fefMCFonk').css({'display':'none', 'font-size': 'initial', 'border': 'solid 1px red', 'float': 'left'});
          
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

  public OpenCloseSideNav(){
    var element = document.getElementById("sideNav"); 
    element.classList.toggle("sideNav");
  }

  public render(): JSX.Element {

    
    return (
      <div>  
          <div id="myData">            
            <SharePointData />
          </div>        
          <HashRouter>   
                <nav className="w3-sidebar w3-bar-block w3-card w3-animate-left" id="sideNav">    
                    <div className="sideNavLogo"></div>
                    <ul>    
                        <li>
                            <Link to={'/favoritos'} className="w3-bar-item w3-button sideNavHeadLink">
                                <i className="ms-Icon ms-Icon--FavoriteStarFill"></i>
                                <span>Favoritos</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/downloads'} className="w3-bar-item w3-button sideNavHeadLink">
                                <i className="ms-Icon ms-Icon--Download"></i>
                                <span>Downloads</span>
                            </Link>
                        </li>
                        <li className="spacer"></li>
                        <li className="sideNavHeadLink">
                        <i className="ms-Icon ms-Icon--PowerBILogo"></i>
                        Dashboards
                        </li>
                        <li>
                        <ul id="sideNavSubLinks" className="sideNavSubLink">
                            <li>
                                <Link to={'/comercial'} className="w3-bar-item w3-button">
                                    Comercial
                                </Link>
                            </li>
                            <li>
                                <Link to={'/controladoria'} className="w3-bar-item w3-button">
                                    Controladoria
                                </Link>
                            </li>
                            <li>
                                <Link to={'/manutencao'} className="w3-bar-item w3-button">
                                    Manutenção
                                </Link>
                            </li>
                            <li>
                                <Link to={'/mina'} className="w3-bar-item w3-button">
                                    Mina
                                </Link>
                            </li>
                            <li>
                                <Link to={'/pcp'} className="w3-bar-item w3-button">
                                    PCP
                                </Link>
                            </li>
                            <li>
                                <Link to={'/rh'} className="w3-bar-item w3-button">
                                    RH
                                </Link>
                            </li>
                            <li>
                                <Link to={'/subsidiarias'} className="w3-bar-item w3-button">
                                    Subsidiárias
                                </Link>
                            </li>
                            <li className="spacer"></li>
                        </ul>
                        </li>
                        <li>
                        <a href="#" className="w3-bar-item w3-button sideNavLink">
                            <i className="ms-Icon ms-Icon--Add"></i>
                            Adicionar Novo...
                        </a>
                        </li>
                        <li>
                        <a href="#" className="w3-bar-item w3-button sideNavLink">
                            <i className="ms-Icon ms-Icon--SignOut"></i>
                            Sair
                        </a>
                        </li>  
                    </ul>
                </nav>  
                <div> 
                    <Switch>    
                        <Route exact path='/favoritos' component={Favoritos} />
                        <Route path='/downloads' component={Downloads} />
                        <Route path='/comercial' component={Comercial} />
                        <Route path='/controladoria' component={Controladoria} />
                        <Route path='/manutencao' component={Manutencao} />
                        <Route path='/mina' component={Mina} />
                        <Route path='/pcp' component={Pcp} />
                        <Route path='/rh' component={Rh} />
                        <Route path='/subsidiarias' component={Subsidiarias} /> 
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