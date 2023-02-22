import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import styles from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

function AvailableMeals() {
  const [availableMeals, setAvailableMeals] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const fetchRequest = async () => {
      const response = await fetch(
        "https://dbforreact-httpreq-default-rtdb.asia-southeast1.firebasedatabase.app/availableMeals.json"
      );
      if (!response.ok) {
        throw new Error("Request Failed!");
      }
      const data = await response.json();
      const dummyMeals = [];
      for (const key in data) {
        dummyMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setAvailableMeals(dummyMeals);
      setIsLoading(false);
    };

    fetchRequest().catch((err) => {
      setIsLoading(false);
      setError(err.message || "Something went wrong!");
    });
  }, []);

  const mealList = availableMeals.map((meal) => {
    return <MealItem key={meal.id} item={meal}></MealItem>;
  });
  let content = <ul>{mealList}</ul>;

  if (isLoading) {
    content = "Loading available meals...";
  }
  if (error) {
    content = <p>{error}</p>;
  }

  return (
    <section className={styles.meals}>
      <Card>{content}</Card>
    </section>
  );
}

export default AvailableMeals;
