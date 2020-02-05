import * as React from 'react';

export interface IDetalhesProps {} 

export default class Detalhes extends React.Component<any> {  
  constructor(props: IDetalhesProps) {  
    super(props);
  }

  public render() {
    return (      
      <div className="spaceBotton">
        <div className="ms-Grid-row w3-container">
          <div className="ms-Grid-col ms-md1 block"></div> 
          <div className="ms-Grid-col ms-sm12 ms-md10 block pageDescription">              
          </div> 
          <div className="ms-Grid-col ms-md1 block"></div>
        </div>
        <div className="ms-Grid-row w3-container">
          <div className="ms-Grid-col ms-sm12 ms-md9 block detalhes">
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
              <p style={{marginTop:'80px'}}>
                <i className="ms-Icon ms-Icon--ChevronLeftSmall"></i>                
                  <a className="btnVoltar" href="#" onClick={() => this.props.history.goBack()}>Voltar</a>
              </p>
          </div>            
          <div className="ms-Grid-col ms-sm12 ms-md3 block">
            <div className="reportBox">
              <div className="reportDetailImage">
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm4 ms-md4">
                    <div className="categoryIcon">
                      <i className="ms-Icon ms-Icon--ClassroomLogo"></i>                      
                    </div>
                  </div>  
                  <div className="ms-Grid-col ms-sm8 ms-md8">
                    Vendas<br></br>
                    FeNB
                  </div>
                </div> 
              </div>
              <div className="reportToolBar">              
                <button className="btnDashboard-Large">Dashboard</button>
                <p>
                  <button className="btnAddFavorites">Adicionar aos Favoritos</button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } 
}