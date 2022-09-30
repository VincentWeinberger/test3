import React from "react"
import { useState } from "react"
import "../styles/Event.css"

const Event = ({ eventObj, submitEvent, toggleRO }) => {
  const [currObj, setCurrObj] = useState(eventObj)

  //Turning 'date' into more intuitively read english
  const dateValues = eventObj.date.split("-")
  const year = parseInt(dateValues[0])
  const monthIndex = parseInt(dateValues[1]) - 1
  const day = parseInt(dateValues[2])

  const niceEventDate = new Date(year, monthIndex, day).toDateString()

  //Parse today's date for use in 'input' element type 'date' to set 'min' attribute
  const newDate = new Date()
  const newYear = newDate.getFullYear()
  const newMonth = newDate.getMonth()
  const niceMonth =
    newMonth > 8 ? String(newMonth + 1) : "0" + String(newMonth + 1)
  const newDay = newDate.getDate()
  const niceDay = newDay > 9 ? String(newDay) : "0" + String(newDay)

  const niceTodayDate = `${newYear}-${niceMonth}-${niceDay}`
  //console.log(niceTodayDate)

  return (
    <div className="event-control">
      {!eventObj.readonly ? (
        <form className="event-form">
          <div className="event-form-control">
            <label htmlFor="event-name">Event Name:</label>
            <input
              type="text"
              defaultValue={eventObj.name}
              onChange={(e) => setCurrObj({ ...currObj, name: e.target.value })}
            />
          </div>
          <div className="event-form-control">
            <label htmlFor="event-date">Date:</label>
            <input
              type="date"
              defaultValue={eventObj.date}
              min={niceTodayDate}
              max="2023-12-31"
              onChange={(e) => setCurrObj({ ...currObj, date: e.target.value })}
            />
          </div>
          <button
            type="button"
            className="done-btn"
            onClick={() => submitEvent(currObj)}
          >
            Save
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => toggleRO(eventObj.id)}
          >
            Cancel
          </button>
        </form>
      ) : (
        <div className="event-readonly">
          <div className="readonly-fields">
            <p className="readonly-name">{eventObj.name}</p>
            <p className="readonly-date">{niceEventDate}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Event
