class TypeListItem extends React.Component {
	constructor( props ) {
		super( props );
	}

	handleClick( e ) {
		e.preventDefault();
		window.location.hash = e.target.dataset.view + "/" + e.target.dataset.hash;
	}

	render() {
		let hash = this.props.type + "/" + this.props.code;
		let url = "/#/" + hash;
		let view = "";

		if ( this.props.subtype && this.props.detail ) {
			view = "/" + this.props.subtype + "/" + this.props.detail;
		}

		return 	<li className="result">
			<span className="count">{this.props.count}</span>
			<a className={this.props.type}
			   onClick={this.handleClick}
			   data-code={this.props.selector}
			   data-view={view}
			   data-hash={hash}
			   href={url} >{this.props.name}</a>
		</li>
	}
}

export default TypeListItem;
