import { Submit } from "./submit";

export default async function SignIn() {
  const response = await fetch("http://localhost:3000/api/auth/csrf");
  const { csrfToken } = await response.json();

  return (
    <form method="post" action="/api/auth/callback/credentials">
      <input type="hidden" name="csrfToken" value={csrfToken} />
      <label>
        Username
        <input name="username" type="text" required />
      </label>
      <label>
        Password
        <input name="password" type="password" required />
      </label>
      <Submit />
    </form>
  );
}
