const React = require("react");

function driverLoggedIn(props) {
    let bodyStyles = {
        height: 100,
        margin: 0,
        padding: 0
    };
    // let headStyle={
    //     map {
    //         height: 100%;
    //         }
    //         html, body {
    //         height: 100%;
    //         margin: 0;
    //         padding: 0;
    //         }
    // }

    return(
        <html>
  <head>
    <style type="text/css">
      #map {
        height: 100%;
      }
      html, body {
        height: 100%;
        margin: 0;
        padding: 0;
      }
    </style>
  </head>
  <body>
    <div id="map">
    
        <script async defer
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAlfC_SV4Nbc9lfnmLnpOed58K9jYMB8N8
            &libraries=visualization&callback=initMap">
        </script>
    </div>
    <form action = "/logout" method = "GET">
        <button type = "submit" className = "btn btn-lg btn-secondary"> Logout </button>
    </form>





    <script>
      // The JavaScript code that creates the Firebase map goes here.
    </script>

  </body>
</html>
    );
}

module.exports = driverLoggedIn;