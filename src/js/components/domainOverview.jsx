import DomainList from "./domainList.jsx";

class DomainOverview extends React.Component {
    constructor( props ) {
        super( props );
    }

    componentDidMount() {
        $.getJSON( "data/domain-data.json", function( data ) {
            ReactDOM.render( <DomainList items={data} />, document.getElementById( "domain-list" ) );
        } );
    }

    render() {
        return <div id="domain-list" />
    }
}

export default DomainOverview;
