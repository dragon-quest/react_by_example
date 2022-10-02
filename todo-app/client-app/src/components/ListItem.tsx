import { Todo } from '../store/reducers/todo'
import { motion } from 'framer-motion'

interface ListItemInterface {
  item: Todo
  removeItemFromList: Function
  toggleItemDone: Function
}

function ListItem(props: ListItemInterface) {
  return (
    <motion.li
      animate={{ opacity: 1, y: '0' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center p-2 opacity-0 -translate-y-1/2"
    >
      <input
        onChange={() => props.toggleItemDone(props.item._id)}
        type="checked"
        className="h-4 w-4 mr-2 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        checked={props.item.is_done}
      />
      <p className={'w-full' + (props.item.is_done ? ' line-through' : '')}>
        {props.item.title}
      </p>
      <button
        onClick={() => props.removeItemFromList(props.item._id)}
        type="button"
        className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-2 py-0.5 bg-white text-base font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
      >
        Remove
      </button>
    </motion.li>
  )
}

export default ListItem
