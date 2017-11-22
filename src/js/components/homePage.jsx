import DomainOverview from "./domainOverview.jsx";
import URLSearch from "./urlSearch.jsx";

class HomePage extends React.Component {
	constructor( props ) {
		super( props );
	}

	render() {
		return 	<div className="dashboard-wrapper">
			<URLSearch />
			<div id="search-results" />
			<DomainOverview />
		</div>
	}
}

export default HomePage;
