import React from "react";
const ListGroup = ({ items, textProperty, valueProperty, onItemSelect, selectedItem }) => {
  return (
    <ul className="list-group">
      {items.map(item => {
        return (
          <li
            key={item[valueProperty]}
            onClick={() => onItemSelect(item)}
            className={item === selectedItem ? "clickable list-group-item active" : "clickable list-group-item"}
          >
            {item[textProperty]}
          </li>
        );
      })}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
