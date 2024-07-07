import { title } from "@/components/primitives";
import LoginForm from "@/components/loginForm";

export default async function LoginPage() {
  return (
    <div>
      <h1 className={title()}>Login to Auction</h1>
      <h2>Server componenet static rendered</h2>

      <LoginForm />
    </div>
  );
}
