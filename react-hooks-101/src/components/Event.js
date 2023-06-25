import React, { useContext } from "react";

import { ADD_OPERATION_LOG, DELETE_EVENT } from '../actions'
import { timeCurrentIso8601 } from "../utils";
import AppContext from "../contexts/AppContext";

const Event = ({event}) => {
    const { dispatch } = useContext(AppContext)
    const handleClickDeleteButton = () => {
        const id = event.id
        const result = window.confirm(`イベントを(id=${id})本当に削除しても良いですか？`)
        if (result) {
            dispatch({
              type: DELETE_EVENT,
              id
            })
            dispatch({
              type: ADD_OPERATION_LOG,
              description: `イベント(id=${id})を削除しました。`,
              operatedAt: timeCurrentIso8601()
            })
        }
      }            
      return (
        <tr>
        <td>{event.id}</td>
        <td>{event.title}</td>
        <td>{event.body}</td>
        <td><button type='button' className='btn btn-danger' onClick={handleClickDeleteButton}>削除</button></td>
      </tr>
      )
}

export default Event