import OverviewListItem from "./overviewListItem.jsx";

class OverviewList extends React.Component {
	constructor( props ) {
		super( props );
	}

	render() {
		let items = [];

		for ( let i = 0; i < this.props.items.length; i++ ) {
			items.push( <OverviewListItem {...this.props.items[ i ]} /> );
		}

		return <ul className="results">{items}</ul>
	}
}

export default OverviewList;
