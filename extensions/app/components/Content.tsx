import * as React from 'react';

export interface IcontentProps {}   

export default class Content extends React.Component<IcontentProps> {  
  constructor(props: IcontentProps) {  
    super(props);
  }

  public render() {
      
    return (
      <div style={{textAlign: "center", paddingTop: "50px"}}>
        <h1>Content goes here</h1>
      </div>
    );
  } 
}