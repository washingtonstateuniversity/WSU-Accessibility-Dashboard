import React from "react";
import ReactDom from "react-dom";
import HomePage from "./components/homePage.jsx";
import TypePage from "./components/typePage.jsx";
import Detail from "./components/detail.jsx";
import DomainDetail from "./components/domainDetail.jsx";
import ErrorPage from "./components/errorPage.jsx";

( function( $ ) {
	let handle_hash_route = function() {
		let hash = location.hash
			.replace( /\/+/g, "/" ) // Replace consecutive slashes.
			.replace( /\/+$/, "" ) // Remove trailing slashes.
			.split( "/" ); // Create an array of hash parts.

		document.getElementById( "container" ).innerHTML = "";

		// Display the home page.
		if ( 1 === hash.length ) {
			ReactDOM.render( <HomePage />, document.getElementById( "container" ) );
			return;
		}

		let valid_type = ( "code" === hash[ 1 ] || "selector" === hash[ 1 ] );

		if ( 2 === hash.length && true === valid_type ) {

			// Render overview pages at #/code and #/selector
			ReactDom.render( <TypePage type={hash[ 1 ] }/>, document.getElementById( "container" ) );
		} else if ( 3 === hash.length && hash[ 1 ] === "domain" ) {

			// Render a page showing aggregate errors and selectors for an individual domain.
			// #/domain/domain.wsu.edu
			ReactDom.render( <DomainDetail record={hash[ 2 ]} />, document.getElementById( "container" ) );
		} else if ( 3 === hash.length ) {
			ReactDom.render( <Detail grouping={hash[ 1 ]} record={hash[ 2 ]} />, document.getElementById( "container" ) );
		} else if ( 5 === hash.length ) {

			// Render a page showing specific domain and code/selector detail.
			// #/domain/domain.wsu.edu/code/..... or #/domain/domain.wsu.edu/selector/...
			ReactDom.render( <Detail grouping={hash[ 1 ]} record={hash[ 2 ]} subtype={hash[ 3 ]} detail={hash[ 4 ]} />, document.getElementById( "container" ) );
		} else {
			ReactDom.render( <ErrorPage />, document.getElementById( "container" ) );
		}
	};

	handle_hash_route();
	$( window ).on( "hashchange", handle_hash_route );
}( jQuery ) );
