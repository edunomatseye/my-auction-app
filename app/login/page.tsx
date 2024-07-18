import LoginForm from "@/components/loginForm";
import { title } from "@/components/primitives";

export default async function LoginPage() {
  return (
    <div>
      <h1 className={title()}>Login to Auction</h1>
      <h2>Server component static rendered</h2>

      <LoginForm />
    </div>
  );
}
