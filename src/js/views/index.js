import React from "react";
import ReactDOM from "react-dom";
import Dashboard from "../components/dashboard.jsx";

let get_wcag_url = require( "../lib/wcagurl.js" );

class Index {
	setup() {
		let $ = window.jQuery;

		let self = this;

		ReactDOM.render( <Dashboard />, document.getElementById( "container" ) );

		$( document ).ready( function() {
			$( ".selector-overview" ).on( "click", ".selector", function() {
				window.location.hash = "/selector/" + $( this ).data( "code" );
			} );

			$( ".code-overview" ).on( "click", ".code", function() {
				window.location.hash = "/code/" + $( this ).data( "code" );
			} );

			$( ".domain-overview" ).on( "click", ".domain", function() {
				window.location.hash = "/domain/" + $( this ).data( "code" );
			} );

			self.aggregateRequest( "code" );
			self.aggregateRequest( "selector" );
			self.aggregateRequest( "domain" );
		} );
	}

	aggregateRequest( type ) {
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
				var buckets = response.aggregations.top_codes.buckets;
				var container = $( "." + type + "-overview .results" );
				var code_name = "";
				var code_selector = "";

				for ( var i = 0, x = buckets.length; i < x; i++ ) {
					code_selector = decodeURIComponent( buckets[ i ].key );
					code_name = code_selector;

					if ( "code" === type ) {
						var code_details = get_wcag_url( code_selector );
						container.append( "<div class='result'>" +
							"<span class='count'>" + buckets[ i ].doc_count + "</span> " +
							"<span class='" + type + "' data-code='" + code_selector + "'>" + code_details.text + "</span> " +
							"<a class='technique' href='" + code_details.link + "' target='_blank'>?</a></div>" );
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
}
export default Index;
