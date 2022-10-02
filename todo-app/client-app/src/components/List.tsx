import { AnimatePresence } from 'framer-motion'
import { Todo } from '../store/reducers/todo'
import ListItem from './ListItem'

interface ListInterface {
  list: Todo[]
  removeItemFromList: Function
  toggleItemDone: Function
}

function List(props: ListInterface) {
  return (
    <ul className="p-8 pt-0 divide-y">
      {props.list.length > 0 && (
        <AnimatePresence>
          {props.list.map((todo_item: Todo) => (
            <ListItem
              key={todo_item._id}
              item={todo_item}
              removeItemFromList={props.removeItemFromList}
              toggleItemDone={props.toggleItemDone}
            />
          ))}
        </AnimatePresence>
      )}
      {props.list.length < 1 && (
        <p>Your todo list is empty, please add some todo.</p>
      )}
    </ul>
  )
}

export default List
