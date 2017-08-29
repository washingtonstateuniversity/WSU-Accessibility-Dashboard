class Domain extends React.Component {
    constructor( props ) {
        super( props );
    }

    render() {
        let error_rate = 0;

        if ( this.props.a11y_count !== 0 && this.props.error_count !== 0 ) {
            error_rate = ( this.props.error_count / this.props.a11y_count ).toFixed( 2 );
        }

        return 	<tr>
            <td>{this.props.domain}</td><td>{this.props.url_count}</td><td>{this.props.a11y_count}</td><td>{this.props.error_count}</td><td>{error_rate}</td>
        </tr>
    }
}

export default Domain;
