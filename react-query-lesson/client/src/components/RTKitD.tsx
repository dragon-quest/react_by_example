import { FC } from 'react'
import { useAppSelector } from '../app/hooks'
import { selectMode } from '../slices/counterSlice'

export const RTKitD: FC = () => {
  const mode = useAppSelector(selectMode)
  console.log('rendered RTKitD')
  return (
    <div className="flex justify-center items-center flex-col">
      <p className="font-bole my-3">RTKitD</p>
      <p className="text-blue-500">{mode ? 'mode on' : 'mode off'}</p>
    </div>
  )
}
