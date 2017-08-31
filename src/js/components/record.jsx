class Record extends React.Component {
	constructor( props ) {
		super( props );
	}

	render() {
		return 	<tr>
			<td>{this.props.domain}</td>
			<td><a href={this.props.url}>{this.props.url}</a></td>
			<td>{this.props.selector}</td>
			<td>{this.props.type}</td>
		</tr>
	}
}

export default Record;
