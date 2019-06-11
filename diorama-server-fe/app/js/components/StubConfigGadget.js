import React, {Component, PropTypes} from 'react'

class StubConfigGadget extends Component {
    render () {
        const {description, value} = this.props;
        return (
            <div>
                {description} - {value}
            </div>
        )
    }
}

StubConfigGadget.propTypes = {
    description: PropTypes.string.isRequired
}

export default StubConfigGadget;