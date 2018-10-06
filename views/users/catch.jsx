var React = require("react");
 class Catch extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <form className="user-form" method="POST" action="/users">
            <div className="user-attribute">
              User-id:<input name="user_id" type="text" />
            </div>
            <div className="user-attribute">
              Pokemon-id:<input name="pokemon_id" type="text" />
            </div>
            <br/>
            <input type="submit" value="Submit" />
          </form>
        </body>
      </html>
    );
  }
}
 module.exports = Catch;