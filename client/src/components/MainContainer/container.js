
import React, { Component } from 'react'
import {

  Container,
  Header,

  Responsive,
  Segment,
  Visibility,
} from 'semantic-ui-react'

const getWidth = () => {
    const isSSR = typeof window === 'undefined'
  
    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}
const HomepageHeading = ({ mobile }) => (
    <Container text>
      <Header
        as='h5'
        content='UIC Night Rider'
        inverted
        style={{
          fontSize: mobile ? '2em' : '4em',
          fontWeight: 'normal',
          marginBottom: '0.1em',
          marginTop:  '0.5em',
        }}
      />
      <Header
        as='h2'
        content='Hello'
        inverted
        style={{
          fontSize: mobile ? '1.5em' : '1.7em',
          fontWeight: 'normal',
          marginTop: 0,
          marginBottom: '0.1em',
        }}
      />
      
    </Container>
  )

class DesktopContainer extends Component {
    state = {}
  
    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })
  
    render() {
      const { children } = this.props
      //const { fixed } = this.state
  
      return (
        <Responsive getWidth={getWidth} >
          <Visibility
            once={false} 
            onBottomPassed={this.showFixedMenu}
            onBottomPassedReverse={this.hideFixedMenu}
            >

            <Segment
              inverted
              textAlign='center'
              style={{ minHeight: 100, padding: '1em 0em' }}
              vertical
            >
              
              <HomepageHeading />
            </Segment>
          </Visibility>
          {children}
        </Responsive>
      )
    }
  }
export default DesktopContainer;