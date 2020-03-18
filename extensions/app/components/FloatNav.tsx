import * as React from 'react';
import * as ReactDOM from "react-dom";  
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';
import { relativeSiteUrl, getDashboard } from '../AppApplicationCustomizer';

let categoryCollection;

// Obtém o parametro via query string para exibir corretamente os itens no menu flutuante
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function getCurrentCategoryItens(){  
    
    var floatMenu = document.getElementById('floatListMenu');
    var menuLinks = floatMenu.getElementsByTagName('A');

    for(let i = 0; i < menuLinks.length; i++){
        if(menuLinks[i].getAttribute('data-category-name') == getUrlParameter('category')){
            menuLinks[i].classList.remove('floatMenuLinks-hidden');
            menuLinks[i].classList.add('floatMenuLinks-visible');
        }
    }
}

// Aguarda para garantir que elementos padrão do SharePoint sejam renderizados primeiro
function sleep (time) {      
    return new Promise((resolve) => setTimeout(resolve, time));
}

export default class FloatNav extends React.Component{
    constructor(props){
        super(props);

        // Obtém os dados da lista de Categorias pelo interal name
        this.getCategoryListItems('Reports');

        sleep(500).then(() => {
            console.log("Lista dos itens do menu flutuante");
            console.log(categoryCollection);

            // Cria um elemento
            const floatNavElements = <FloatNavListItens />;
            
            //Renderiza o dentro da tag SideNav
            ReactDOM.render(floatNavElements, document.getElementById('floatListMenu'));

            getCurrentCategoryItens();            
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
      
    public showFloatMenu() {
        var menuListBox = document.getElementById("floatListMenu");
        if (menuListBox.style.display === "block") {
            menuListBox.style.display = "none";
        } else {
            menuListBox.style.display = "block";
        }
    }

    public render(){
        
        let sharepointTopMenu = document.querySelector("[role='banner']");
        
        setTimeout(() => sharepointTopMenu.classList.add("hiddenCommandBar"), 1000);

        return(
            <div className="floatMenuContainer">
            <div id="floatListMenu" className="floatListMenu" style = {{"display" : "none"}}>              
            </div>
            <button onClick={this.showFloatMenu} className="floatButton"></button>            
          </div>
        );
    }
}

class FloatNavListItens extends React.Component{    
    public render(){   
    const links = categoryCollection.map((item) =>
    <li key={item.Id}> 
        <HashRouter>
            <Link className="floatMenuLinks-hidden" to="" data-category-name={item.categoryLookupValue} onClick={() => getDashboard(item.reportPage, item.categoryLookupValue)}>{item.Title}</Link>
        </HashRouter>          
    </li>);
    return( 
        <ul>
            {links}
        </ul>
    );
    }
}