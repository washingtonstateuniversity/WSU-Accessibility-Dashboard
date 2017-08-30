import TypeList from "./typeList.jsx";

let get_wcag_url = require( "../lib/wcagurl.js" );

class AggregateList extends React.Component {
	constructor( props ) {
		super( props );
	}

	aggregateRequest( selector, type, term, match, subtype, detail ) {
		let body = {
			"size": 0,
			"query": {
				"bool": {
					"must": [
					]
				}
			},
			"aggs": {
				"top_codes": {
					"terms": {
						"field": type,
						"size": 1000
					}
				}
			}
		};

		let t = {};
		t[ term ] = match;
		body.query.bool.must.push( { term: t } );

		if ( subtype && detail ) {
			let term = {};
			term[ subtype ] = detail;
			body.query.bool.must.push( { term: term } );
		}

		$.ajax( {
			url: "https://public.elastic.wsu.edu/a11y-scan/record/_search",
			type: "POST",
			crossDomain: true,
			dataType: "json",
			data: JSON.stringify( body ),
			success: function( response ) {
				let buckets = response.aggregations.top_codes.buckets,
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
						let code_details = HTMLCS_WCAG2AAA.getMsgInfo( code_selector );
						item.criterion = { __html:code_details[0][1] };
						item.techniques = { __html: code_details[1][1] };
					}

					items.push( item );
				}

				if ( subtype && detail ) {
					ReactDOM.render( <TypeList items={items} subtype={subtype} detail={detail} />, document.getElementById( selector + "-results" ) );
				} else {
					ReactDOM.render( <TypeList items={items} />, document.getElementById( selector + "-results" ) );
				}

			},
			error: function( jqXHR, textStatus, errorThrown ) {
				console.log( jqXHR, textStatus, errorThrown );
			}
		} );
	}

	componentDidMount() {
		this.aggregateRequest( this.props.selector, this.props.type, this.props.term, this.props.match, this.props.subtype, this.props.detail );
	}

	render() {
		let overview_class = this.props.selector + "-overview overview",
			overview_id = this.props.selector + "-results";

		return 	<div className={overview_class}>
			<h2>{this.props.title}</h2>
			<div id={overview_id} className="results" />
		</div>
	}
}

export default AggregateList;
