export default function Button({ children, handler, dec }) {
  return (
    <button
      class={`bg-indigo-400 text-white px-3 py-2 rounded shadow ${
        dec ? "bg-red-400" : ""
      }`}
      onClick={handler}
    >
      {children}
    </button>
  );
}
