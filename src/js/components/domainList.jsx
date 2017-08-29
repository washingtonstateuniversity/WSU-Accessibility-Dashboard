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

        return <table className="domains">{domains}</table>
    }
}

export default DomainList;
