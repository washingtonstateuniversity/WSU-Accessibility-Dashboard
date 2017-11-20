import Record from "./record.jsx";

class RecordsList extends React.Component {
	constructor( props ) {
		super( props );
	}

	render() {
		let records = [];

		for ( let i = 0; i < this.props.records.length; i++ ) {
			let props = this.props.records[ i ];

			// React likes a unique key prop.
			props.key = "record" + i;

			if ( this.props.subtype && this.props.detail ) {
				props.subtype = this.props.subtype;
				props.detail = this.props.detail;
			}

			records.push( <Record {...props} /> );
		}

		if ( ! this.props.subtype || "code" === this.props.subtype ) {
            return <div className="results">
				<table data-sortable>
					<thead>
					<tr><th>Domain</th><th>URL Path (truncated)</th><th>Selector</th></tr>
					</thead>
					<tbody>
                    {records}
					</tbody>
				</table>
			</div>
		} else if ( "selector" === this.props.subtype ) {
            return <div className="results">
				<table data-sortable>
					<thead>
					<tr><th>Domain</th><th>URL Path (truncated)</th><th>Criterion</th><th>Technique</th></tr>
					</thead>
					<tbody>
                    {records}
					</tbody>
				</table>
			</div>
		}
	}
}

export default RecordsList;
