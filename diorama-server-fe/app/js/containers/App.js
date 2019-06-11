import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Grid} from 'react-bootstrap'
import Navbar from '../components/Navbar'

class App extends Component {
    render () {
        const {children, mocks} = this.props
        return (
            <div>
                <Navbar mocks={mocks}/>
                <Grid>
                    {children}
                </Grid>
            </div>
        )
    }
}

let mapStateToProps = (state, ownProps) => {
    return {
      mocks: state.mocks
    }
}

export default connect(mapStateToProps, null)(App)