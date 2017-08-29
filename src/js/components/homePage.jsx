import DomainOverview from "./domainOverview.jsx";

class HomePage extends React.Component {
	constructor( props ) {
		super( props );
	}

	render() {
		return 	<div className="dashboard-wrapper">
			<DomainOverview />
		</div>
	}
}

export default HomePage;
