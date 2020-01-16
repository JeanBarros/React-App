import * as React from 'react';
import "../sideNav.css";
import Main from './Main';

export interface ILandingPageProps {}   

function UserGreeting(props) {
  return (
    <div>      
      <Main/>
    </div>
  )
}

function GuestGreeting(props) {
  return (
    <div>  
      
    </div>    
  );
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return (
      <div>
        <UserGreeting />        
      </div>
    )
  }
  return <GuestGreeting />;
}

function LoginButton(props) {
  return (    
    <div id="overlay">
        <div className="ms-Grid-row"> 
        <div className="ms-Grid-col ms-sm6 ms-md2 block">2</div> 
        <div className="ms-Grid-col ms-sm12 ms-md4 block">
          <div className="content"> 
            <div className="logoLandingPage"></div>
            <h1>Bem vindo ao <br/>Enterprise BI Portal</h1>
            <p>Clique abaixo para entrar na plataforma</p>
            <button onClick={props.onClick} className="btnLogin">Login</button>          
          </div> 
        </div>
        <div className="ms-Grid-col ms-sm6 ms-md2 block">2</div> 
        <div className="ms-Grid-col ms-sm6 ms-md2 block">2</div> 
        <div className="ms-Grid-col ms-sm6 ms-md2 block">2</div> 
      </div>      
    </div>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}

class LoginControl extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;

    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

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
    super(props)

    var head = document.getElementsByTagName('HEAD')[0]
      var link = document.createElement('link'); 
      link.rel = 'stylesheet'; 
      link.type = 'text/css'; 
      link.href = '/sites/Lab02/Style%20Library/app.css';  

      // Append link element to HTML head 
      head.appendChild(link);
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