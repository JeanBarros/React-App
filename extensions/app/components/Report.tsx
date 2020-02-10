import * as React from 'react';
import Report from 'powerbi-report-component';

export interface IReportProps {}   

export default class Report extends React.Component<any> {  
  constructor(props) {
    super(props);

    var categoryDescription = document.createElement("DIV");
    categoryDescription.innerHTML = `<div id='categoryDescription' class='categoryDescription'> 
    <iframe id="report" src="/sites/Lab02/SitePages/Report.aspx" class="reportContainer"></iframe>     
    </div>`;
    
    document.getElementsByClassName('ms-SPLegacyFabricBlock')[0].appendChild(categoryDescription); 
  }
  
  public render() {     
    return (
      <div className="reportPage">
        <div className="ms-Grid-row w3-container">            
          <div className="ms-Grid-col ms-sm12 ms-md12 block"> 
          </div>
        </div>
      </div>
    );
  } 
}