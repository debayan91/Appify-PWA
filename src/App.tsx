import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    document.body.style.backgroundColor = "#000000";
    document.body.style.margin = "0";
    document.body.style.overflow = "hidden";
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#000000",
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        width="120"
        height="120"
        viewBox="0 0 24 24"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M8 5V19L19 12L8 5Z" />
      </svg>
    </div>
  );
};

export default App;
