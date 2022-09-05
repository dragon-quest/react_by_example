import axios from 'axios'
import { useAppDispatch } from '../app/hooks'
import { resetEditedTag } from '../slices/todoSlice'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { Tag } from '../types/types'

export const useMutateTag = () => {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()

  const createTagMutation = useMutation(
    (tag: Omit<Tag, 'id'>) =>
      axios.post<Tag>(`${process.env.REACT_APP_REST_URL}/tags/`, tag),
    {
      onSuccess: (res) => {
        const previousTodos = queryClient.getQueryData<Tag[]>(['tags'])
        if (previousTodos) {
          queryClient.setQueryData<Tag[]>(
            ['tags'],
            [...previousTodos, res.data]
          )
        }
        dispatch(resetEditedTag())
      },
    }
  )

  const updateTagMutation = useMutation(
    (tag: Tag) =>
      axios.put<Tag>(`${process.env.REACT_APP_REST_URL}/tags/${tag.id}/`, tag),
    {
      onSuccess: (res, variables) => {
        const previousTodos = queryClient.getQueryData<Tag[]>(['tags'])
        if (previousTodos) {
          queryClient.setQueryData<Tag[]>(
            ['tags'],
            previousTodos.map((tag) =>
              tag.id === variables.id ? res.data : tag
            )
          )
        }
        dispatch(resetEditedTag())
      },
    }
  )

  const deleteTagMutation = useMutation(
    (id: number) =>
      axios.delete<Tag>(`${process.env.REACT_APP_REST_URL}/tags/${id}`),
    {
      onSuccess: (res, variables) => {
        const previousTodos = queryClient.getQueryData<Tag[]>(['tags'])
        if (previousTodos) {
          queryClient.setQueryData<Tag[]>(
            ['tags'],
            previousTodos.filter((tag) => tag.id !== variables)
          )
        }
        dispatch(resetEditedTag())
      },
    }
  )

  return { deleteTagMutation, createTagMutation, updateTagMutation }
}
