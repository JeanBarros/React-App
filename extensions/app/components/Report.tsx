import * as React from 'react';
import { checkFavoriteItens, FavoriteListItens, FavoriteCategoryListItens, language, setCategory, selectedCategory, reportPageUrl } from '../AppApplicationCustomizer';
import * as ReactDOM from 'react-dom';

export interface IReportProps {}

export default class Report extends React.Component<IReportProps> {
  constructor(props: IReportProps) {  
    super(props);

    setCategory(selectedCategory);    
  }

  public render() {

    return (
      <div>        
        <iframe id="reports" className="reportDisplay" src={reportPageUrl}></iframe>
      </div>      
    );
  } 
}