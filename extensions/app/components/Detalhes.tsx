import * as React from 'react';
import { ReportDetails, language } from '../AppApplicationCustomizer';
import { sleep } from './Main';
import * as ReactDOM from 'react-dom';

export interface IDetalhesProps {} 

export default class Detalhes extends React.Component<any> {  
  constructor(props: IDetalhesProps) {  
    super(props);

    sleep(200).then(() => { 
      
    // Cria os elementos
    const reportDetails = <ReportDetails />;
    
    //Renderiza os elementos criados dentro das tags
    ReactDOM.render(reportDetails, document.getElementById('reportDetails'));
    });
  }

  public render() {
    return ( 
      <div>     
        <div id="reportDetails"></div>
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