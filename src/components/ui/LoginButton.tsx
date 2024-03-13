import { useFormStatus } from "react-dom";

export default function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button className="mt-4 w-full" aria-disabled={pending}>
      Sign in
    </button>
  );
}
