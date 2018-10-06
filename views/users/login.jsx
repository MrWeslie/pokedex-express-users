var React = require("react");

  class Login extends React.Component {
   render() {
     return (
       <html>
         <head />
         <body>
           <form method="POST" action="/login">

             <div>
             <h1> Log in Page </h1>
               Name:<input name="name" type="text" required />
             </div>

             <div>
               Password:<input name="password" type="text" required />
             </div>

             <input type="submit" value="Log in" />
           </form>
         </body>
       </html>
     );
   }
 }
  module.exports = Login;