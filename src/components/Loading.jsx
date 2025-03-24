function Loading() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(255,255,255,0.3)",
        zIndex: 999,
        backdropFilter: "blur(3px)",
      }}
    >
      <div
        className="spinner-border"
        style={{ width: "100px", height: "100px" }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default Loading;
