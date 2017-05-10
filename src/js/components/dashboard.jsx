import DashboardOverview from "./dashboardOverview.jsx";

class Dashboard extends React.Component {
	constructor( props ) {
		super( props );
	}

	render() {
		return 	<div className="dashboard-wrapper">
			<DashboardOverview title="Top Codes" type="code" />
			<DashboardOverview title="Top Selectors" type="selector" />
			<DashboardOverview title="Top Domains" type="domain" />
		</div>
	}
}

export default Dashboard;
