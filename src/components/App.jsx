
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Notes from "./Notes.jsx";

export default function App() {
  const [session, setSession] = useState(null);

  return (
    <Routes>
      <Route
        path="/"
        element={
          session ? (
            <Navigate to="/notes" replace />
          ) : (
            <Login onSuccess={setSession} />
          )
        }
      />

      <Route
        path="/signup"
        element={
          session ? <Navigate to="/notes" replace /> : <Signup />
        }
      />

      <Route
        path="/notes"
        element={
          session ? (
            <Notes
              user={session.user}
              onLogout={() => setSession(null)}
            />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
