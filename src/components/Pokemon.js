import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { Component } from "react";
import "./Pokemon.css";
import { Card } from "react-bootstrap";

class Pokemon extends Component {
  //initial state

  state = {
    name: "", //pokemon name
    imageUrl: "", //pokemon image url
    id: "", //identifier
    description: "", //pokemons desciption
    show: false, //modal state
  };
  /**
   * show modified
   * @returns state.show
   */
  handleClose = () =>
    this.setState({
      show: false,
    });
  /**
   * show modified
   * @returns state.show
   */
  handleShow = () => {
    this.setState({
      show: true,
    });
    console.log("show Modal", this.state);
  };
  /**
   * get pokemons description
   * @param {*} id
   * @returns
   */
  getPokemonDescription = (id) => {
    let endpoint = `https://pokeapi.co/api/v2/characteristic/${id}/`;
    return fetch(endpoint)
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .catch((err) => {
        return {};
      });
  };
  componentDidMount() {
    //destruction props to get properities
    const { name, url } = this.props;
    const pokemonId = url.split("/")[url.split("/").length - 2];
    let pokemonDescription = "";
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

    //fetching pokemon description by id
    this.getPokemonDescription(pokemonId).then((data) => {
      pokemonDescription = data.descriptions[7].description;
      this.setState({ description: pokemonDescription });
    });

    //modify the state object
    this.setState({ name, imageUrl, pokemonId });
  }

  render() {
    return (
      <>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header>
            <Modal.Title>{this.state.name}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <img alt="" className="pokemon-img" src={this.state.imageUrl} />
            <p>{this.state.description}</p>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
        <Card style={{ margin: "15px 15px", width: "12rem" }}>
          <Card.Img variant="top" src={this.state.imageUrl} />
          <Card.Body>
            <Card.Title>
              <h4 className="pokemon-name">{this.state.name}</h4>
            </Card.Title>

            <Button variant="light" onClick={this.handleShow}>
              More infos...
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default Pokemon;
