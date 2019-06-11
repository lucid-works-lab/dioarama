import React, {Component, PropTypes} from 'react'
import MockStatusGadget from './MockStatusGadget'

class MockStatusGadgetList extends Component {
    render () {
        const {mocks} = this.props;
        return (
            <div>
                {mocks.map(mock =>
                    <MockStatusGadget
                        key={mock.mockId}
                        {...mock}
                    />
                )}
            </div>
        )
    }
}

MockStatusGadgetList.propTypes = {
    mocks: PropTypes.arrayOf(PropTypes.shape({
        mockId: PropTypes.string.isRequired,
        mode: PropTypes.string.isRequired,
        proxiedFrom: PropTypes.string
    }).isRequired).isRequired,
}

export default MockStatusGadgetList;