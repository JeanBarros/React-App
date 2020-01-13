import * as React from 'react';  

export default class ToggleBox extends React.Component<any, any> {

	constructor(props) {
		super(props);
		this.state = {
			opened: false,
		};
		this.toggleBox = this.toggleBox.bind(this);
	}

	w3_close() {
		document.getElementById("mySidebar").style.display = "none"
	}
	
	w3_open() {
		document.getElementById("mySidebar").style.display = "block"
	}
  
	toggleBox() {
		const { opened } = this.state;
		this.setState({
			opened: !opened,
		});
	}
  
	render() {
		var { title, children } = this.props;
		const { opened } = this.state;

		if (opened){
			title ='Hide Vehicles';			
		}
		else{
			title ='Show Vehicles';			
		}

		return (
			<div className="box">
				<div className="boxTitle" onClick={this.toggleBox}>
					{title}
				</div>
				{opened && (					
					<div className="boxContent">
						{children}
					</div>
				)}
			</div>
		);
	}
}