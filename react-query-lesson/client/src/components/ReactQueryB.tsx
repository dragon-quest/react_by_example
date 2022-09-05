import { FC } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { ChevronDoubleLeftIcon } from '@heroicons/react/solid'
import { Task } from '../types/types'

export const ReactQueryB: FC = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const data = queryClient.getQueryData<Task[]>(['tasks'])
  console.log('rendered ReactQueryB')
  return (
    <>
      <p className="font-bold my-3">ReactQueryB</p>
      {data?.map((task) => (
        <p key={task.id}>{task.title}</p>
      ))}
      <ChevronDoubleLeftIcon
        onClick={() => navigate('/')}
        className="h-5 w-5 mt-2 text-blue-500 cursor-pointer"
      />
      <p className="text-sm">react query A</p>
    </>
  )
}
