import * as React from 'react';
import Main from './Main';
import { setLanguage } from '../AppApplicationCustomizer';

export interface ILandingPageProps {}   

function UserGreeting(props) {
  return (
    <div>      
      <Main/>
    </div>
  );
}

function GuestGreeting(props) {
  return (
    <div></div>    
  );
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return (
      <div>
        <UserGreeting />        
      </div>
    );
  }
  return <GuestGreeting />;
}

function LoginButton(props) {
  return (    
    <div id="overlay">
        <div className="ms-Grid-row"> 
        <div className="ms-Grid-col ms-sm6 ms-md2 block"></div> 
        <div className="ms-Grid-col ms-sm12 ms-md4 block">
          <div className="content"> 
            <button onClick={() => setLanguage('language', 'pt', 365, '/')} style={{color:"red"}}>Português</button> 
            <button onClick={() => setLanguage('language', 'en', 365, '/')} style={{color:"red"}}>Inglês</button>
            <div className="logoLandingPage"></div>
            <h1>Bem vindo ao <br/>Enterprise BI Portal</h1>
            <p>Clique abaixo para entrar na plataforma</p>
            <button onClick={props.onClick} className="btnLogin">
              <div>
                <i className="ms-Icon ms-Icon--ClosePane" aria-hidden="true"></i>
                <span>ACESSAR</span>
              </div>
            </button>          
          </div> 
        </div>
        <div className="ms-Grid-col ms-sm6 ms-md2 block"></div> 
        <div className="ms-Grid-col ms-sm6 ms-md2 block"></div> 
        <div className="ms-Grid-col ms-sm6 ms-md2 block"></div> 
      </div>      
    </div>
  );
}

class LoginControl extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  public handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  public handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  public render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;

    if(!isLoggedIn)
      button = <LoginButton onClick={this.handleLoginClick} />;

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

export default class LandingPage extends React.Component<ILandingPageProps> {
  constructor(props: ILandingPageProps) {  
    super(props);    
  }

  public render() {
    return (
      <div>
        <div id="root"></div>        
        <LoginControl />
      </div>
    );  
  }
}