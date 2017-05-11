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

			records.push( <Record {...props} /> );
		}

		return <div className="results">{records}</div>
	}
}

export default RecordsList;
