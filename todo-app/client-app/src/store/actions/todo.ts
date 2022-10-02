export function addItem(title: string) {
  return async (dispatch: any) => {
    try {
      const addTodoItem: any = await fetch('http://localhost:3001/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
        }),
      })

      const body = await addTodoItem.json()

      if (addTodoItem.state !== 200) {
        return dispatch({ type: 'ADD_ITEM_ERROR', message: body.message })
      }

      return dispatch({ type: 'ADD_ITEM_SUCCESS', item: body.todo })
    } catch (e) {
      return dispatch({
        type: 'ADD_ITEM_ERROR',
        message: 'Something went wrong.',
      })
    }
  }
}

export function removeItem(item_id: string) {
  return async (dispatch: any) => {
    try {
      const removeItem: any = await fetch(
        'http://localhost:3001/todo/' + item_id,
        {
          method: 'DELETE',
        }
      )

      const body = await removeItem.json()

      if (removeItem.state !== 200) {
        return dispatch({ type: 'REMOVE_ITEM_ERROR', message: body.message })
      }

      return dispatch({ type: 'REMOVE_ITEM_SUCCESS', item_id: item_id })
    } catch (e) {
      return dispatch({
        type: 'REMOVE_ITEM_ERROR',
        message: 'Something went wrong.',
      })
    }
  }
}

export function markItemAsDone(item_id: number) {
  return {
    type: 'MARK_ITEM_DONE',
    item_id,
  }
}

export function getTodos() {
  return async (dispatch: any) => {
    try {
      const todoList: any = await fetch('http://localhost:3001/todos', {
        method: 'GET',
      })

      const body = await todoList.json()

      if (todoList.status !== 200) {
        return dispatch({ type: 'GET_TODOS_ERROR', message: body.message })
      }
      return dispatch({ type: 'GET_TODOS_SUCCESS', items: body.data })
    } catch (e) {
      return dispatch({
        type: 'GET_TODOS_ERROR',
        message: 'Something went wrong.',
      })
    }
  }
}
