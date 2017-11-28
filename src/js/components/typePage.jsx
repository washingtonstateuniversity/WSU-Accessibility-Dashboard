import AggregateList from "./aggregateList.jsx";

class TypePage extends React.Component {
	constructor( props ) {
		super( props );
	}

	render() {
		let title = this.props.type.charAt( 0 ).toUpperCase() + this.props.type.slice( 1 ) + "s";

        let aggregates;

        if ( ! this.props.subtype && ! this.props.detail ) {
            aggregates = (
				<div className="aggregate-container">
					<AggregateList title="Errors" selector="error-code" type={this.props.type} term="typeCode" match="1" subtype="code" detail={this.props.record} />
				</div>
            );
        }

		return 	<div className="type-wrapper">
			<div className="view-head">
				<ul className="breadcrumb">
					<li>
						<a href="#/">Dashboard Home</a>
					</li>
					<li>
						{title}
					</li>
				</ul>
				<h1>All {title}</h1>
			</div>
			{aggregates}
		</div>
	}
}

export default TypePage;
