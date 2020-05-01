

import React from "react";
import { Header,Container,Segment  } from "semantic-ui-react";
class Footer extends React.Component {
    render() {
        return (
                    <Segment inverted vertical style={{ padding: '2em 0em' }}>
                        <Container>
                        <Header as='h4' inverted>
                            <a href="https://github.com/ckanich-classrooms/final-project-create-table-students"> More Information on UIC Night Rider</a>
                        </Header>
                        </Container>
                    </Segment>

    );
        // return (
        //         <div>
        //             <footer className="page-footer font-small blue">
        //                 <div className="footer-copyright text-center py-3">© 2020 Copyright:
        //                 <a href="https://github.com/ckanich-classrooms/final-project-create-table-students"> UIC Night Rider</a>
        //                 </div>
        //             </footer>
        //         </div>
        // );
    }
}

export default Footer ;