import TypeListItem from "./typeListItem.jsx";

class TypeList extends React.Component {
	constructor( props ) {
		super( props );
	}

	render() {
		let items = [];

		for ( let i = 0; i < this.props.items.length; i++ ) {
			let props = this.props.items[ i ];

			// React likes a unique key prop.
			props.key = "item" + i;

			if ( this.props.subtype && this.props.detail ) {
				props.subtype = this.props.subtype;
				props.detail = this.props.detail;
			}

			items.push( <TypeListItem {...props} /> );
		}

		return <ul className="results">{items}</ul>
	}
}

export default TypeList;
