import "./Sidebar.css"

export { Sidebar, GetEntryNames }

function GetEntryNames() {
  return ["A", "B"];
}

function Sidebar() {
  let entryNames = GetEntryNames();
  const entries = entryNames.map((entryName) =>
    <p id={"entry " + entryNames.indexOf(entryName)}>{entryName}</p>
  );

  return (
    <div className="sidebar">
      <div className="personal-info">
        <h1>Filip Karman</h1>
        <p><a>About me!</a></p>
        <p><a href="https://github.com/filipkarman3">My Github</a></p>
        <div className="solid-line"/>
      </div>

      <div className="posts">
        <h1>My posts:</h1>

        <div className="post-list">
          {entries}
        </div>
      </div>
    </div>
  );
}
  