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
		let url = "#/" + hash;
		let view = "";

		if ( this.props.subtype && this.props.detail ) {
			view = "/" + this.props.subtype + "/" + this.props.detail;
			url = "#" + view + "/" + hash;
		}

		if ( "code" === this.props.type ) {
            return 	<tr className="result">
				<td><a className={this.props.type}
					   onClick={this.handleClick}
					   data-code={this.props.selector}
					   data-view={view}
					   data-hash={hash}
					   href={url} >{this.props.count}</a></td>
				<td><span dangerouslySetInnerHTML={this.props.criterion} /></td>
				<td><span dangerouslySetInnerHTML={this.props.techniques} /></td>
			</tr>
		} else {
            return 	<tr className="result">
				<td><a className={this.props.type}
					   onClick={this.handleClick}
					   data-code={this.props.selector}
					   data-view={view}
					   data-hash={hash}
					   href={url} >{this.props.count}</a></td>
				<td>{this.props.name}</td>
				<td>{this.props.selector}</td>
			</tr>
		}


	}
}

export default TypeListItem;
