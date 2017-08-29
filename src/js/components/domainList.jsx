import Domain from "./domain.jsx";

class DomainList extends React.Component {
    constructor( props ) {
        super( props );
    }

    render() {
        let domains = [];

        for ( let i = 0; i < this.props.items.length; i++ ) {
            let props = this.props.items[ i ];

            // React likes a unique key prop.
            props.key = "domain" + i;

            domains.push( <Domain {...props} /> );
        }

        return <table className="domains">
            <tr><th>Domain</th><th>Total URLs</th><th>Scanned URLs</th><th>Accessibility Errors</th><th>Error Rate</th></tr>
            {domains}
            </table>
    }
}

export default DomainList;
