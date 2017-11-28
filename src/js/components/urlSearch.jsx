import TypeList from "./typeList.jsx";

class URLSearch extends React.Component {
    constructor( props ) {
        super( props );
    }

    handleSearch() {
        let search = document.getElementById( "url-lookup" ).value;
        let type = "code";

        let body = {
            "size": 0,
            "query": {
                "wildcard": {
                    "url": "*" + search + "*"
                }
            },
            "aggs": {
                "top_codes": {
                    "terms": {
                        "field": type,
                        "size": 1000
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
                let buckets = response.aggregations.top_codes.buckets,
                    code_selector = "",
                    items = [];

                for ( let i = 0, x = buckets.length; i < x; i++ ) {
                    code_selector = decodeURIComponent( buckets[ i ].key );

                    let item = {
                        "count": buckets[ i ].doc_count,
                        "type": type,
                        "code": code_selector,
                        "name": code_selector
                    };

                    if ( "code" === type ) {
                        let code_details = HTMLCS_WCAG2AAA.getMsgInfo( code_selector );
                        item.criterion = { __html:code_details[0][1] };
                        item.techniques = { __html: code_details[1][1] };
                    }

                    items.push( item );
                }

                ReactDOM.render( <TypeList items={items} type={type} />, document.getElementById( "search-results" ) );
            },
            error: function( jqXHR, textStatus, errorThrown ) {
                console.log( jqXHR, textStatus, errorThrown );
            }
        } );
    }

    render() {
        return <div id="url-search">
            <label htmlFor="url-lookup">Lookup URL:</label>
            <input type="text" name="url-lookup" id="url-lookup" defaultValue="" />
            <button onClick={this.handleSearch}>Search</button>
        </div>
    }
}

export default URLSearch;
