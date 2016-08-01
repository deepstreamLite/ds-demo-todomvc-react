var ds = deepstream( 'localhost:6020' ).login( null, function(){
	React.render(
		<TodoApp dsRecord="todo-app"/>,
		document.getElementsByClassName('todoapp')[0]
	);
});

DeepstreamReactMixin.setDeepstreamClient( ds );