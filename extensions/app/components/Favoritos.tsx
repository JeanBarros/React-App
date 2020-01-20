import * as React from 'react';

export interface IFavoritosProps {}   

export default class Favoritos extends React.Component<IFavoritosProps> {  
  constructor(props: IFavoritosProps) {  
    super(props);
  }

  public OpenCloseSideNav(){
    var element = document.getElementById("sideNav"); 
    element.classList.toggle("sideNav");
  }

  public render() {
    
    return (
      <div>
        <div className="w3-sidebar w3-bar-block w3-card w3-animate-left" id="sideNav">
          <div className="sideNavLogo"></div>
          <ul>
            <li>
              <a href="#" className="w3-bar-item w3-button sideNavHeadLink">
                <i className="ms-Icon ms-Icon--FavoriteStarFill"></i>
                Favoritos
              </a>
            </li>
            <li>
              <a href="#" className="w3-bar-item w3-button sideNavHeadLink">
                <i className="ms-Icon ms-Icon--Download"></i>
                Downloads
              </a>
            </li>
            <li className="spacer"></li>
            <li className="sideNavHeadLink">
              <i className="ms-Icon ms-Icon--PowerBILogo"></i>
              Dashboards
            </li>
            <li>
              <ul className="sideNavSubLink">
                <li><a href="#" className="w3-bar-item w3-button">Comercial</a></li>
                <li><a href="#" className="w3-bar-item w3-button">Controladoria</a></li>
                <li><a href="#" className="w3-bar-item w3-button">Manutenção</a></li>
                <li><a href="#" className="w3-bar-item w3-button">Mina</a></li>
                <li><a href="#" className="w3-bar-item w3-button">PCP</a></li>
                <li><a href="#" className="w3-bar-item w3-button">RH</a></li>
                <li><a href="#" className="w3-bar-item w3-button">Subsidiárias</a></li>
                <li className="spacer"></li>
              </ul>
            </li>
            <li>
              <a href="#" className="w3-bar-item w3-button sideNavLink">
                <i className="ms-Icon ms-Icon--Add"></i>
                Adicionar Novo...
              </a>
            </li>
            <li>
              <a href="#" className="w3-bar-item w3-button sideNavLink">
                <i className="ms-Icon ms-Icon--SignOut"></i>
                Sair
              </a>
            </li>
          </ul>
        </div>
        <div>
          <button onClick={this.OpenCloseSideNav} className="w3-xlarge btnOpenNav">☰<span>Menu</span></button>
          <div className="ms-Grid-row w3-container">
            <div className="ms-Grid-col ms-md1 block"></div> 
            <div className="ms-Grid-col ms-sm12 ms-md10 block pageDescription">
              <h1>Favoritos</h1>
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
                <option value="comercial">Comercial</option>
                <option value="controladoria">Controladoria</option>
                <option value="manutencao">Manutenção</option>
                <option value="mina">Mina</option>
                <option value="pcp">PCP</option>
                <option value="rh">RH</option>
                <option value="subsidiarias">Subsidiárias</option>
              </select>
              <select name="Tipo">
                <option value="todosTipos">Todos os tipos</option>
                <option value="Dashboard">Dashboard</option>
                <option value="arquivo">Arquivo</option>
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
                        <i className="ms-Icon ms-Icon--PowerBILogo"></i>
                        <span>Dashboard</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tileToolBar">
                  <button className="btnDetalhes">Detalhes</button>
                  <button className="btnDashboard">Dashboard</button>
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
                        <i className="ms-Icon ms-Icon--PowerBILogo"></i>
                        <span>Dashboard</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tileToolBar">
                  <button className="btnDetalhes">Detalhes</button>
                  <button className="btnDashboard">Dashboard</button>
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
                        <i className="ms-Icon ms-Icon--PowerBILogo"></i>
                        <span>Dashboard</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tileToolBar">
                  <button className="btnDetalhes">Detalhes</button>
                  <button className="btnDashboard">Dashboard</button>
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
                        <i className="ms-Icon ms-Icon--PowerBILogo"></i>
                        <span>Dashboard</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tileToolBar">
                  <button className="btnDetalhes">Detalhes</button>
                  <button className="btnDashboard">Dashboard</button>
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
                        <i className="ms-Icon ms-Icon--PowerBILogo"></i>
                        <span>Dashboard</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tileToolBar">
                  <button className="btnDetalhes">Detalhes</button>
                  <button className="btnDashboard">Dashboard</button>
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
                        <i className="ms-Icon ms-Icon--PowerBILogo"></i>
                        <span>Dashboard</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tileToolBar">
                  <button className="btnDetalhes">Detalhes</button>
                  <button className="btnDashboard">Dashboard</button>
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  } 
}