import * as React from 'react';
import * as ReactDOM from "react-dom";
import { ReportDetails, language } from '../AppApplicationCustomizer';
import { DocumentDetails } from './Downloads';

export interface IDetalhesDocumentoProps {} 

let documentCollection;

// Aguarda para garantir que elementos padrão do SharePoint sejam renderizados primeiro
function sleep (time) {      
    return new Promise((resolve) => setTimeout(resolve, time));
  }

export default class DetalhesDocumento extends React.Component<any> {  
  constructor(props: IDetalhesDocumentoProps) {  
    super(props);

    // Obtém os dados da lista de Categorias pelo display name
    this.getDocuments('Documentos Compartilhados');

    sleep(500).then(() => {

      // Cria um elemento
      const documentElements = <DocumentDetails />;
      
      //Renderiza o dentro da tag SideNav
      ReactDOM.render(documentElements, document.getElementById('documentDetails'));
    });
  }

  private getDocuments(listName){    
    var reactHandler = this;    

    var spRequest = new XMLHttpRequest();    
    spRequest.open('GET', `/sites/lab02/_api/web/GetFolderByServerRelativeUrl('${listName}')/Files?$expand=ListItemAllFields`,true);    
    spRequest.setRequestHeader("Accept","application/json");  

    spRequest.onreadystatechange = () =>{
        if (spRequest.readyState === 4 && spRequest.status === 200){    
            var result = JSON.parse(spRequest.responseText);    
                
            reactHandler.setState({    
                items: result.value  
            }); 
            
            documentCollection = result.value;
            
            console.log('Documents here:');
        }    
        else if (spRequest.readyState === 4 && spRequest.status !== 200){    
            console.log('Error Occured !');    
        }    
    };    
    spRequest.send();    
  }

  public render() {
    return ( 
      <div>     
        <div id="documentDetails"></div>
        <div className="ms-Grid-row w3-container">
          <div className="ms-Grid-col ms-sm12 ms-md12 block detalhes">
              <p>
                <i className="ms-Icon ms-Icon--ChevronLeftSmall"></i>                
                <a className="btnVoltar" href="#" onClick={() => this.props.history.goBack()}>
                    {language == "pt" ?
                        "Voltar"
                    :
                        "Back"
                    }
                </a>
              </p>
          </div>
        </div>
      </div>
    );
  } 
}