import "./App.css";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import FileUpload from "./fileupload";
import { extractedText } from "./summary";
import DateTimePicker from "react-datetime-picker";
import { useState } from "react";

function App() {
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [name, setName] = useState("");
  const summ = extractedText;
  const [desc, setDesc] = useState(summ);

  const session = useSession();
  const supabase = useSupabaseClient();
  async function signIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        scopes: "https://www.googleapis.com/auth/calendar",
      },
    });

    if (error) {
      alert("problem logging into calender using supabase");
      console.log(error);
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
  }
  async function createCalenderEvent() {
    const event = {
      summary: name,
      description: summ,
      start: {
        dateTime: start.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: end.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    };
    await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + session.provider_token,
        },
        body: JSON.stringify(event),
      },
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        alert("Event created in Calendar :))");
      });
  }
  console.log(session);
  console.log(start);
  console.log(name);
  console.log(desc);
  return (
    <div className="App">
      <div>
        {session ? (
          <>
            <h4> {session.user.email}</h4>
            <div className="form-container">
              <p>START OF THE MEET</p>
              <div className="form-group">
                <DateTimePicker onChange={setStart} value={start} />
              </div>
              <p>END OF THE MEET</p>
              <div className="form-group">
                <DateTimePicker onChange={setEnd} value={end} />
              </div>
              <p>NAME</p>
              <div className="form-group">
                <input
                  type="text"
                  className="input-field"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <p>SUMMARY-DESCRIPTION</p>
              <div className="form-group">
                <form>{summ}</form>
              </div>
              <hr />
              <div className="bottom-div">
                <button onClick={() => createCalenderEvent()}>Calendar</button>
                <p></p>
              </div>
              <div className="top-right">
                <button onClick={() => signOut()}>Sign Out</button>
              </div>
              <div className="top-div">
                <FileUpload />
              </div>
            </div>
          </>
        ) : (
          <>
            <button onClick={() => signIn()}>sign in with google :)</button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
