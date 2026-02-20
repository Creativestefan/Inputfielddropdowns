import { InputField } from "./components/InputField";

export default function App() {
  return (
    <div
      className="dark size-full flex flex-col items-center justify-center"
      style={{ background: "var(--background)" }}
    >
      <InputField />
    </div>
  );
}