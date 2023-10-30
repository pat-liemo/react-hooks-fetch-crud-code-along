import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(function() {
    fetch("http://localhost:4000/items")
    .then(function(response) {
      return response.json()
    })
    .then(function(data) {
      setItems(data)
    })
  }, [])

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  function handleAddItem(newItem) {
    setItems([...items, newItem])
    }

  function handleUpdateItem(updatedItem) {
    const updatedItems = items.map(function(item) {
      if(item.id === updatedItem.id) {
        return updatedItem;
      }
      else {
        return item;
      }
    })
    setItems(updatedItems)
  }

  function handleDeleteItem(deletedItem) {
    const updatedItems = items.filter(function(item) {
      return item.id !== deletedItem.id;
    })
    
    setItems(updatedItems);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onUpdateItem={handleUpdateItem} onDeleteItem={handleDeleteItem}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
