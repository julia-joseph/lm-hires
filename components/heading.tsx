export function Heading(props: { title?: string }) {
  return (
    <h2 className="text-xl mb-6 font-light tracking-wide text-gray-500">
      {props.title || "Untitled"}
    </h2>
    // <header className="w-full flex items-center justify-center border-b mx-auto text-center text-xs gap-8 py-4">
    // </header>
  );
}
