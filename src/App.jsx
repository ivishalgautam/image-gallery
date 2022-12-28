import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./components/Header";

function App() {
  const [images, setImages] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  useEffect(() => {
    async function fetchData() {
      let url = await fetch(
        "https://api.unsplash.com/photos/?client_id=Jf6Aks04fmd9QVn1PrLpU2Ig-NIZPeDKB_20kCOQBHU&orientation=landscape"
      );
      let data = await url.json();
      // console.log(data);
      setImages(data);
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1 className="top__heading" style={{ textAlign: "center" }}>
        Skill images
      </h1>
      <Header
        selectedCards={selectedCards}
        setSelectedCards={setSelectedCards}
        images={images}
        setImages={setImages}
      />
      <motion.div layout className="cards__container">
        <AnimatePresence>
          {images.map((item) => {
            return (
              <Card
                key={item.id}
                item={item}
                images={images}
                selectedCards={selectedCards}
                setSelectedCards={setSelectedCards}
              />
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default App;
