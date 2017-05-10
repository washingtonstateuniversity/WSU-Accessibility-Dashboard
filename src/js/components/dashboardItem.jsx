class DashboardItem extends React.Component {
	constructor( props ) {
		super( props );
	}

	render() {
		let url = "/#/" + this.props.type + "/" + this.props.code;

		return 	<li className="result">
			<span className="count">{this.props.count}</span>
			<a className={this.props.type} data-code={this.props.code} href={url} />
		</li>
	}
}

export default DashboardItem;
