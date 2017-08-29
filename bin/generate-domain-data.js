var es = require( "elasticsearch" );
var fs = require( "fs" );
var util = require( "util" );

require( "dotenv" ).config();

const gdd = {
	esClient: false,
	domain_data: [],
	sorted_data: []
};

/**
 * Retrieves the instance of a configured Elasticsearch client.
 *
 * @returns {boolean}
 */
function getElasticClient() {
	if ( false === gdd.esClient || "undefined" === typeof gdd.esClient ) {
		gdd.esClient = new es.Client( {
			host: process.env.ES_HOST,
			log: "error"
		} );
	}

	return gdd.esClient;
}

function getAllCrawledDomains() {
	return new Promise( function( resolve, reject ) {
		let es = getElasticClient();
		es.search( {
			index: process.env.ES_URL_INDEX,
			type: "url",
			body: {
				"size": 0,
				"query": {
					"match": {
						"status_code": 200
					}
				},
				"aggs": {
					"top_codes": {
						"terms": {
							"field": "domain",
							"size": 3000
						}
					}
				}
			}
		} ).then( function( response ) {
			for ( let i = 0, x = response.aggregations.top_codes.buckets.length; i < x; i++ ) {
				gdd.domain_data[ response.aggregations.top_codes.buckets[ i ].key ] = {
					"url_count": response.aggregations.top_codes.buckets[ i ].doc_count,
					"a11y_count": 0,
					"error_count": 0
				};
			}
			resolve();
		} ).catch( function( error ) {
			reject( error );
		} );
	} );
}

function getCrawledAccessibilityURLs() {
	return new Promise( function( resolve, reject ) {
		let es = getElasticClient();
		es.search( {
			index: process.env.ES_URL_INDEX,
			type: "url",
			body: {
				"size": 0,
				"query": {
					"bool": {
						"must": [
							{ "exists": { "field": "last_a11y_scan" } },
							{ "match": { "status_code": 200 } }
						]
					}
				},
				"aggs": {
					"top_codes": {
						"terms": {
							"field": "domain",
							"size": 3000
						}
					}
				}
			}
		} ).then( function( response ) {
			for ( let i = 0, x = response.aggregations.top_codes.buckets.length; i < x; i++ ) {
				gdd.domain_data[ response.aggregations.top_codes.buckets[ i ].key ].a11y_count = response.aggregations.top_codes.buckets[ i ].doc_count;
			}
			resolve();
		} ).catch( function( error ) {
			reject( error );
		} );
	} );
}

function getAccessibilityErrorCount() {
	return new Promise( function( resolve, reject ) {
		let es = getElasticClient();
		es.search( {
			index: process.env.ES_A11Y_INDEX,
			type: "record",
			body: {
				"size": 0,
				"query": {
					"match": {
						"type": "error"
					}
				},
				"aggs": {
					"top_codes": {
						"terms": {
							"field": "domain",
							"size": 3000
						}
					}
				}
			}
		} ).then( function( response ) {
			for ( let i = 0, x = response.aggregations.top_codes.buckets.length; i < x; i++ ) {
				if ( "undefined" === typeof gdd.domain_data[ response.aggregations.top_codes.buckets[ i ].key ] ) {
					gdd.domain_data[ response.aggregations.top_codes.buckets[ i ].key ] = {
						"url_count": 0,
						"a11y_count": 0,
						"error_count": response.aggregations.top_codes.buckets[ i ].doc_count
					};
					continue;
				}
				gdd.domain_data[ response.aggregations.top_codes.buckets[ i ].key ].error_count = response.aggregations.top_codes.buckets[ i ].doc_count;
			}
			resolve();
		} ).catch( function( error ) {
			reject( error );
		} );
	} );
}

function consolidateData() {
	for ( let key in gdd.domain_data ) {
		if ( gdd.domain_data.hasOwnProperty( key ) ) {

			gdd.sorted_data.push( {
				"domain": key,
				"url_count": gdd.domain_data[ key ].url_count,
				"a11y_count": gdd.domain_data[ key ].a11y_count,
				"error_count": gdd.domain_data[ key ].error_count
			} );
		}
	}

	return gdd.sorted_data;
}

function saveToFile() {
	return new Promise( function( resolve, reject ) {
		let data = JSON.stringify( consolidateData(), null, 2 );

		fs.writeFile( "../data/domain-data.json", data, function( error ) {
			if ( error ) {
				reject( error );
			} else {
				resolve();
			}
		} );
	} );
}

getAllCrawledDomains()
	.then( getCrawledAccessibilityURLs )
	.then( getAccessibilityErrorCount )
	.then( saveToFile )
	.catch( function( error ) {
		util.log( error );
	} );
