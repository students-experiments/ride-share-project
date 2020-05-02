
import React, { Component } from 'react'
import UICLogo from "./UICLogo.png"
import headerBackground from "./back2.PNG"
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
        image = {UICLogo}
        content='Night Rider'
        inverted
        style={{
          
          fontSize: mobile ? '2em' : '4em',
          fontWeight: 'normal',
          marginBottom: '.5em',
          marginTop:  '.5em',
        }}  
        />
      <Header
        as='h2'
        content='Start Your Journey Now'
        inverted
        style={{
          fontSize: mobile ? '1.5em' : '1.7em',
          fontWeight: 'normal',
          marginTop: 0,
          marginBottom: '.5rem',
        }}
      />
      
    </Container>
  )

class DesktopContainer extends Component {

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
              style={{ 
                minHeight: 100, 
                padding: '1em 0em',
                backgroundImage: `url(${headerBackground})`,
                backgroundSize: '100% 100%', 
              }}
              vertical
            >
              
              <HomepageHeading/>
            </Segment>
          </Visibility>
          {children}
        </Responsive>
      )
    }
  }
export default withFirebase(DesktopContainer);
