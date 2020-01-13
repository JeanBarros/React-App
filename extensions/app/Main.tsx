import * as React from 'react';  
import { SPComponentLoader } from '@microsoft/sp-loader'; //Não remover

import './app.css';
//import './app.js'

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

        SPComponentLoader.loadScript('/sites/Lab02/SiteAssets/scripts/App.js', {
        }).then(() => {
          // after all JS files are successfully loaded
          $('.root-156').hide()
          
          setTimeout(function(){
            var header = document.createElement("DIV");
            header.innerHTML = "<div class='header'><div class='logo'></div><div id='webTitle'></div></div>"; 
            document.getElementsByClassName('_71hjFgizWk0Cd55RzerwA')[0].appendChild(header); 
            
            // Obtém o valor do <input hidden field> e o define no elemento webTitle
            var siteName = $('#siteName').val()
            $('#webTitle').text(siteName)
          }, 1000);
          
        });
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