/* global console, _ */
( function( $, _ ) {
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

	$( document ).ready( function() {
		var code_details_template = _.template( $( "#code-details-template" ).html() );

		$( "#code-display-container" ).on( "click", ".code", function() {
			var code = $( this ).html();
			var body = {
				"size": 2000,
				"query": {
					"match": {
						"code": code
					}
				}
			};

			$( "#code-details-display-container h2" ).html( code );
			$( "#code-details-display-container .results" ).html( "" );

			$.ajax( {
				url: "https://elastic.wsu.edu/a11y-scan/record/_search",
				type: "POST",
				crossDomain: true,
				dataType: "json",
				data: JSON.stringify( body ),
				success: function( response ) {
					for ( var i = 0, j = response.hits.hits.length; i < j; i++ ) {
						var hit = response.hits.hits[ i ]._source;

						$( ".results" ).append( code_details_template( {
								message: hit.message,
								selector: hit.selector,
								context: hit.context,
								url: hit.url,
								domain: hit.domain
						} ) );

					}
				},
				error: function( jqXHR, textStatus, errorThrown ) {
					console.log( jqXHR, textStatus, errorThrown );
				}
			} );
		} );
	} );
}( jQuery, _ ) );
