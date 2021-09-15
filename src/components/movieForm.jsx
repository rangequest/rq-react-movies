import React from "react";
class MovieForm extends React.Component {
  handleSave = () => {
    this.props.history.replace("/movies");
  };
  render() {
    const { match } = this.props;
    return (
      <div>
        <h1>Movie Form {match.params.id}</h1>
        <button onClick={this.handleSave} className="btn btn-primary">
          Save
        </button>
      </div>
    );
  }
}

export default MovieForm;
