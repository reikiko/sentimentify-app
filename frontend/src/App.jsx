import { useEffect, useState } from "react";
import axios from "axios";
import StarBorder from "./components/StarBorder.jsx";
import Orb from "./components/Orb.jsx";
import DecryptedText from "./components/DecryptedText.jsx";
import GlassSurface from "./components/GlassSurface.jsx";
import logo from "./assets/logo.png";
import { motion } from "framer-motion";
import ShinyText from "./components/ShinyText.jsx";
import BlurText from "./components/BlurText.jsx";

function App() {
  const [text, setText] = useState("");
  const [sentiment, setSentiment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const analyzeSentiment = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${apiUrl}/analyze`, { text });
      setSentiment(res.data.sentiment);
    } catch (error) {
      console.error("Error analyzing sentiment", error);
      setSentiment("Error analyzing sentiment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen bg-gradient-to-bl from-black to-gray-900 border  border-gray-800 text-white transition-colors overflow-hidden">
      <div className="absolute flex items-center justify-center w-screen top-0 py-14 z-10">
        <GlassSurface
          displace={15}
          distortionScale={-150}
          redOffset={5}
          greenOffset={15}
          blueOffset={25}
          brightness={60}
          opacity={0.8}
          mixBlendMode="screen"
          borderRadius={50}
          width={1000}
          height={60}
        >
          <div className="w-full flex items-center justify-between px-6">
            <img src={logo} alt="logo" width={22} height={22} />
            <a href={"https://textblob.readthedocs.io/en/dev/"} target="_blank">
              <ShinyText
                text="Read the full paper here"
                disabled={false}
                speed={3}
                className="hover:text-gray-100 cursor-pointer"
              />
            </a>
          </div>
        </GlassSurface>
      </div>

      {/* Background Orb */}
      <div className="absolute inset-0 flex items-center justify-center w-screen h-screen">
        <Orb
          hoverIntensity={0.5}
          rotateOnHover={true}
          hue={2}
          forceHoverState={false}
        />
      </div>

      <div className="flex items-center justify-center flex-col w-full h-full">
        <header className="flex flex-col items-center text-center py-12 px-6 z-1">
          {/*<h2 className="text-4xl font-bold mb-2">How do you feel today?</h2>*/}
          <BlurText
            text="How do you feel today?"
            delay={150}
            animateBy="words"
            direction="top"
            className="text-4xl font-bold mb-2"
          />
          <motion.p
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 1,
            }}
            className="text-gray-600 dark:text-gray-300 max-w-lg"
          >
            Type a sentence and let AI determine your sentiment with style.
          </motion.p>
        </header>

        {/* Main Content */}
        <motion.main
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 1.5,
          }}
          className="flex flex-col items-center justify-center px-4 py-5 w-full"
        >
          <StarBorder
            as="div"
            className="w-1/2"
            color="white"
            speed="5s"
            thickness={2}
          >
            <textarea
              className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-2xl text-black dark:text-white dark:bg-gray-700 mb-4 resize-none min-h-[120px]
             focus:outline-none focus:ring-[0.5] focus:border-blue-500"
              placeholder="Type your sentence here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              className="w-full cursor-pointer text-white py-2 rounded-lg transition-all duration-300 bg-gradient-to-r from-blue-500 via-indigo-500 to-fuchsia-500 hover:from-blue-400 hover:via-indigo-400 hover:to-fuchsia-400"
              onClick={analyzeSentiment}
              disabled={loading}
            >
              {loading ? "Analyzing..." : "Analyze Sentiment"}
            </button>

            <div className="mt-6 text-start text-md">
              Sentiment:{" "}
              {sentiment && (
                <DecryptedText
                  text={sentiment}
                  speed={100}
                  animateOn="view"
                  className={`font-bold ${
                    sentiment === "Positive"
                      ? "text-green-500"
                      : sentiment === "Negative"
                        ? "text-red-500"
                        : "text-yellow-500"
                  }`}
                />
              )}
            </div>
          </StarBorder>
        </motion.main>
      </div>
      <div className="absolute flex items-center justify-center w-screen bottom-0 py-14 z-10">
        <p className="text-[#b5b5b5a4]"> &copy; 2025 Kiko Reiki.</p>
      </div>
    </div>
  );
}

export default App;
