import { useEffect, useState } from "react";
import "../styles/_messMenu.scss";
import axios from "axios";

export default function FoodChart() {
  const [meals, setMeals] = useState([]);
  //importing the data from the database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/messMenu")
        setMeals(res.data);
        console.log(res)        
      } catch (error) {
        console.log("Error fetching data", error);
      }
    }
    fetchData();
  }, []);
  console.log("meals", meals);
  return (
    <>
      <div className="MenuContainer">
        <h1>Weekly Menu</h1>     
        {meals.map((meal, id) => (          
            <div className="Day" key={id} >
              <h2>{meal.day}</h2>
              <div className="meals">
               <div className="Meal">
                <h3>Lunch</h3>                                  
                    <p>{meal.lunch.food}</p>
                    <div className="images">
                      <img src={meal.lunch.image1} alt="fooditem" />
                      <img src={meal.lunch.image2} alt="fooditem" />
                      <img src={meal.lunch.image3} alt="fooditem" />
                      <img src={meal.lunch.image4} alt="fooditem" />
                    </div>                                  
              </div>
              <div className="Meal">
                <h3>Dinner</h3>
                <p>{meal.dinner.food}</p>
                <div className="images">
                  <img src={meal.dinner.image1} alt="dinner" />
                  <img src={meal.dinner.image2} alt="dinner" />
                  <img src={meal.dinner.image3} alt="dinner" />
                  <img src={meal.dinner.image4} alt="dinner" />
                </div>
              </div>
            </div>
          </div>                                     
        ))}
      </div>
    </>
  );
}
