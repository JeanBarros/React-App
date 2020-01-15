import * as React from 'react';
import "../sideNav.css";

export interface ILandingPageProps {}   

function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
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

class Football extends React.Component {
  shoot() {
    alert("Boom Shot!");
  }
  render() {
    return (
      <button onClick={this.shoot}>Take the shot!</button>
    );
  }
}

export default class LandingPage extends React.Component<ILandingPageProps> {  
  constructor(props: ILandingPageProps) {  
    super(props)
    this.state = { isEmptyState: true }

    setTimeout(function(){
      var header = document.createElement("DIV");
      header.innerHTML = "<div class='header'><div class='logo'></div><div id='webTitle'></div></div>"; 
      document.getElementsByClassName('_71hjFgizWk0Cd55RzerwA')[0].appendChild(header); 

      // Remove o cabeçalho nativo
      var mainHeader = document.getElementsByClassName('mainHeader-163')[0]
      mainHeader.parentNode.removeChild(mainHeader);

      var commandBarWrapper = document.getElementsByClassName('commandBarWrapper')[0]
      commandBarWrapper.parentNode.removeChild(commandBarWrapper);
      
      
      alert('pow')
    }, 1000);
  }

  public render() {
    return (
      <div>
        <h1>Bem vindo ao Enterprise BI Portal</h1>                
        <LoginControl />
        {document.getElementById('root')}  
        <Football></Football>   
      </div>
    );  
  }
}