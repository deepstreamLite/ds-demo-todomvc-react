var ENTER_KEY = 13;
var ESCAPE_KEY = 27;

var TodoApp = React.createClass({

	getInitialState: function () {
		return {
			newTodoTitle: '',
			allChecked: false,
			todos: []
		}
	},

	handleChange: function (event) {
		this.setState({newTodoTitle: event.target.value});
	},

	handleNewTodoKeyDown: function (event) {
		if (event.keyCode !== ENTER_KEY || !this.state.newTodoTitle.trim() ) {
			return;
		}

		event.preventDefault();

		var todo = {
			title: this.state.newTodoTitle.trim(),
			id: Math.random(),
			isDone: false
		};

		this.setState({
			newTodoTitle: '',
			todos: this.state.todos.concat([ todo ])
		});
	},

	toggleAll: function( event ) {
		this.state.todos.forEach(function( todo ){
			todo.isDone = event.currentTarget.checked;
		});

		this.setState({
			allChecked: event.currentTarget.checked,
			todos: this.state.todos
		});
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
						value={this.state.newTodoTitle}
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
						checked={this.state.allChecked}
					/>
					<ul className="todo-list">
						{todos}
					</ul>
				</section>
			</div>
		)
	}
});