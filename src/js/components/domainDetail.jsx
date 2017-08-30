import AggregateList from "../components/aggregateList.jsx";

class DomainDetail extends React.Component {
	constructor( props ) {
		super( props );
	}

	render() {
		let aggregates;
		let breadcrumb_extend;

		if ( ! this.props.subtype && ! this.props.detail ) {
			aggregates = (
				<div className="aggregate-container">
					<AggregateList title="Errors" selector="error-code" type="code" term="typeCode" match="1" subtype="domain" detail={this.props.record} />
					<AggregateList title="Warnings" selector="warning-code" type="code" term="typeCode" match="2" subtype="domain" detail={this.props.record} />
					<AggregateList title="Notices" selector="notice-code" type="code" term="typeCode" match="3" subtype="domain" detail={this.props.record} />
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
