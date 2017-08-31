import TypeList from "./typeList.jsx";

class TypeOverview extends React.Component {
	constructor( props ) {
		super( props );
	}

	render() {
		let overview_class = this.props.type + "-overview overview",
			view_all_url = "#/" + this.props.type,
			overview_id = this.props.type + "-results",
			all_text = "View all " + this.props.type.charAt( 0 ).toUpperCase() + this.props.type.slice( 1 ) + "s";

		return 	<div className={overview_class}>
			<h2>{this.props.title}</h2>
			<div id={overview_id} className="results" />
			<a href={view_all_url}>{all_text}</a>
		</div>
	}
}

export default TypeOverview;
