import React from "react";
import ReactDOM from "react-dom";
import RecordsList from "./components/recordslist.jsx";

/* global console, _ */
( function( $, _ ) {
	var getWCAGURL = function( code ) {
		var data = {
			code: code,
			text: "",
			link: "",
			link_text: ""
		};

		var code_details = code.split( "." );

		// Remove WCAG2AA, Principle, Guideline
		code_details.shift();
		code_details.shift();
		code_details.shift();

		var criterion = code_details.shift();
		data.text += criterion.replace( /_/g, "." );
		data.link_text = code_details.shift();
		data.link = "https://www.w3.org/TR/WCAG20-TECHS/" + data.link_text;

		var temp_text = "(";

		while ( 0 !== code_details.length ) {
			temp_text += code_details.shift();
		}

		if ( "(" !== temp_text ) {
			data.link_text += " " + temp_text + ")";
		}

		data.text += " " + data.link_text;

		return data;
	};

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
						var code_details = getWCAGURL( code_selector );
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
	};

	aggregateRequest( "code" );
	aggregateRequest( "selector" );
	aggregateRequest( "domain" );

	var fillDetails = function( type, selection ) {
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
