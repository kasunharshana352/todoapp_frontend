import React from "react";
const isAuthenticated = !!localStorage.getItem("token");

function Home() {
  return isAuthenticated ? (
    <div>
      <h1>Welcome to Todo App!</h1>
      <p>
        Here You Go! <a href="/dashboard">Dashboard</a>
      </p>
    </div>
  ) : (
    <div>
      <h1>Welcome toTodo App!</h1>
      <p>Sign up or log in to get started.</p>
    </div>
  );
}

export default Home;
