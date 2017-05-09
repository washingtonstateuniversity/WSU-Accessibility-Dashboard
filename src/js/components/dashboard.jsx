class Dashboard extends React.Component {
	constructor( props ) {
		super( props );
	}

	render() {
		return 	<div className="dashboard-wrapper">
			<div className="code-overview overview">
				<h2>Top Codes</h2>
				<div className="results" />
			</div>

			<div className="selector-overview overview">
				<h2>Top Selectors</h2>
				<div className="results" />
			</div>

			<div className="domain-overview overview">
				<h2>Top Domains</h2>
				<div className="results" />
			</div>
		</div>
	}
}

export default Dashboard;
