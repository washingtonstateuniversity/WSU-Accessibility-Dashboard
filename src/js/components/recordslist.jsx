import Record from "./record.jsx";

class RecordsList extends React.Component {
	constructor( props ) {
		super( props );
	}

	render() {
		let records = [];

		for ( let i = 0; i < this.props.records.length; i++ ) {
			records.push( <Record {...this.props.records[ i ]} /> );
		}

		return <div className="results">{records}</div>
	}
}

export default RecordsList;
