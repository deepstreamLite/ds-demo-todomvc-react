var VIEWS = {
	ALL: 'ALL',
	ACTIVE: 'ACTIVE',
	COMPLETED: 'COMPLETED'
};
var ENTER_KEY = 13;

var TodoApp = React.createClass({
	//mixins: [DeepstreamMixin],

	getInitialState: function () {
		return {
			showing: VIEWS.ALL,
			newTodo: '',
			todos: []
		}
	},

	handleChange: function (event) {
		this.setState({newTodo: event.target.value});
	},

	handleNewTodoKeyDown: function (event) {
		if (event.keyCode !== ENTER_KEY || !this.state.newTodo.trim() ) {
			return;
		}

		event.preventDefault();

		// ds.record.getRecord( id ).set({
		// 	title: this.state.local.text,
		// 	isDone: false
		// });

		var todo = {
			title: this.state.newTodo.trim(),
			id: Math.random(),
			isDone: false
		}

		this.setState({
			newTodo: '',
			todos: this.state.todos.concat([ todo ])
		});

	},

	toggleAll: function() {

	},

	removeTodo: function( id ) {
		this.setState({
			todos: this.state.todos.filter(function( todo ){
				return todo.id !== id;
			})
		});
	},

	render: function() {
		var removeTodo = this.removeTodo;
		var todos = this.state.todos.map(function( data ){
			return <TodoItem key={data.id} data={data} removeTodo={removeTodo} />
		});
		return(
			<div>
				<header className="header">
					<h1>todos</h1>
					<input
						className="new-todo"
						placeholder="What needs to be done?"
						value={this.state.newTodo}
						onKeyDown={this.handleNewTodoKeyDown}
						onChange={this.handleChange}
						autoFocus={true}
					/>
				</header>
				<section className="main">
					<input
						className="toggle-all"
						type="checkbox"
						
						onChange={this.toggleAll}
					/>
					<ul className="todo-list">
						{todos}
					</ul>
				</section>
			</div>
		)
	}
});

React.render(
	<TodoApp />,
	document.getElementsByClassName('todoapp')[0]
);