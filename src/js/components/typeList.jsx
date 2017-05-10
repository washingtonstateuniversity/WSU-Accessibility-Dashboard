import TypeListItem from "./typeListItem.jsx";

class TypeList extends React.Component {
	constructor( props ) {
		super( props );
	}

	render() {
		let items = [];

		for ( let i = 0; i < this.props.items.length; i++ ) {
			items.push( <TypeListItem {...this.props.items[ i ]} /> );
		}

		return <ul className="results">{items}</ul>
	}
}

export default TypeList;
