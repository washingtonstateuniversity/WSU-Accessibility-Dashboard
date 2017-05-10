let get_wcag_url = require( "../lib/wcagurl.js" );

class DashboardOverview extends React.Component {
	constructor( props ) {
		super( props );
	}

	aggregateRequest( type ) {
		let body = {
			"size": 0,
			"query": {
				"bool": {
					"must": [
						{
							"term": {
								"typeCode": 1
							}
						}
					]
				}
			},
			"aggs": {
				"top_codes": {
					"terms": {
						"field": type,
						"size": 15
					}
				}
			}
		};

		$.ajax( {
			url: "https://public.elastic.wsu.edu/a11y-scan/record/_search",
			type: "POST",
			crossDomain: true,
			dataType: "json",
			data: JSON.stringify( body ),
			success: function( response ) {
				let buckets = response.aggregations.top_codes.buckets,
					container = $( "." + type + "-overview .results" ),
					code_name = "",
					code_selector = "";

				for ( let i = 0, x = buckets.length; i < x; i++ ) {
					code_selector = decodeURIComponent( buckets[ i ].key );
					code_name = code_selector;

					if ( "code" === type ) {
						let code_details = get_wcag_url( code_selector );
						container.append( "<div class='result'>" +
							"<span class='count'>" + buckets[ i ].doc_count + "</span> " +
							"<span class='" + type + "' data-code='" + code_selector + "'>" + code_details.text + "</span></div>" );
					} else {
						container.append( "<div class='result'><span class='count'>" + buckets[ i ].doc_count + "</span><span class='" + type + "' data-code='" + code_selector + "'>" + code_name + "</span></div>" );
					}
				}
			},
			error: function( jqXHR, textStatus, errorThrown ) {
				console.log( jqXHR, textStatus, errorThrown );
			}
		} );
	}

	componentDidMount() {
		$( this.props.type + "-overview" ).on( "click", "." + this.props.type, function() {
			window.location.hash = "/" + this.props.type + "/" + $( this ).data( "code" );
		} );

		this.aggregateRequest( this.props.type );
	}

	render() {
		let overview_class = this.props.type + "-overview overview";

		return 	<div className={overview_class}>
			<h2>{this.props.title}</h2>
			<div className="results" />
		</div>
	}
}

export default DashboardOverview;
