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
						"size": 20
					}
				}
			}
		};

		$.ajax( {
			url: "https://elastic.wsu.edu/a11y-scan/record/_search",
			type: "POST",
			crossDomain: true,
			dataType: "json",
			data: JSON.stringify( body ),
			success: function( response ) {
				var buckets = response.aggregations.top_codes.buckets;
				var container = $( "." + type + "-overview .results" );

				for ( var i = 0, x = buckets.length; i < x; i++ ) {
					container.append( "<div class='result'><span class='count'>" + buckets[ i ].doc_count + "</span><span class='" + type + "'>" + decodeURIComponent( buckets[ i ].key ) + "</span></div>" );
				}
			},
			error: function( jqXHR, textStatus, errorThrown ) {
				console.log( jqXHR, textStatus, errorThrown );
			}
		} );
	};

	aggregateRequest( "code" );
	aggregateRequest( "selector" );

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
				"match": {}
			}
		};

		body.query.match[ type ] = selection;

		$( ".result-title" ).html( "<h2>" + selection + "</h2>" );
		$( ".result-details" ).html( "" );

		$.ajax( {
			url: "https://elastic.wsu.edu/a11y-scan/record/_search",
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
			fillDetails( "selector", $( this ).html() );
		} );

		$( ".code-overview" ).on( "click", ".code", function() {
			fillDetails( "code", $( this ).html() );
		} );
	} );
}( jQuery, _ ) );
