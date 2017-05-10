import React from "react";
import ReactDom from "react-dom";
import Dashboard from "./components/dashboard.jsx";
import Grouping from "./components/grouping.jsx";
import Detail from "./components/detail.jsx";
import ErrorPage from "./components/errorPage.jsx";

( function( $ ) {
	let handle_hash_route = function() {
		let hash = location.hash
			.replace( /\/+/g, "/" ) // Replace consecutive slashes.
			.replace( /\/+$/, "" ) // Remove trailing slashes.
			.split( "/" ); // Create an array of hash parts.

		document.getElementById( "container" ).innerHTML = "";

		if ( 1 === hash.length ) {
			ReactDOM.render( <Dashboard />, document.getElementById( "container" ) );
			return;
		}

		let valid_type = ( "domain" === hash[ 1 ] || "code" === hash[ 1 ] || "selector" === hash[ 1 ] );

		if ( 2 === hash.length && true === valid_type ) {
			ReactDom.render( <Grouping type={hash[ 1 ] }/>, document.getElementById( "container" ) );
		} else if ( 3 === hash.length ) {
			ReactDom.render( <Detail grouping={hash[ 1 ]} record={hash[ 2 ]} />, document.getElementById( "container" ) );
		} else {
			ReactDom.render( <ErrorPage /> );
		}
	};

	handle_hash_route();

	$( window ).on( "hashchange", handle_hash_route );
}( jQuery ) );
