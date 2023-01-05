import "./App.css";
import Card from "./components/Card";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import data from "./data.js";
import Dexie from "dexie";
import { useLiveQuery } from "dexie-react-hooks";

/* Creating a database called imagesDB and creating a table called image. */
const db = new Dexie("imagesDB");
db.version(1).stores({
  image: "++id, url, caption, date, isSelected",
});
const { image } = db;

function App() {
  /* Checking if the database is empty and if it is, it is adding the data from the data.js file. */
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
