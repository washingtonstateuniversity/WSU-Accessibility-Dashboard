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

			items.push( <TypeListItem {...props} type={this.props.type} /> );
		}

		let table_head = "";

		if ( "code" === this.props.type ) {
			table_head = "<tr><th>Count</th><th>Success Criterion</th><th>Technique(s)</th></tr>";
		} else if ( "selector" === this.props.type ) {
			table_head = "<tr><th>Count</th><th>Selector</th></tr>";
		}
		return <table>
			<thead dangerouslySetInnerHTML={ { __html: table_head } } />
			<tbody>
			{items}
			</tbody>
		</table>
	}
}

export default TypeList;
