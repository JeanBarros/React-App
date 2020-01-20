import * as React from 'react';  
import { SPComponentLoader } from '@microsoft/sp-loader'; //Não remover

import LandingPage from './LandingPage';
import Content from './Content';
import Favoritos from './Favoritos';
import Downloads from './Downloads';


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
          var siteName = $('#siteName').val();
          $('#webTitle').text(siteName);

          // Cabeçalho padrão das páginas modernas
          var mainHeader = document.getElementsByClassName("ms-CompositeHeader-collapsible")[0].parentNode.parentNode;
          mainHeader.parentNode.removeChild(mainHeader);
        
      });
  }  

  private jQuery: any;

  public render(): JSX.Element {  
    return (
      <div>
        {<Downloads/>} {/*Referenciando o componente*/}
        {/*<LandingPage/>*/} {/*Referenciando o componente*/}
        <div id="root"></div>
      </div>
    );  
  }  
}