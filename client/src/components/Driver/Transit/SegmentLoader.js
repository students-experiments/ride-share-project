import React from "react";
import { Loader,Dimmer } from "semantic-ui-react";


class SegmentLoader extends React.Component {

    render() {
        return (
            <Dimmer active inverted>
                <Loader />
              </Dimmer>
        )
    }
}
export default SegmentLoader;