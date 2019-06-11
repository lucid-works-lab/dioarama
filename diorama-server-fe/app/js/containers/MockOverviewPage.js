import { connect } from 'react-redux'
import MockStatusGadgetList from '../components/MockStatusGadgetList'

const mapStateToProps = (state) => {
    return {
        mocks: state.mocks
    }
}

export default connect(mapStateToProps, null)(MockStatusGadgetList);