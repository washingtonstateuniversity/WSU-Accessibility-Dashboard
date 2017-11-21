function getWCAGURL( code ) {
	let data = {
		code: code,
		text: "",
		link: "",
		link_text: ""
	};

	let code_details = code.split( "." );

	// Remove WCAG2AA, Principle, Guideline
	code_details.shift();
	code_details.shift();
	code_details.shift();

	let criterion = code_details.shift();
	data.text += criterion.replace( /_/g, "." );
	data.link_text = code_details.shift();
	data.link = "https://www.w3.org/TR/WCAG20-TECHS/" + data.link_text;

	let temp_text = "(";

	while ( 0 !== code_details.length ) {
		temp_text += code_details.shift();
	}

	if ( "(" !== temp_text ) {
		data.link_text += " " + temp_text + ")";
	}

	data.text += " " + data.link_text;

	return data;
}

module.exports = getWCAGURL;
