const NotFound = () => {
  return (
    <div
      style={{
        minHeight: "calc(100vh - 60px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#000",
        textAlign: "center",
      }}
    >
      <h2 style={{ fontSize: "2rem" }}>404 - Page Not Found</h2>
    </div>
  );
};

export default NotFound;
