class TypeListItem extends React.Component {
	constructor( props ) {
		super( props );
	}

	render() {
		let url = "/#/" + this.props.type + "/" + this.props.code;

		return 	<li className="result">
			<span className="count">{this.props.count}</span>
			<a className={this.props.type} data-code={this.props.selector} href={url} >{this.props.name}</a>
		</li>
	}
}

export default TypeListItem;
