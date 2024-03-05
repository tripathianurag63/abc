import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import resList from "../utils/mockData";
import Shimmer from "./shimmer";

const Body = () => {
    // srdhkjhggggggggggggggggggggggggghjknnbbbbbbbbbbbbbbbbb

 
// these are state variables it just same like normal varaibles but in this we pas two para so that we can values of this whenever we want
  const [listOfRestaurants,setListOfRestaurants]=useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);

  const [searchText, setsearchText]= useState("");

// a call back function and other is dependency
  useEffect(()=>{
    console.log("useEffect Called");
  }, []);

  const fetchData = async () => {
    const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.87560&lng=80.91150&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");

    const json = await data.json();
    console.log(json);
    setListOfRestaurants(json?.data?.card.cards[2]?.data?.data?.cards);
    setFilteredRestaurant(json?.data?.card.cards[2]?.data?.data?.cards);
  };
// conditional rendering
  // whenever state variables update, react trigger a reconciliation cycle(re-renders the component)



  return listOfRestaurants.length===0 ? (
    <Shimmer/>
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
           type="text" 
           className="search-box" 
           value={searchText}
           onChange={(e) => {
            setsearchText(e.target.value);
           }}
           />
          <button onClick={()=>{
            console.log(searchText);
            const filteredRestaurant = listOfRestaurants.filter((res) =>
              res.data.name.tolowercase().includes(searchText)
            );

            setFilteredRestaurant(filteredRestaurant);
          }}
          >
            Search</button>
        </div>
        <button
         className="filter-btn"
         onClick={()=>{
          // filter logic
          const filteredList=listOfRestaurants.filter(
            (res)=>res.data.avgRating>4
          );
          setListOfRestaurants(filteredList);
         }}
        >
          Top Rated Restaurants
        </button>
      </div>
      <div className="res-container">

        {/* <RestaurantCard 
         resData={resList[0]}
         />
        <RestaurantCard
         resData={resList[1]} 
        />
 */}

        {filteredRestaurant.map((restaurant) => (
          <RestaurantCard key={restaurant.data.id} resData={restaurant} />
        ))}

      </div>
    </div>
  );
};

export default Body;