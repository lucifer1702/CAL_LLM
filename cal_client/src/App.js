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
  console.log(session);
  console.log(start);
  console.log(name);
  console.log(desc);
  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        {session ? (
          <>
            <h4> {session.user.email}</h4>
            <p> START OF THE MEET </p>
            <DateTimePicker onChange={setStart} value={start} />
            <p> END OF THE MEET </p>
            <DateTimePicker onChange={setEnd} value={end} />
            <p> NAME </p>
            <input type="text" onChange={(e) => setName(e.target.value)} />
            <p>SUMMARY-DESCRIPTION</p>
            <form> desc </form>
            <button onClick={() => signOut()}>:(</button>
            <div className="top-div">
              <FileUpload />
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
