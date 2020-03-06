import * as React from 'react';
import { BrowserRouter as Redirect } from 'react-router-dom';
import Main from './Main';
import { setLanguage, language, isLogged} from '../AppApplicationCustomizer';

export interface ILandingPageProps {}   

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return (
      <div>
        <Main/>       
      </div>
    );
  }
  return (
    <div></div>
  );
}

function LoginButton(props) {
  return (    
    <div id="overlay">
        <div className="ms-Grid-row"> 
        <div className="ms-Grid-col ms-sm6 ms-md2 block"></div> 
        <div className="ms-Grid-col ms-sm12 ms-md4 block">
          <div className="landingPage-content">
            <div className="logoLandingPage"></div>
              {language == "pt" ?
                <div>
                  <h1>Bem vindo ao <br/>Enterprise BI Portal</h1>
                  <p>Clique abaixo para entrar na plataforma</p>
                  <button onClick={props.onClick} className="btnLogin">
                    <div className="btnLogin-Icon">&nbsp;</div>
                    <span>ACESSAR</span>
                  </button>         
                </div>
              :
                <div>
                  <h1>Welcome to <br/>Enterprise BI Portal</h1>
                  <p>Click below to enter the platform</p>
                  <button onClick={props.onClick} className="btnLogin">
                    <div className="btnLogin-Icon">&nbsp;</div>
                    <span>ACCESS</span>
                  </button>                                    
                </div>
              }  
          </div> 
        </div>
        <div className="ms-Grid-col ms-sm6 ms-md2 block"></div> 
        <div className="ms-Grid-col ms-sm6 ms-md2 block"></div> 
        <div className="ms-Grid-col ms-sm6 ms-md2 block">
          <button id="btnTranslatePT" onClick={() => setLanguage('language', 'pt', 365, '/')} className="btnTranslatePT"></button> 
          <button id="btnTranslateEN" onClick={() => setLanguage('language', 'en', 365, '/')} className="btnTranslateEN"></button>  
        </div> 
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

  public componentDidMount() {
    language == "pt" ?
      document.getElementById("btnTranslateEN").style.opacity = "0.3"
    :
      document.getElementById("btnTranslatePT").style.opacity = "0.3";
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