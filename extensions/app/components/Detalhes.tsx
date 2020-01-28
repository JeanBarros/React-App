import * as React from 'react';

export interface IComercialProps {}   

export default class Comercial extends React.Component<IComercialProps> {  
  constructor(props: IComercialProps) {  
    super(props);
  }

  public render() {    
    return (      
      <div>
        <div className="ms-Grid-row w3-container">
          <div className="ms-Grid-col ms-md1 block"></div> 
          <div className="ms-Grid-col ms-sm12 ms-md10 block pageDescription">              
          </div> 
          <div className="ms-Grid-col ms-md1 block"></div>
        </div>
        <div className="ms-Grid-row w3-container spaceBotton">
          <div className="ms-Grid-col ms-sm9 ms-md9 block detalhes">
              <h1>Vendas FeNB</h1>
              <p><span>Categoria: </span>xxx</p>
              <p><span>Tipo: </span>xxx</p>
              <p><span>Autor: </span>xxx</p>
              <p><span>Data de criação: </span>xxx</p>  
              <p>  
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultrices dapibus egestas. 
              Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. 
              Vivamus efficitur urna vel velit porttitor tempus. Aliquam arcu orci, laoreet a tortor in, 
              sollicitudin blandit ex. Ut dapibus dui vel nulla efficitur, posuere venenatis leo volutpat. 
              Mauris vel interdum felis. Duis iaculis blandit lacus eget pellentesque.
            </p>              
          </div>            
          <div className="ms-Grid-col ms-sm3 ms-md3 block">
            <div className="reportTools">
              xxx
            </div>
          </div>
        </div>
      </div>
    );
  } 
}