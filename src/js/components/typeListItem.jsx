class TypeListItem extends React.Component {
	constructor( props ) {
		super( props );
	}

	handleClick( e ) {
		e.preventDefault();
		console.log( e.target.dataset.hash );
		window.location.hash = "/" + e.target.dataset.hash;
	}

	render() {
		let hash = this.props.type + "/" + this.props.code;
		let url = "/#/" + hash;

		return 	<li className="result">
			<span className="count">{this.props.count}</span>
			<a className={this.props.type} onClick={this.handleClick} data-code={this.props.selector} data-hash={hash} href={url} >{this.props.name}</a>
		</li>
	}
}

export default TypeListItem;
