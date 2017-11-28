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

		if ( "code" === this.props.subtype ) {
            return 	<tr>
				<td>{this.props.domain}</td>
				<td><a href={this.props.url}>{url.path}</a></td>
				<td>{this.props.selector}</td>
			</tr>
		} else if ( "selector" === this.props.subtype ) {
			let code_details = HTMLCS_WCAG2AAA.getMsgInfo( this.props.code );
			let criterion = { __html:code_details[0][1] };
			let techniques = { __html: code_details[1][1] };

			return 	<tr>
				<td>{this.props.domain}</td>
				<td><a href={this.props.url}>{url.path}</a></td>
				<td><span dangerouslySetInnerHTML={criterion} /></td>
				<td><span dangerouslySetInnerHTML={techniques} /></td>
			</tr>
        }
	}
}

export default Record;
