var React = require('react');
var PropTypes = require('prop-types');
function DefaultLayout(props) {
  return (
    <html>
        <head>
            <title>UIC Night Rider</title>
            <link rel="stylesheet" href="/stylesheets/bootstrap.min.css" />
            <link rel="stylesheet" href="/stylesheets/style.css" />
        </head>
        <body>
            
            <div class="header">
                <h1>UIC Night Rider</h1>
                <p> Hello {props.name} </p>
            </div>
            {props.children}
        </body>
    </html>
  );
}
DefaultLayout.propTypes = {
    name: PropTypes.string,
  };
module.exports = DefaultLayout;