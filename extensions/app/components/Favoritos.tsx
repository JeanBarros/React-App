import * as React from 'react';
import { ReportListItens } from '../AppApplicationCustomizer';

export interface IFavoritosProps {}  

export default class Favoritos extends React.Component<IFavoritosProps> {
  constructor(props: IFavoritosProps) {  
    super(props);
  }

  public render() {
    return (      
      <div>        
        <div>
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
          <div className="ms-Grid-row w3-container spaceBotton">
              <ReportListItens></ReportListItens>
          </div>
          </div>        
        </div>
    );
  } 
}