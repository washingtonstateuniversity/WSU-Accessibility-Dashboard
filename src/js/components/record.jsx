let parse_url = require( "url" );

class Record extends React.Component {
	constructor( props ) {
		super( props );
	}

	render() {
		let url = parse_url.parse( this.props.url );

		if ( 35 < url.path.length ) {
            url.path = url.path.substring( 0, 35 ) + "...";
		}

		return 	<tr>
			<td>{this.props.domain}</td>
			<td><a href={this.props.url}>{url.path}</a></td>
			<td>{this.props.selector}</td>
		</tr>
	}
}

export default Record;
