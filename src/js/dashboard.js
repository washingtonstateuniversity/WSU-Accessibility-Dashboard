/* global console */
( function( $ ) {
	var aggregateRequest = function( type ) {
		var body = {
			"size": 0,
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
				var container = $( "#" + type + "-display-container" );

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
	aggregateRequest( "domain" );
	aggregateRequest( "url" );

}( jQuery ) );
