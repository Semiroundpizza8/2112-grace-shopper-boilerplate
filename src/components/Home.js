import React from "react";
import "../style/Home.css";
import Product from "../components/Product";


const Hero = "/Assets/Home Hero Image.jpg";
const Sofa = "/Assets/Sofa.jpg";
const EndTable = "/Assets/End Table.jpg";
const WoodChair = "/Assets/Wood Chair.jpg";
const TableSets = "/Assets/Stylish End Table Sets.jpg";
const ChildNightStand = "/Assets/Child Wooden Night Stand.jpg";
const LivingRoomSet = "/Assets/Living Room Set.jpg";

function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src={Hero}
          alt="Beautiful modern patio furniture with some green shrubbery on the foreground"
        />

        <div className="home__row">
          <Product
            id="1"
            title="Bougie Modern Sofa"
            price={599.99}
            image={Sofa}
            rating={5}
          />
          <Product
            id="2"
            title="Modern End Table"
            price={199.95}
            image={EndTable}
            rating={4}
          />
        </div>
        <div className="home__row">
          <Product
            id="3"
            title="Antique Wooden Chair"
            price={99.95}
            image={WoodChair}
            rating={4}
          />
          <Product
            id="4"
            title="Stylish End Table Sets"
            price={199.95}
            image={TableSets}
            rating={5}
          />
          <Product
            id="5"
            title="Child Wooden Night Stand"
            price={279.95}
            image={ChildNightStand}
            rating={5}
          />
        </div>

        <div className="home__row">
          <Product
            id="6"
            title="Bobby Living Room Set"
            price={1279.95}
            image={LivingRoomSet}
            rating={5}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
