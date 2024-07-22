import "./App.css";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import FileUpload from "./fileupload";

function App() {
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
            <h2> hello!! {session.user.email}</h2>
            <button onClick={() => signOut()}>sign out with google :(</button>
            <div className="Pdf">
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
