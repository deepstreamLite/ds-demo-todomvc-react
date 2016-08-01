
var ESCAPE_KEY = 27;
var ENTER_KEY = 13;

TodoItem = React.createClass({
	getInitialState: function () {
	    return this.props.data;
	},
	handleSubmit: function () {
		var val = this.state.editText.trim();

		if( val ) {
			this.setState({
				isEditing: false,
				title: this.state.editText
			});
		} else {
			this.destroy();
		}
	},

	startEdit: function () {
		this.setState({
			isEditing: true,
			editText: this.state.title
		});
	},

	handleKeyDown: function (event) {
		if (event.keyCode === ESCAPE_KEY) {
			this.setState({
				isEditing: false
			});
		} else if (event.keyCode === ENTER_KEY) {
			this.onSubmit();
		}
	},

	handleChange: function (event) {
		this.setState({editText: event.target.value});
	},

	destroy: function() {
		this.props.removeTodo( this.state.id );
	},

	toggleDone: function() {
		this.setState({ isDone: !this.state.isDone });
	},

	render: function () {
		return (
			<li className={classNames({
				completed: this.state.isDone,
				editing: this.state.isEditing
			})}>
				<div className="view">
					<input
						className="toggle"
						type="checkbox"
						checked={this.state.isDone}
						onChange={this.toggleDone}
					/>
					<label onDoubleClick={this.startEdit}>
						{this.state.title}
					</label>
					<button className="destroy" onClick={this.destroy} />
				</div>
				<input
					ref="editField"
					className="edit"
					value={this.state.editText}
					onChange={this.handleChange}
					onKeyDown={this.handleKeyDown}
					onBlur={this.handleSubmit}
				/>
			</li>
		);
	}
});