import * as React from 'react';  
import { SPComponentLoader } from '@microsoft/sp-loader'; //Não remover

import "../app.css";

import Content from './Content'

export interface IMainProps {}   

export default class Main extends React.Component<IMainProps> {
  domElement: any;  
  constructor(props: IMainProps) {  
    super(props)

    SPComponentLoader.loadScript('https://code.jquery.com/jquery-3.4.1.js', {
        globalExportsName: 'jQuery'
        }).then(($: any) => {
        this.jQuery = $;

        // after all JS files are successfully loaded
        setTimeout(function(){
          var header = document.createElement("DIV");
          header.innerHTML = "<div class='header'><div class='logo'></div><div id='webTitle'></div></div>"; 
          document.getElementsByClassName('_71hjFgizWk0Cd55RzerwA')[0].appendChild(header); 

          // Estes elementos são ocultados no arquivo app.css
          // Em conexões lentas, os elementos padrão do SharePoint às vezes demoram para serem carregados
          // Caso o CSS seja carregado antes do elemento ser rederizado, uma segunda ação é realizada
          $('.mainHeader-163').hide()
          $('._2kc0c9nP-qti6fefMCFonk').css({'display':'none', 'font-size': 'initial', 'border': 'solid 1px red', 'float': 'left'})
          $('.header').css('margin-left','130px')
          
          // Obtém o valor do <input hidden field> e o define no elemento webTitle
          var siteName = $('#siteName').val()
          $('#webTitle').text(siteName)
        }, 2000);
        
      });
  }  

  private jQuery: any;

  public render(): JSX.Element {  
    return (
      <div>
        <Content/> {/*Referenciando o componente*/}
        <div id="root"></div>
      </div>
    );  
  }  
}