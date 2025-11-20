const CloudDecoration = () => {
  return (
    <>
      {/* Left side clouds */}
      <div className="fixed top-10 left-0 opacity-30 pointer-events-none">
        <svg width="200" height="100" viewBox="0 0 200 100">
          <ellipse cx="50" cy="50" rx="40" ry="30" fill="white" />
          <ellipse cx="80" cy="45" rx="35" ry="25" fill="white" />
          <ellipse cx="110" cy="50" rx="30" ry="20" fill="white" />
        </svg>
      </div>
      
      <div className="fixed top-60 left-20 opacity-20 pointer-events-none">
        <svg width="180" height="90" viewBox="0 0 180 90">
          <ellipse cx="45" cy="45" rx="35" ry="28" fill="white" />
          <ellipse cx="70" cy="40" rx="30" ry="23" fill="white" />
          <ellipse cx="95" cy="45" rx="28" ry="18" fill="white" />
        </svg>
      </div>

      {/* Right side clouds */}
      <div className="fixed top-20 right-10 opacity-30 pointer-events-none">
        <svg width="220" height="110" viewBox="0 0 220 110">
          <ellipse cx="60" cy="55" rx="45" ry="32" fill="white" />
          <ellipse cx="95" cy="50" rx="40" ry="28" fill="white" />
          <ellipse cx="125" cy="55" rx="35" ry="22" fill="white" />
        </svg>
      </div>

      <div className="fixed bottom-40 right-0 opacity-25 pointer-events-none">
        <svg width="190" height="95" viewBox="0 0 190 95">
          <ellipse cx="50" cy="48" rx="38" ry="30" fill="white" />
          <ellipse cx="80" cy="43" rx="33" ry="25" fill="white" />
          <ellipse cx="105" cy="48" rx="30" ry="20" fill="white" />
        </svg>
      </div>
    </>
  );
};

export default CloudDecoration;
