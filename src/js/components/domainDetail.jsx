import TypeOverview from "../components/typeOverview.jsx";

class DomainDetail extends React.Component {
	constructor( props ) {
		super( props );
	}

	render() {
		let type_one_title = "Selectors",
			type_one_type = "selector",
			type_two_title = "Codes",
			type_two_type = "code";

		let aggregates;
		let breadcrumb_extend;

		if ( ! this.props.subtype && ! this.props.detail ) {
			aggregates = (
				<div className="aggregate-container">
					<TypeOverview title={type_one_title} type={type_one_type} subtype="domain" detail={this.props.record} count="10" />
					<TypeOverview title={type_two_title} type={type_two_type} subtype="domain" detail={this.props.record} count="10" />
				</div>
			);

			breadcrumb_extend = (
				<li>{this.props.record}</li>
			);
		} else {
			let url = "#/domain/" + this.props.record;
			breadcrumb_extend = (
				<span><li><a href={url}>{this.props.record}</a></li><li>{this.props.detail}</li></span>
			);
		}

		return 	<div className="detail-wrapper">
			<div className="view-head">
				<ul className="breadcrumb">
					<li>
						<a href="#/">Dashboard Home</a>
					</li>
					<li>
						<a href="#/domain">Domains</a>
					</li>
					{breadcrumb_extend}
				</ul>
				<h1>Domain: {this.props.record}</h1>
			</div>
			{aggregates}
			<div className="detail-container">
				<div className="result-title" />
				<div id="result-details" className="result-details" />
			</div>
		</div>
	}
}
export default DomainDetail;
