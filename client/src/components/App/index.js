import React from 'react';

import ReactDOM from "react-dom";
import "../../css/bootstrap.min.css";
import "../../css/style.css";

class App extends React.Component {
    render() {
        return (
          <div>
            <header>
            <div className = "header">
                        <h1>UIC Night Rider</h1>
                        <p> Hello {this.props.name} </p>
                    </div>
            </header>
            <main>
              {this.props.children}
            </main>
      
            <footer>
            <p className="mt-5 mb-3 text-muted">&copy; 2020</p>
              Your copyright message
            </footer>
          </div>
        );
      }
    }
export default App;
