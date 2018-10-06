var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <form method="POST" action="/users">

            <div>
            <h1> Register User Page </h1>
              Name:<input name="name" type="text" />
            </div>

            <div>
              Password:<input name="password" type="text" />
            </div>

            <input type="submit" value="Register" />
          </form>
        </body>
      </html>
    );
  }
}

module.exports = New;
