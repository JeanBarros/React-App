import * as React from 'react';
import * as ReactDOM from "react-dom";
import { Link } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';
import * as moment from 'moment';

export interface IDownloadsProps {}

let documentCollection;
let documentTitle;

// Aguarda para garantir que elementos padrão do SharePoint sejam renderizados primeiro
function sleep (time) {      
  return new Promise((resolve) => setTimeout(resolve, time));
}

export default class Downloads extends React.Component<IDownloadsProps> {  
  constructor(props: IDownloadsProps) {  
    super(props);

    // Obtém os dados da lista de Categorias pelo display name
    this.getDocuments('Documentos Compartilhados');

    sleep(500).then(() => {

      // Cria um elemento
      const documentElements = <Documentlist />;
      
      //Renderiza o dentro da tag SideNav
      ReactDOM.render(documentElements, document.getElementById('documentList'));
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
      <div id="customContent" className="ms-Grid-row w3-container content">
        <div className="ms-Grid-col ms-md1 block"></div> 
          {/* <div id="CategoryListItens"><CategoryListItens/></div>  */}
          <div id="CategoryListItens"><div>
            <div className="ms-Grid-col ms-sm12 ms-md10 block pageDescription">
              <div id="categoryName"><h1>Downloads</h1>
                <p>CBMM's history is closely linked to the development of niobium processing and applications. 
                  When the Company was founded in the 1950s, there was neither the market nor the know-how to produce 
                  niobium. CBMM developed the uses of niobium and created a market for it, through a program for the 
                  development of niobium technology and the promotion of its effectiveness, 
                  demonstrating the advantages that make niobium an insurmountable element in its main applications.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="ms-Grid-col ms-md1 block"></div> 
          <div id="documentList"></div>          
      </div>
    );
  } 
}

class Documentlist extends React.Component{
  public render(){
    console.log(documentCollection);
    const documents = documentCollection.map((item) =>
      <section key={item.Id}>
        <div className="ms-Grid-col ms-sm12 ms-md4 block">
              <div className="tileBox">
                <div className="tileBoxOverlay">
                  <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm8 ms-md8">
                      <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm4 ms-md4">
                          <div className="reportCategoryIcon" style = {{background: `url(${item.ListItemAllFields.icone})`}}>                                            
                          </div>
                        </div>  
                        <div className="ms-Grid-col ms-sm8 ms-md8 reportCategoryDescription">
                          {item.Title}
                        </div>
                      </div>                    
                    </div>           
                    <div className="ms-Grid-col ms-sm4 ms-md4">
                      <div className="reportCategoryInfo">
                        <br></br>
                        <strong>Tipo:</strong>
                        <div className="reportCategoryType">                      
                          <i className="ms-Icon ms-Icon--TextDocument"></i>
                          <span>Arquivo</span>
                        </div>
                      </div>
                    </div>
                  </div>
                    <div className="tileBoxToolBar">
                      <HashRouter>
                        <Link onClick={() => getDocumentTitle(item.Title)} className="btnDetalhes" to={`/detalhesDocumento`}>Detalhes</Link>                      
                      </HashRouter>
                      <a href={item.LinkingUrl.split('?')[0]} className="btnDashboard">Download</a>
                      {console.log(item.ListItemAllFields.detalhes)}
                  </div>
                </div>
              </div>
            </div>
      </section>);

    return(
      <div>
          {documents}
      </div>
    );
  } 
}

function getDocumentTitle(title){
  documentTitle = title;
}

export class DocumentDetails extends React.Component{
  public render(){
    console.log(documentCollection);
    const documentDetails = documentCollection.map((item) =>
    <section key={item.Id}>          
      {item.Title == documentTitle ?
        <div className="content">
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
                <p><span>Tipo: </span>Documento</p>
                <p><span>Autor: </span>{item.ListItemAllFields.author0}</p>
                <p><span>Data de criação: </span>{moment(item.TimeCreated).format('DD/MM/YYYY')}</p>
                <p>{item.ListItemAllFields.detalhes}</p>
              </div>
            </div>
          </div>
        </div>
      :
      null}
    </section>                 
  );

    return(
      <div>
          {documentDetails}
      </div>
    );
  } 
}