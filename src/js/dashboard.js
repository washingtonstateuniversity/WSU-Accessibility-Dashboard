/* global console, _ */
( function( $, _ ) {
	var aggregateRequest = function( type ) {
		var body = {
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
						"size": 10
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
				var buckets = response.aggregations.top_codes.buckets;
				var container = $( "." + type + "-overview .results" );
				var code_name = "";
				var code_selector = "";

				for ( var i = 0, x = buckets.length; i < x; i++ ) {
					code_selector = decodeURIComponent( buckets[ i ].key );
					code_name = code_selector;

					if ( "code" === type ) {
						code_name = code_selector.split( "." );
						code_name.shift();
						code_name = code_name.join( " " );
					}

					container.append( "<div class='result'><span class='count'>" + buckets[ i ].doc_count + "</span><span class='" + type + "' data-code='" + code_selector + "'>" + code_name + "</span></div>" );
				}
			},
			error: function( jqXHR, textStatus, errorThrown ) {
				console.log( jqXHR, textStatus, errorThrown );
			}
		} );
	};

	aggregateRequest( "code" );
	aggregateRequest( "selector" );
	aggregateRequest( "domain" );

	var fillDetails = function( type, selection ) {
		var code_details_template = _.template( $( "#code-details-template" ).html() );

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
				for ( var i = 0, j = response.hits.hits.length; i < j; i++ ) {
					var hit = response.hits.hits[ i ]._source;

					$( ".result-details" ).append( code_details_template( {
						message: hit.message,
						selector: hit.selector,
						context: hit.context,
						url: decodeURIComponent( hit.url ),
						domain: hit.domain
					} ) );

				}
			},
			error: function( jqXHR, textStatus, errorThrown ) {
				console.log( jqXHR, textStatus, errorThrown );
			}
		} );
	};

	$( document ).ready( function() {
		$( ".selector-overview" ).on( "click", ".selector", function() {
			fillDetails( "selector", $( this ).data( "code" ) );
		} );

		$( ".code-overview" ).on( "click", ".code", function() {
			fillDetails( "code", $( this ).data( "code" ) );
		} );

		$( ".domain-overview" ).on( "click", ".domain", function() {
			fillDetails( "domain", $( this ).data( "code" ) );
		} );
	} );
}( jQuery, _ ) );
