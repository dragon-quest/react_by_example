interface ListHeaderInterface {
  addItemToList: React.MouseEventHandler<HTMLButtonElement> | undefined
  title: string
  setTitle: Function
}

function ListHeader(props: ListHeaderInterface) {
  return (
    <div className="flex items-center p-8">
      <form className="basis-full group relative">
        <input
          value={props.title}
          onChange={(e) => props.setTitle(e.target.value)}
          className="focus:ring-2 focus:ring-blue-500 focus:outline-none w-full text-sm leading-6 text-gray-900 placeholder-gray-400 rounded-md py-2 px-4 ring-1 ring-gray-200 shadow-sm"
          type="text"
          aria-label="Add to list"
          placeholder="Add to list"
        ></input>
      </form>
      <button
        onClick={props.addItemToList}
        type="button"
        className="animate-bounce whitespace-nowrap bg-indigo-600
                    text-white text-sm leading-6 font-medium py-2 px-4 ml-2
                    rounded-lg transition ease-in-out delay-0 bg-blue-500
                    hover:-translate-y-1 hover:bg-indigo-500 duration-300"
      >
        + Add
      </button>
    </div>
  )
}

export default ListHeader
