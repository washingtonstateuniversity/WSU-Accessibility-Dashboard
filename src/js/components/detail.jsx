import RecordsList from "../components/recordslist.jsx";

class Detail extends React.Component {
	constructor( props ) {
		super( props );
	}

	componentDidMount() {
		this.fillDetails( this.props.grouping, this.props.record );
	}

	render() {
		return 	<div className="dashboard-wrapper">
			<a href="/">Dashboard Home</a>
			<h1>{this.props.grouping} {this.props.record}</h1>
			<div className="result-title" />
			<div id="result-details" className="result-details" />
		</div>
	}

	fillDetails( type, selection ) {
		let $ = window.jQuery;

		if ( "selector" === type ) {
			var selection_text = document.createElement( "textarea" );
			selection_text.innerHTML = selection;
			selection = selection_text.value;
		}

		var body = {
			"size": 50,
			"query": {
				"bool": {
					"must": [
						{ "term": { "typeCode": 1 } }
					]
				}
			}
		};

		var term = { "term": {} };
		term.term[ type ] = selection;
		body.query.bool.must.push( term );

		$( ".result-title" ).html( "<h2>" + selection + "</h2>" );
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
