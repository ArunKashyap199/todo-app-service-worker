onmessage = function(e) {
    const todos = e.data;
    const sortedTodos = todos.sort((a, b) => a.completed - b.completed);
    postMessage(sortedTodos);
};
