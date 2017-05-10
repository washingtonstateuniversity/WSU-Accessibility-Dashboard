import DashboardOverview from "./dashboardOverview.jsx";

class Dashboard extends React.Component {
	constructor( props ) {
		super( props );
	}

	render() {
		return 	<div className="dashboard-wrapper">
			<DashboardOverview title="Top Codes" type="code" count="10" />
			<DashboardOverview title="Top Selectors" type="selector" count="10" />
			<DashboardOverview title="Top Domains" type="domain" count="10" />
		</div>
	}
}

export default Dashboard;
