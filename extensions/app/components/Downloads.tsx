import * as React from 'react';
import * as ReactDOM from "react-dom";
import { Link } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';
import * as moment from 'moment';
import { language } from '../AppApplicationCustomizer';

export interface IDownloadsProps {}

let documentCollection;
let documentTitle;
let downloadParametersCollection;

// Aguarda para garantir que elementos padrão do SharePoint sejam renderizados primeiro
function sleep (time) {      
  return new Promise((resolve) => setTimeout(resolve, time));
}

export default class Downloads extends React.Component<IDownloadsProps> {  
  constructor(props: IDownloadsProps) {  
    super(props);

    // Obtém os dados da lista de Parâmetros de Downloads pelo internal name
    this.getDownloadsParameters('downloadsParameters');     

    // Obtém os dados da lista de Categorias pelo internal name
    this.getDocuments('Documentos%20Partilhados');

    sleep(500).then(() => {

      // Cria os elementos
      const documentElements = <Documentlist />;  
      const parametros = <DocumentsDownloadParamters />;  
      
      //Renderiza os elementos dentro das tags
      ReactDOM.render(documentElements, document.getElementById('documentList'));
      ReactDOM.render(parametros, document.getElementById('downlodDescription'));      
    });
  }

  private getDocuments(listName){    
    var reactHandler = this;    

    var spRequest = new XMLHttpRequest();    
    spRequest.open('GET', `/sites/bienterprise/_api/web/GetFolderByServerRelativeUrl('${listName}')/Files?$expand=ListItemAllFields`,true);    
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

  private getDownloadsParameters(listName){    
    var reactHandler = this;    

    var spRequest = new XMLHttpRequest();    
    spRequest.open('GET', `/sites/bienterprise/_api/web/lists/getbytitle('${listName}')/items`,true);
    spRequest.setRequestHeader("Accept","application/json");  

    spRequest.onreadystatechange = () =>{
        if (spRequest.readyState === 4 && spRequest.status === 200){    
            var result = JSON.parse(spRequest.responseText);    
                
            reactHandler.setState({    
                items: result.value  
            }); 
            
            downloadParametersCollection = result.value;
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
          <div id="CategoryListItens"><div>
            <div className="ms-Grid-col ms-sm12 ms-md10 block pageDescription">
              <div id="downlodDescription"></div>
            </div>
          </div>
        </div>
        <div className="ms-Grid-col ms-md1 block"></div> 
          <div id="documentList"></div>          
      </div>
    );
  } 
}

class DocumentsDownloadParamters extends React.Component{
  public render(){
    console.log('Parameters here:');
    console.log(downloadParametersCollection);
    const downLoadsparameters = downloadParametersCollection.map((item) =>
      <section key={item.Id}>
        <h1>{item.Title}</h1>
        <p>
          {language == "pt" ?
            item.description
          :
            item.descriptionEN
          }
        </p>
      </section>);

    return(
      <div>
          {downLoadsparameters}
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
              <div className="tileBox" style = {{background: `url(${item.ListItemAllFields.documentBackground}) no-repeat center center`}}>
                <div className="tileBoxOverlay">
                  <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm8 ms-md8">
                      <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm4 ms-md4">
                          <div className="reportCategoryIcon" style = {{background: `url(${item.ListItemAllFields.icone})`}}>                                            
                          </div>
                        </div>  
                        <div className="ms-Grid-col ms-sm8 ms-md8 reportCategoryDescription documentTitle">
                          {language == "pt" ?
                            item.ListItemAllFields.Title
                          :
                            item.ListItemAllFields.titleEN
                          }
                        </div>
                      </div>                    
                    </div>           
                    <div className="ms-Grid-col ms-sm4 ms-md4">
                      <div className="downloadInfo">
                        <div className="downloadType">                      
                          {language == "pt" ?
                            <div>
                              <span>Tipo:</span>                      
                              <div className="downloadIconType">
                                <span>Arquivo</span>
                              </div>
                            </div>
                          :
                            <div>
                              <span>Type:</span>                      
                              <div className="downloadIconType">
                                <span>File</span>
                              </div>
                            </div>
                          }                          
                        </div>
                      </div>
                    </div>
                  </div>
                    <div className="tileBoxToolBar">
                      <HashRouter>
                        <Link onClick={() => getDocumentTitle(item.Title)} className="btnDetalhes" to={`/detalhesDocumento`}>
                          <div className="btnDetalhes-Icon">&nbsp;</div>
                          <span>
                            {language == "pt" ?
                              "Detalhes"
                            :
                              "Details"
                            }
                          </span>
                        </Link>                      
                      </HashRouter>
                        <button onClick={() => showModal(item.LinkingUrl.split('?')[0])} className="btnDashboard">
                          <div className="btnDownload-Icon">&nbsp;</div>
                          <span>Download</span>
                        </button>
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

function showModal(url){  

  window.location.replace(url);
  document.body.innerHTML += `<div id='modalBox' class='downloadModal'></div>`;

  // Cria um elemento
  const modalBoxElements = <DownloadModal />;
      
  //Renderiza o dentro da tag SideNav
  ReactDOM.render(modalBoxElements, document.getElementById('modalBox'));
}

function hideModal(){
  location.reload();
}

class DownloadModal extends React.Component{
  public render(){
    
    let downloadMsgConfirm: string;
      
    language == 'pt' ?
      downloadMsgConfirm = "Download realizado com sucesso!"
    :
      downloadMsgConfirm = "Download succeed!";

    const modalBoxContent = <div className='downloadCenterBox'>
    <div className='downloadCenterBox-content'>
      
      <h1>{downloadMsgConfirm}</h1>  
      <HashRouter>
        <Link onClick={() => hideModal()} className="btnDetalhes">
          <span>
            {language == "pt" ? 
              "Voltar"
            :
              "Back"
            }
          </span>
        </Link>                      
      </HashRouter>
    </div>
  </div>;
    return(
      modalBoxContent
    );
  }
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
              {language == "pt" ?
                <div>
                  <h1>{item.Title}</h1>
                  <p><span>Tipo: </span>Documento</p>
                  <p><span>Autor: </span>{item.ListItemAllFields.author0}</p>
                  <p><span>Data de criação: </span>{moment(item.TimeCreated).format('DD/MM/YYYY')}</p>
                  <p>{item.ListItemAllFields.detalhes}</p>
                </div>
              :
                <div>
                  <h1>{item.ListItemAllFields.titleEN}</h1>
                  <p><span>Type: </span>Document</p>
                  <p><span>Author: </span>{item.ListItemAllFields.author0}</p>
                  <p><span>Creation date: </span>{moment(item.TimeCreated).format('DD/MM/YYYY')}</p>
                  <p>{item.ListItemAllFields.detailsEN}</p>
                </div>
              }              
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