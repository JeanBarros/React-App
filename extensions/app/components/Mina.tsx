import * as React from 'react';

export interface IMinaProps {}   

export default class Mina extends React.Component<IMinaProps> {  
  constructor(props: IMinaProps) {  
    super(props);
  }

  public render() {    
    return (
      <div>
        <div>
          <div className="ms-Grid-row w3-container">
            <div className="ms-Grid-col ms-md1 block"></div> 
            <div className="ms-Grid-col ms-sm12 ms-md10 block pageDescription">
              <h1>Mina</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultrices dapibus egestas. 
                Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. 
                Vivamus efficitur urna vel velit porttitor tempus. Aliquam arcu orci, laoreet a tortor in, 
                sollicitudin blandit ex. Ut dapibus dui vel nulla efficitur, posuere venenatis leo volutpat. 
                Mauris vel interdum felis. Duis iaculis blandit lacus eget pellentesque.</p>
            </div> 
            <div className="ms-Grid-col ms-md1 block"></div>
          </div>
          <div className="ms-Grid-row w3-container">
            <div className="ms-Grid-col ms-sm6 ms-md6 block favoriteFilters">
              Filtrar por:
              <select name="Categoria">
                <option value="Categoria">Categoria</option>
                <option value="todasCategorias">Todas as categorias</option>
                <option value="Mina">Mina</option>
                <option value="Mina">Mina</option>
                <option value="Mina">Manutenção</option>
                <option value="mina">Mina</option>
                <option value="pcp">PCP</option>
                <option value="rh">RH</option>
                <option value="subsidiarias">Subsidiárias</option>
              </select>
            </div>            
            <div className="ms-Grid-col ms-sm6 ms-md6 block favoriteFilters">
              <div className="filterOrder">
                Ordenar por:
                <select name="Order">
                  <option value="maisRecente">Mais recente</option>
                  <option value="maisAntigo">Mais antigo</option>
                  <option value="az">Ordem A > Z</option>
                  <option value="za">Ordem Z > A</option>
                </select>
              </div>
            </div>
          </div>
          <div className="ms-Grid-row w3-container">
            <div className="ms-Grid-col ms-sm12 ms-md4 block">
              <div className="tile">
                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-sm6 ms-md6">
                    <div className="ms-Grid-row">
                      <div className="ms-Grid-col ms-sm4 ms-md4">
                        <div className="categoryIcon">
                          <i className="ms-Icon ms-Icon--ClassroomLogo"></i>                      
                        </div>
                      </div>  
                      <div className="ms-Grid-col ms-sm8 ms-md8 categoryDescription">
                        Vendas<br></br>
                        FeNB (T)
                      </div>
                    </div>                    
                  </div>           
                  <div className="ms-Grid-col ms-sm6 ms-md6">
                    <div className="categoryInfo">
                      <i className="ms-Icon ms-Icon--FavoriteStarFill"></i>
                      <br></br>
                      <strong>Tipo:</strong>
                      <div className="categoryType">                      
                        <i className="ms-Icon ms-Icon--TextDocument"></i>
                        <span>Arquivo</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tileToolBar">
                  <button className="btnDetalhes">Detalhes</button>
                  <button className="btnDashboard">Download</button>
                </div>
              </div>
            </div> 
            <div className="ms-Grid-col ms-sm12 ms-md4 block">
            <div className="tile">
                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-sm6 ms-md6">
                    <div className="ms-Grid-row">
                      <div className="ms-Grid-col ms-sm4 ms-md4">
                        <div className="categoryIcon">
                          <i className="ms-Icon ms-Icon--ClassroomLogo"></i>                      
                        </div>
                      </div>  
                      <div className="ms-Grid-col ms-sm8 ms-md8 categoryDescription">
                        Vendas<br></br>
                        FeNB (T)
                      </div>
                    </div>                    
                  </div>           
                  <div className="ms-Grid-col ms-sm6 ms-md6">
                    <div className="categoryInfo">
                      <i className="ms-Icon ms-Icon--FavoriteStarFill"></i>
                      <br></br>
                      <strong>Tipo:</strong>
                      <div className="categoryType">                      
                        <i className="ms-Icon ms-Icon--TextDocument"></i>
                        <span>Arquivo</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tileToolBar">
                  <button className="btnDetalhes">Detalhes</button>
                  <button className="btnDashboard">Download</button>
                </div>
              </div>
            </div> 
            <div className="ms-Grid-col ms-sm12 ms-md4 block">
            <div className="tile">
                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-sm6 ms-md6">
                    <div className="ms-Grid-row">
                      <div className="ms-Grid-col ms-sm4 ms-md4">
                        <div className="categoryIcon">
                          <i className="ms-Icon ms-Icon--ClassroomLogo"></i>                      
                        </div>
                      </div>  
                      <div className="ms-Grid-col ms-sm8 ms-md8 categoryDescription">
                        Vendas<br></br>
                        FeNB (T)
                      </div>
                    </div>                    
                  </div>           
                  <div className="ms-Grid-col ms-sm6 ms-md6">
                    <div className="categoryInfo">
                      <i className="ms-Icon ms-Icon--FavoriteStarFill"></i>
                      <br></br>
                      <strong>Tipo:</strong>
                      <div className="categoryType">                      
                        <i className="ms-Icon ms-Icon--TextDocument"></i>
                        <span>Arquivo</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tileToolBar">
                  <button className="btnDetalhes">Detalhes</button>
                  <button className="btnDashboard">Download</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ms-Grid-row w3-container">
            <div className="ms-Grid-col ms-sm12 ms-md12 block">
              <p>&nbsp;</p>
            </div>
          </div>
        <div className="ms-Grid-row w3-container spaceBotton">
            <div className="ms-Grid-col ms-sm12 ms-md4 block">
            <div className="tile">
                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-sm6 ms-md6">
                    <div className="ms-Grid-row">
                      <div className="ms-Grid-col ms-sm4 ms-md4">
                        <div className="categoryIcon">
                          <i className="ms-Icon ms-Icon--ClassroomLogo"></i>                      
                        </div>
                      </div>  
                      <div className="ms-Grid-col ms-sm8 ms-md8 categoryDescription">
                        Vendas<br></br>
                        FeNB (T)
                      </div>
                    </div>                    
                  </div>           
                  <div className="ms-Grid-col ms-sm6 ms-md6">
                    <div className="categoryInfo">
                      <i className="ms-Icon ms-Icon--FavoriteStarFill"></i>
                      <br></br>
                      <strong>Tipo:</strong>
                      <div className="categoryType">                      
                        <i className="ms-Icon ms-Icon--TextDocument"></i>
                        <span>Arquivo</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tileToolBar">
                  <button className="btnDetalhes">Detalhes</button>
                  <button className="btnDashboard">Download</button>
                </div>
              </div>
            </div> 
            <div className="ms-Grid-col ms-sm12 ms-md4 block">
            <div className="tile">
                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-sm6 ms-md6">
                    <div className="ms-Grid-row">
                      <div className="ms-Grid-col ms-sm4 ms-md4">
                        <div className="categoryIcon">
                          <i className="ms-Icon ms-Icon--ClassroomLogo"></i>                      
                        </div>
                      </div>  
                      <div className="ms-Grid-col ms-sm8 ms-md8 categoryDescription">
                        Vendas<br></br>
                        FeNB (T)
                      </div>
                    </div>                    
                  </div>           
                  <div className="ms-Grid-col ms-sm6 ms-md6">
                    <div className="categoryInfo">
                      <i className="ms-Icon ms-Icon--FavoriteStarFill"></i>
                      <br></br>
                      <strong>Tipo:</strong>
                      <div className="categoryType">                      
                        <i className="ms-Icon ms-Icon--TextDocument"></i>
                        <span>Arquivo</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tileToolBar">
                  <button className="btnDetalhes">Detalhes</button>
                  <button className="btnDashboard">Download</button>
                </div>
              </div>
            </div> 
            <div className="ms-Grid-col ms-sm12 ms-md4 block">
            <div className="tile">
                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-sm6 ms-md6">
                    <div className="ms-Grid-row">
                      <div className="ms-Grid-col ms-sm4 ms-md4">
                        <div className="categoryIcon">
                          <i className="ms-Icon ms-Icon--ClassroomLogo"></i>                      
                        </div>
                      </div>  
                      <div className="ms-Grid-col ms-sm8 ms-md8 categoryDescription">
                        Vendas<br></br>
                        FeNB (T)
                      </div>
                    </div>                    
                  </div>           
                  <div className="ms-Grid-col ms-sm6 ms-md6">
                    <div className="categoryInfo">
                      <i className="ms-Icon ms-Icon--FavoriteStarFill"></i>
                      <br></br>
                      <strong>Tipo:</strong>
                      <div className="categoryType">                      
                        <i className="ms-Icon ms-Icon--TextDocument"></i>
                        <span>Arquivo</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tileToolBar">
                  <button className="btnDetalhes">Detalhes</button>
                  <button className="btnDashboard">Download</button>
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  } 
}