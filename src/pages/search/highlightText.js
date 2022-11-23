export const highlightText = (text, value) => {
  const title = text.toLowerCase();
  const searchValue = value.toLowerCase();
  if (searchValue !== "" && title.includes(searchValue)) {
    const matchText = text.split(new RegExp(`(${searchValue})`, "gi"));
    return (
      <div>
        {matchText.map((text, i) =>
          text.toLowerCase() === searchValue.toLowerCase() ? (
            <span key={i} style={{ fontWeight: 700, color: "#101b45" }}>
              {text}
            </span>
          ) : (
            text
          )
        )}
      </div>
    );
  }
  return text;
};
