var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <form className="pokemon-form" method="POST" action="/users/">
            <div className="pokemon-attribute">
              user-id:<input name="user_id" type="text" />
            </div>
            <div className="pokemon-attribute">
              pokemon-id:<input name="pokemon_id" type="text" />
            </div>
            <input type="submit" value="Submit" />
          </form>
        </body>
      </html>
    );
  }
}

module.exports = New;

