export { Sidebar }

function Sidebar() {
  const entryNames = ["A", "B"];
  const entries = entryNames.map((entryNames) =>
    <p>{entryNames}</p>
  );

  return (
    <div>
      {entries}
    </div>
  );
}
  