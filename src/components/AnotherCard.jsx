import { useEffect, useState } from "react";
import styles from "./card/Card.module.css";
const AnotherCard = () => {
  const [items, setItems] = useState([]);
  const [anIndex, setIndex] = useState(1)

  useEffect(() => {
    fetchData();
  }, []);

  const prevItem = () => {
    setIndex((prev) => prev - 1);
	fetchData()
  };
  const nextItem = () => {
    setIndex((prev) => prev + 1);
	fetchData()
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/products/${anIndex}`);
      const json = await response.json();
      //   console.log(json);
      setItems(json);
    } catch (error) {
      console.error("error", error);
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
            <div>
              <h1>nothing to see here</h1>
            </div>
          )}
          <div className={styles.btnContainer}>
            <button className={styles.button} onClick={prevItem}>prev</button>
            <button className={styles.button} onClick={nextItem}>next</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnotherCard;
