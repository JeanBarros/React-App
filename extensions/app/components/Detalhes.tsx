import * as React from 'react';
import { ReportDetails } from '../AppApplicationCustomizer';

export interface IDetalhesProps {} 

export default class Detalhes extends React.Component<any> {  
  constructor(props: IDetalhesProps) {  
    super(props);
  }

  public render() {
    return ( 
      <div>     
        <ReportDetails></ReportDetails>
        <div className="ms-Grid-row w3-container">
          <div className="ms-Grid-col ms-sm12 ms-md12 block detalhes">
              <p>
                <i className="ms-Icon ms-Icon--ChevronLeftSmall"></i>                
                <a className="btnVoltar" href="#" onClick={() => this.props.history.goBack()}>Voltar</a>
              </p>
          </div>
        </div>
      </div>
    );
  } 
}