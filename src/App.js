import "./styles/App.css"
import { useState } from "react"
import Event from "./components/Event"
import { v4 as uuidv4 } from "uuid"
import React from "react"

function App() {
  const [actionState, setActionState] = useState("none")

  const [events, setEvents] = useState([
    {
      id: uuidv4(),
      name: "Soccer Game",
      date: "2023-04-18",
      readonly: true,
    },
    {
      id: uuidv4(),
      name: "Birthday Party",
      date: "2023-04-21",
      readonly: true,
    },
    {
      id: uuidv4(),
      name: "Piano Recital",
      date: "2023-04-27",
      readonly: true,
    },
  ])

  //Toggle readonly so that user can add/update event data
  const toggleRO = (i) => {
    setEvents(
      events.map((event) =>
        event.id === i ? { ...event, readonly: !event.readonly } : event
      )
    )
    actionState === "none" ? setActionState("update") : setActionState("none")
  }

  //Add event to our list of events in the State
  //Takes in the name and date of the event as parameters
  const addEvent = () => {
    const newEvent = {
      id: uuidv4(),
      name: "",
      date: "",
      readonly: false,
    }

    setEvents([...events, newEvent])
    setActionState("add")
  }

  const submitEvent = (eObj) => {
    setEvents(
      events.map((event) =>
        event.id === eObj.id
          ? { ...event, name: eObj.name, date: eObj.date, readonly: true }
          : event
      )
    )
    setActionState("none")
  }

  //Delete an event from our list of events
  //Takes in user ID as a parameter to identify which event to delete
  const deleteEvent = (i) => {
    setEvents(events.filter((event) => event.id !== i))
    setActionState("none")
  }

  /*
--DEVELOPMENT NOTES--

DOES need to be called inside Event component: SubmitEvent Button, ToggleRO Button

DOES NOT need to be called inside Event component: Add Button, Delete Button, ToggleRO Button

*/

  return (
    <div className="App">
      <div className="app-header">
        <h1>Event Planner</h1>
        <h2>A beginner React project by Vincent Weinberger</h2>
      </div>
      <div className="app-body">
        <div className="events">
          {events.map((event) => (
            <div key={event.id} className="event">
              <div className="btn-container">
                <button
                  className="update-btn"
                  onClick={() => toggleRO(event.id)}
                  disabeld={actionState === "none" ? "" : "true"}
                >
                  Update
                </button>
              </div>
              <Event
                key={event.id}
                eventObj={event}
                submitEvent={submitEvent}
                toggleRO={toggleRO}
              />
              <div className="btn-container">
                <button
                  className="delete-btn"
                  onClick={() => deleteEvent(event.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          <div className="events add-event">
            <button
              className="add-btn"
              onClick={addEvent}
              disabled={actionState === "none" ? "" : "true"}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
