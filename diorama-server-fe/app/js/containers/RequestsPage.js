import {connect} from 'react-redux'
import RequestList from '../components/RequestList'
import {fetchMockRequestList} from '../actions'

const mapStateToProps = (state) => {
    return {
        requests: state.requests
    }
}

let mapDispatchToProps = (dispatch) => ({
    fetchMockRequestList: (indexTo, size) => dispatch(fetchMockRequestList.request(indexTo, size)),
    dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestList);