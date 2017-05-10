import TypeOverview from "./typeOverview.jsx";

class HomePage extends React.Component {
	constructor( props ) {
		super( props );
	}

	render() {
		return 	<div className="dashboard-wrapper">
			<TypeOverview title="Top Codes" type="code" count="15" />
			<TypeOverview title="Top Selectors" type="selector" count="15" />
			<TypeOverview title="Top Domains" type="domain" count="15" />
		</div>
	}
}

export default HomePage;
