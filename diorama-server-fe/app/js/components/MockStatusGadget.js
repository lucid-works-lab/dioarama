import React, {Component, PropTypes} from 'react'
import {Panel, PageHeader, Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import StubConfigGadget from './StubConfigGadget'

class MockStatusGadget extends Component {
    render () {
        const {mockId, mode, stubs} = this.props;
        return (
            <Panel>
                <PageHeader>
                   {mockId} <small>({mode})</small><LinkContainer to={"/mock/"+mockId}><Button bsStyle="link">Details</Button></LinkContainer>
                </PageHeader>
                {stubs.map(stubConfig =>
                    <StubConfigGadget
                        key={stubConfig.stubId}
                        {...stubConfig}
                    />
                )}
            </Panel>
        )
    }
}

MockStatusGadget.propTypes = {
    mockId: PropTypes.string.isRequired
}

export default MockStatusGadget;