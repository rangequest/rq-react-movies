import React from "react";
class TableHeader extends React.Component {
  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = column => {
    const { order, path } = this.props.sortColumn;
    if (column.path !== path) return null;
    if (order === "asc") return <i className="fa fa-sort-asc"></i>;
    if (order === "desc") return <i className="fa fa-sort-desc"></i>;
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map(column => (
            <th className="clickable" key={column.path || column.key} onClick={() => this.raiseSort(column.path)}>
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
