 var React = require("react");
 class Show extends React.Component {
  render() {
    const userList = 'List of pokemons that User ' + this.props.pokemon[0].user_id + ' caught:';
    const pokeList = this.props.pokemon.map(pokemon => {
        return <option>{pokemon.name}</option>
    })
    return (
      <html>
        <head />
        <body>
          <label>{userList}</label>
          <br></br>
          <select> 
              {pokeList}
          </select>
          
          
        </body>
      </html>
    );
  }
}
 module.exports = Show;

