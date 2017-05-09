import React from "react";
import Index from "./views/index.js";
import Grouping from "./views/grouping.js";
import Detail from "./views/detail.js";
import ErrorPage from "./views/errorpage.js";

( function( $ ) {
	let handle_hash_route = function() {
		let hash = location.hash
			.replace( /\/+/g, "/" ) // Replace consecutive slashes.
			.replace( /\/+$/, "" ) // Remove trailing slashes.
			.split( "/" ); // Create an array of hash parts.

		document.getElementById( "container" ).innerHTML = "";

		if ( 1 === hash.length ) {
			let i = new Index;
			i.setup();
			return;
		}

		let valid_type = ( "domain" === hash[ 1 ] || "code" === hash[ 1 ] || "selector" === hash[ 1 ] );

		if ( 2 === hash.length && true === valid_type ) {
			let g = new Grouping;
			g.setup( hash[ 1 ] );
		} else if ( 3 === hash.length ) {
			let d = new Detail;
			d.setup( hash[ 1 ], hash[ 2 ] );
		} else {
			let e = new ErrorPage;
			e.setup();
		}
	};

	handle_hash_route();

	$( window ).on( "hashchange", handle_hash_route );
}( jQuery ) );
