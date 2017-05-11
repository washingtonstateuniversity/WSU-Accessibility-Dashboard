class Record extends React.Component {
	constructor( props ) {
		super( props );
	}

	render() {
		return 	<div className="code-details-result-wrapper">
			<div className="code-details-result">
				<div className="code-details-domain">
					Domain: {this.props.domain}
				</div>
				<div className="code-details-url">
					URL: <a href={this.props.url}>{this.props.url}</a>
				</div>
				<div className="code-details-code">
					<p><strong>Code:</strong> {this.props.code}</p>
				</div>
				<div className="code-details-message">
					<p><strong>Message:</strong> {this.props.message}</p></div>
				<div className="code-details-selector">
					<strong>Selector:</strong> <pre><code>{this.props.selector}</code></pre>
				</div>
				<div className="code-details-context">
					<strong>Context:</strong>
					<textarea readOnly value={this.props.context}></textarea>
				</div>
			</div>
		</div>
	}
}

export default Record;
