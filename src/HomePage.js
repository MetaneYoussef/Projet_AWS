import React from "react";
import bg from "./Images/bg.png"; // Assuming this is the correct path to your image

function HomePage() {
  const sectionStyle = {
    width: "80vw",
    height: "80vh",
    backgroundImage: `url(${bg})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    position: 'relative', // This will be the base position for child elements
    zIndex: 0, // This ensures that it stays at the back of all other content
  };

  return (
    <div style={sectionStyle}>
      {/* All other content goes here. It will overlay on top of the background image */}
    </div>
  );
}

export default HomePage;
