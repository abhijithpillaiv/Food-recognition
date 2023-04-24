import React, { useState } from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import Button from 'react-bootstrap/Button';
function search({ setrecipe }) {
  // const [rec, setrec] = useState(null)
  // note: the id field is mandatory
 const items=[
    {name:"Pizza"},
    {name:"Burger"},
    {name:"Sushi"},
    {name:"Steak"},
    {name:"Salad"},
    {name:"Pasta"},
    {name:"Fried Chicken"},
    {name:"Ice Cream"},
    {name:"Hotdog"},
    {name:"Noodle Soup"},
    {name:"Taco"},
    {name:"Sandwich"},
    {name:"Ramen"},
    {name:"Curry"},
    {name:"Dim Sum"},
    {name:"Grilled Cheese"},
    {name:"Fish and Chips"},
    {name:"Pho"},
    {name:"Gyoza"},
    {name:"Shrimp Scampi"},
    {name:"Chicken Alfredo"},
    {name:"Beef Stroganoff"},
    {name:"Caesar Salad"},
    {name:"Lobster Bisque"},
    {name:"Clam Chowder"},
    {name:"Crab Cakes"},
    {name:"Caviar"},
    {name:"Escargot"},
    {name:"Fajitas"},
    {name:"Tiramisu"},
    {name:"Pad Thai"},
    {name:"Eggs Benedict"},
    {name:"Croissant"},
    {name:"Biryani"},
    {name:"Donuts"},
    {name:"Pancakes"},
    {name:"Waffles"},
    {name:"Churros"},
    {name:"Cannoli"},
    {name:"Hamburger Steak"},
    {name:"Beef and Broccoli"},
    {name:"Peking Duck"},
    {name:"Peking Pork"},
    {name:"Kung Pao Chicken"},
    {name:"Spring Rolls"},
    {name:"Shrimp Fried Rice"},
    {name:"Chow Mein"},
    {name:"Orange Chicken"},
    {name:"Beef and Mushroom"},
    {name:"Shrimp and Lobster Sauce"},
    {name:"Beef and Black Bean Sauce"},
    {name:"Sweet and Sour Chicken"},
    {name:"Szechuan Pork"},
    {name:"General Tso's Chicken"},
    {name:"Mongolian Beef"},
    {name:"Garlic Shrimp"},
    {name:"Chicken and Rice"},
    {name:"Shrimp and Grits"},
    {name:"Fried Rice"},
    {name:"Stir-Fry"},
    {name:"Omelette"},
    {name:"Egg Fried Rice"},
    {name:"Fried Egg Sandwich"},
    {name:"Crab Rangoon"},
    {name:"Cheeseburger"},
    {name:"Chili Cheese Fries"},
    {name:"Onion Rings"},
    {name:"Fish Tacos"},
    {name:"Fish and Chips"},
    {name:"Calamari"},
    {name:"Potato Chips"},
    {name:"Fried Pickles"},
    {name:"Macaroni and Cheese"},
    {name:"Chicken Tenders"},
    {name:"Buffalo Wings"},
    {name:"Nachos"},
    {name:"French Fries"},
    {name:"Mozzarella Sticks"},
    {name:"Popcorn Shrimp"},
    {name:"BBQ Ribs"},
    {name:"Honey BBQ Wings"},
    {name:"Bacon Wrapped Scallops"},
    {name:"Loaded Potato Skins"},
    {name:"Spinach Artichoke Dip"},
    {name:"Buffalo Chicken Dip"},
    {name:"Bruschetta"},
    {name:"Deviled Eggs"},
    {name:"Garlic Bread"},
    {name:"Shrimp Cocktail"},
    {name:"Cheese Platter"},  {name:"Fruit Salad"},  {name:"Cucumber Salad"},  {name:"Caprese Salad"},  {name:"Greek Salad"},  {name:"Caesar Salad"},  {name:"Cobb Salad"},  {name:"Waldorf Salad"},  {name:"Pasta Salad"},  {name:"Taco Salad"},  {name:"Potato Salad"},  {name:"Coleslaw"},  {name:"Antipasto"},  {name:"Spring Salad"},  {name:"Quinoa Salad"},  {name:"Tabbouleh"},  {name:"Hummus"},  {name:"Baba Ganoush"},  {name:"Salsa"},  {name:"Guacamole"},  {name:"Nachos"},  {name:"Chips and Dip"},  {name:"Crudité Platter"},  {name:"Charcuterie Board"},  {name:"Sushi Roll"},  {name:"Sashimi"},  {name:"Tempura"},  {name:"Miso Soup"},  {name:"Udon"},  {name:"Ramen"},  {name:"Sukiyaki"},  {name:"Yakitori"},  {name:"Teriyaki Chicken"},  {name:"Tempura Shrimp"},  {name:"Tonkatsu"},  {name:"Okonomiyaki"},  {name:"Gyoza"},  {name:"Takoyaki"},  {name:"Matcha Ice Cream"},  {name:"Green Tea Latte"}

  ]

  // const clickHandler = () => {
  //   console.log(rec);
  //   setrecipe(rec)
  // }
  const handleOnSearch = (string) => {
    setrecipe(string)
    // setrec(string)
  }
  const handleOnSelect = (items) => {
    setrecipe(items.name)
    // setrec(item.name)
  }
  const formatResult = (items) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>{items.name}</span>
      </>
    )
  }

  return (
    <div >
          <ReactSearchAutocomplete
            items={items}
            showIcon="false"
            autoFocus
            onSearch={handleOnSearch}
            onSelect={handleOnSelect}
            placeholder='Search for recipies'
            formatResult={formatResult}
          />
        </div>
  )
}

export default search