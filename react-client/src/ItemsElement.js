import React from 'react';

export default function ItemsElement(props) {
  const items = props.items
  var itemsList = []
  for (let i = 0; i < items.length; i ++ ) {
    let item = items[i]
    itemsList.push(
      <div style = {{'margin': '10px', 'padding' : '20px', 'background' : '#cfd8dc', 'height' : '150px', 'display' : 'inline-block', 'width' : '45%'}}>
          <img alt = 'item' src = {item['imageURL']} style = {{'height' : '150px', 'width' : '150px', 'objectFit' : 'cover', 'float' : 'left', 'marginRight' : '10px'}}/>
          <div style = {{'display' : 'block'}}>
              <h3>{item.itemName}</h3>
              <p> {item.description} </p>
              <p>Price : {item.price} </p>
          </div>
      </div>
    )
  }
  return (
    <div>
    {itemsList}
    <br/>
    </div>
  )
}
