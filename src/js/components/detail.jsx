import RecordsList from "../components/recordslist.jsx";

class Detail extends React.Component {
	constructor( props ) {
		super( props );
	}

	componentDidMount() {
		this.fillDetails( this.props.grouping, this.props.record, this.props.subtype, this.props.detail );
	}

	render() {
		let grouping_title = this.props.grouping.charAt( 0 ).toUpperCase() + this.props.grouping.slice( 1 ),
			grouping_href = "#/" + this.props.grouping;

		if ( "domain" === this.props.grouping ) {
			grouping_href = "#/";
		}

		let breadcrumb_extend;

		if ( ! this.props.subtype && ! this.props.detail ) {
			breadcrumb_extend = (
				<li>{this.props.record}</li>
			);
		} else {
			let url = "#/" + this.props.grouping + "/" + this.props.record;
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
						<a href={grouping_href}>{grouping_title}s</a>
					</li>
					{breadcrumb_extend}
				</ul>
				<h1>{grouping_title}: {this.props.record}</h1>
			</div>
			<div className="detail-container">
				<div className="result-title" />
				<div id="result-details" className="result-details" />
			</div>
		</div>
	}

	fillDetails( type, selection, subtype, detail ) {
		let $ = window.jQuery;

		if ( "selector" === type ) {
			let selection_text = document.createElement( "textarea" );
			selection_text.innerHTML = selection;
			selection = selection_text.value;
		}

		let body = {
			"size": 250,
			"query": {
				"bool": {
					"must": []
				}
			}
		};

		let term = { "term": {} };
		term.term[ type ] = selection;
		body.query.bool.must.push( term );

		if ( subtype && detail ) {
			let term = { "term": {} };
			term.term[ subtype ] = detail;
			body.query.bool.must.push( term );
			selection += " > " + detail;
		}

		$( ".result-details" ).html( "" );

		$.ajax( {
			url: "https://public.elastic.wsu.edu/a11y-scan/record/_search",
			type: "POST",
			crossDomain: true,
			dataType: "json",
			data: JSON.stringify( body ),
			success: function( response ) {
				let results = [];

				for ( let i = 0, j = response.hits.hits.length; i < j; i++ ) {
					results.push( response.hits.hits[ i ]._source );
				}

				ReactDOM.render( <RecordsList records={results} />, document.getElementById( "result-details" ) );
			},
			error: function( jqXHR, textStatus, errorThrown ) {
				console.log( jqXHR, textStatus, errorThrown );
			}
		} );
	}
}
export default Detail;
