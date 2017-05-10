import DashboardOverview from "./dashboardOverview.jsx";

class TypePage extends React.Component {
	constructor( props ) {
		super( props );
	}

	render() {
		let title="All " + this.props.type.charAt( 0 ).toUpperCase() + this.props.type.slice( 1 ) + "s";

		return 	<div className="dashboard-wrapper">
			<a href="/">Dashboard Home</a>
			<DashboardOverview title={title} type={this.props.type} count="25" />
		</div>
	}
}

export default TypePage;
