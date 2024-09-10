// import { useState, useEffect } from "react";

// const isClient = typeof window !== "undefined";

// function useMediaMatch(width) {
//   const [mediaMatch, setMediaMatch] = useState(false);
//   useEffect(() => {
//     const maxWidth = window.matchMedia(`(max-width:${width})`);

//     setMediaMatch(maxWidth.matches);

//     maxWidth.addEventListener("change", (e) => {
//       setMediaMatch(e.matches);
//     });
//   }, [width]);

//   return isClient ? mediaMatch : undefined;
// }

// export default useMediaMatch;

import { useState, useEffect } from "react";

const useMediaMatch = (width) => {
  // Ensure this runs only in the browser
  if (typeof window === "undefined") {
    return undefined;
  }

  const [mediaMatch, setMediaMatch] = useState(
    () => window.matchMedia(`(max-width:${width})`).matches
  );

  useEffect(() => {
    const maxWidth = window.matchMedia(`(max-width:${width})`);
    const handleChange = (e) => {
      setMediaMatch(e.matches);
    };

    // Initial match check
    setMediaMatch(maxWidth.matches);

    // Listen for changes
    maxWidth.addEventListener("change", handleChange);

    // Clean up event listener on component unmount
    return () => {
      maxWidth.removeEventListener("change", handleChange);
    };
  }, [width]);

  return mediaMatch;
};

export default useMediaMatch;
