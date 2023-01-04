import "./App.css";
import Card from "./components/Card";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import data from "./data.js";
import Dexie from "dexie";
import { useLiveQuery } from "dexie-react-hooks";

const db = new Dexie("imagesDB");

db.version(1).stores({
  image: "++, url, caption, date, isSelected",
});

const { image } = db;

function App() {
  const allImages = useLiveQuery(() => image.toArray());

  if (allImages?.length <= 0) {
    image.bulkAdd(data).then(() => {
      console.log("done adding");
    });
  }

  return (
    <div className="App">
      <h1 className="top__heading" style={{ textAlign: "center" }}>
        Skill images
      </h1>
      <Header image={image} allImages={allImages} />
      <motion.div layout className="cards__container">
        <AnimatePresence>
          {allImages?.map((item) => {
            return (
              <Card
                key={item.id}
                item={item}
                image={image}
                allImages={allImages}
              />
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default App;
