import * as React from 'react';

export interface IComercialProps {}   

export default class Comercial extends React.Component<IComercialProps> {  
  constructor(props: IComercialProps) {  
    super(props);
  }

  public render() {    
    return (
      <div className="reportPage">
        <div className="ms-Grid-row w3-container">            
          <div className="ms-Grid-col ms-sm12 ms-md12 block">              
            <img src="https://keyruspbi.sharepoint.com/sites/Lab02/SiteAssets/images/icons/report.png"></img>
          </div>
        </div>
      </div>
    );
  } 
}