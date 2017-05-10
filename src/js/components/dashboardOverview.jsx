import OverviewList from "../components/overviewList.jsx";

let get_wcag_url = require( "../lib/wcagurl.js" );

class DashboardOverview extends React.Component {
	constructor( props ) {
		super( props );
	}

	aggregateRequest( type, count ) {
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
						"size": count
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
					code_selector = "",
					items = [];

				for ( let i = 0, x = buckets.length; i < x; i++ ) {
					code_selector = decodeURIComponent( buckets[ i ].key );

					let item = {
						"count": buckets[ i ].doc_count,
						"type": type,
						"code": code_selector,
						"name": code_selector
					};

					if ( "code" === type ) {
						let code_details = get_wcag_url( code_selector );
						item.name = code_details.text;
					}

					items.push( item );
				}

				ReactDOM.render( <OverviewList items={items} />, document.getElementById( type + "-results" ) );
			},
			error: function( jqXHR, textStatus, errorThrown ) {
				console.log( jqXHR, textStatus, errorThrown );
			}
		} );
	}

	componentDidMount() {
		this.aggregateRequest( this.props.type, this.props.count );
	}

	render() {
		let overview_class = this.props.type + "-overview overview",
			view_all_url = "/#/" + this.props.type,
			overview_id = this.props.type + "-results";

		return 	<div className={overview_class}>
			<h2>{this.props.title}</h2>
			<a href={view_all_url}>View all</a>
			<div id={overview_id} className="results" />
		</div>
	}
}

export default DashboardOverview;
