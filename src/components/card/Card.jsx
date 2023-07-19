import { useEffect, useState } from "react";
import styles from "./Card.module.css";

const Card = () => {
  const [items, setItems] = useState([]);
  const [anIndex, setAnIndex] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);

  function showNextItem() {
    setAnIndex((prev) => prev + 1);
    fetchData();
  }

  function showPrevItem() {
    setAnIndex((prev) => prev - 1);
    fetchData();
  }

  const fetchData = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/products/${anIndex}`);
      const json = await response.json();
      //   console.log(json);
      setItems(json);
    } catch (error) {
      console.error("Error fetching data:", error);
      setItems([]);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          {Object.keys(items).length > 0 ? (
            <div className={styles.itemContainer}>
              <h1>{items.title}</h1>
              <img
                className={styles.image}
                src={items.images[0]}
                alt={items.title}
              />
              <div className={styles.content}>
                <h3>Price: ${items.price}</h3>
                <h3>Description: {items.description}</h3>
              </div>
            </div>
          ) : (
            <p>No items to display.</p>
          )}
          <div className={styles.btnContainer}>
            <button className={styles.button} onClick={showPrevItem}>prev</button>
            <button className={styles.button} onClick={showNextItem}>next</button>
            {/* {anIndex > 0 ? <button onClick={showPrevItem}>prev</button> : null}
            
            {anIndex < items.length - 1 ? (
              <button onClick={showNextItem}>next</button>
            ) : null} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
