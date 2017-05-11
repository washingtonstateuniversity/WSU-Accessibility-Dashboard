import TypeOverview from "./typeOverview.jsx";

class TypePage extends React.Component {
	constructor( props ) {
		super( props );
	}

	render() {
		let title = this.props.type.charAt( 0 ).toUpperCase() + this.props.type.slice( 1 ) + "s";

		return 	<div className="type-wrapper">
			<div className="view-head">
				<ul className="breadcrumb">
					<li>
						<a href="/">Dashboard Home</a>
					</li>
					<li>
						{title}
					</li>
				</ul>
				<h1>All {title}</h1>
			</div>
			<TypeOverview title={title} type={this.props.type} count="25" />
		</div>
	}
}

export default TypePage;
