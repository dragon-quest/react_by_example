import React, { useContext, useState } from "react"
import { CREATE_EVENT, DELETE_ALL_EVENT, ADD_OPERATION_LOG, DELETE_ALL_OPERATION_LOGS } from '../actions'
import { timeCurrentIso8601 } from "../utils"
import AppContext from "../contexts/AppContext"

const EventForm = () => {
    const { state, dispatch } = useContext(AppContext)
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
  
    const addEvent = e => {
      e.preventDefault()
      dispatch({
        type: CREATE_EVENT,
        title,
        body
      })

      dispatch({
        type: ADD_OPERATION_LOG,
        description: 'イベントを作成しました',
        operatedAt: timeCurrentIso8601()
      })
  
      setTitle('')
      setBody('')
    }
  
    const deleteAllEvent = e => {
      e.preventDefault()
      const result = window.confirm('全てのイベントを本当に削除しても良いですか？')
      if (result) {
        dispatch({
          type: DELETE_ALL_EVENT
        })
        dispatch({
          type: ADD_OPERATION_LOG,
          description: '全てのイベントを削除しました',
          operatedAt: timeCurrentIso8601()
        })
      }
    }
  
    const unCreatable = title.length === 0 || body.length === 0
    const unDeleteble = state.events.length === 0
    const unOperationDeleteble = state.operationLogs.length === 0

    const deleteAllOperationLogs = (e) => {
      e.preventDefault()
      const result = window.confirm('全ての操作ログを本当に削除してもいいですか？')

      if (result) {
        dispatch({
          type: DELETE_ALL_OPERATION_LOGS
        })
      }
    }
  
    return (
        <>
            <h4>イベント作成フォーム</h4>
            <form>
            <div className='form-group'>
                <label htmlFor='formEventTitle'>タイトル</label>
                <input className='form-control' id='formEventTitle' value={title} onChange={e => setTitle(e.target.value)}></input>
            </div>
            <div className='form-group'>
                <label htmlFor='formEventBody'>タイトル</label>
                <textarea className='form-control' id='formEventBody' value={body} onChange={e => setBody(e.target.value)}></textarea>
            </div>
            <button className='btn btn-primary' onClick={addEvent} disabled={unCreatable}>イベントを作成する</button>
            <button className='btn btn-danger' onClick={deleteAllEvent} disabled={unDeleteble}>全てのイベントを削除する</button>
            <button className='btn btn-danger' onClick={deleteAllOperationLogs} disabled={unOperationDeleteble}>全ての操作ログを削除する</button>
            </form>
        </>
    )
}

export default EventForm
