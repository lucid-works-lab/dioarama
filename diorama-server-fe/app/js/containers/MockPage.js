import { Label, Form, Groupfrom, ControlLabel, FormControl, Button, Col, FormGroup, Panel } from 'react-bootstrap'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { changeMockMode, changeEnumStubValue } from '../actions'

class MockPage extends Component {

    constructor(props) {
        super(props);
        this.getConfigDom = this.getConfigDom.bind(this);
    }

    handleStubChange(mockId, stubId, event) {
        this.props.changeEnumStubValue(mockId, stubId, event.target.value);
    }

    handleMockModeChange(mockId, event) {
        this.props.updateMockMode(mockId, event.target.value);
    }

    getConfigDom(config) {

        let styles = {
            gear: {
                paddingLeft: '0',
                top: '10px',
                opacity: !!config.loading ? 1 : 0
            }
        };

        let mockId = this.props.mock.mockId;

        return (
            <FormGroup controlId="enumStubConfig" key={config.stubId}>
                <Col componentClass={ControlLabel} sm={2}>
                    {config.description}
                </Col>
                <Col sm={6}>
                    <FormControl disabled={!!config.loading} componentClass="select" value={config.value}
                        onChange={this.handleStubChange.bind(this, mockId, config.stubId)}>>
                                {config.options.map((option) => (
                            <option value={option.name} key={option.name}>{option.name}
                            </option>
                        ))}
                    </FormControl>
                </Col>
                <Col sm={1} style={styles.gear}>
                    <img src="assets/gears.svg" />
                </Col>
            </FormGroup>
        )
    }

    onChange(event) {

    }

    render() {
        const { mock } = this.props

        if (!mock) {
            return <div>Loading...</div>
        }

        let styles = {
            gear: {
                paddingLeft: '0',
                top: '10px',
                opacity: !mock || !!mock.loadingMode ? 1 : 0
            }
        };

        return (
            <div>
                <Form horizontal>
                    <Panel header="General Mock Configuration">
                        <FormGroup controlId="mockId">
                            <Col componentClass={ControlLabel} sm={2}>
                                Mock Id
                            </Col>
                            <Col sm={6}>
                                <FormControl type="text" placeholder="mock id" disabled={true} value={mock.mockId} />
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="mode">
                            <Col componentClass={ControlLabel} sm={2}>
                                Running Mode
                            </Col>
                            <Col sm={6}>
                                <FormControl disabled={!mock || !!mock.loadingMode} componentClass="select"
                                    value={mock.mode}
                                    onChange={this.handleMockModeChange.bind(this, mock.mockId)}>
                                    <option value="Mock">Mock</option>
                                    <option value="Proxy">Proxy</option>
                                </FormControl>
                            </Col>
                            <Col sm={1} style={styles.gear}>
                                <img src="assets/gears.svg" />
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="type">
                            <Col componentClass={ControlLabel} sm={2}>
                                Mock Type
                            </Col>
                            <Col sm={6}>
                                <FormControl type="text" placeholder="port number" disabled={true}
                                    value={mock.mockType} />
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="portNumber">
                            <Col componentClass={ControlLabel} sm={2}>
                                Port Number
                            </Col>
                            <Col sm={6}>
                                <FormControl type="text" placeholder="port number" disabled={true}
                                    value={mock.portNumber} />
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="proxyUrlMatching">
                            <Col componentClass={ControlLabel} sm={2}>
                                Proxy Url Matching
                            </Col>
                            <Col sm={6}>
                                <FormControl type="text" placeholder="proxy url matching" disabled={true}
                                    value={mock.proxyUrlMatching} />
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="proxiedFrom">
                            <Col componentClass={ControlLabel} sm={2}>
                                Proxied From
                            </Col>
                            <Col sm={6}>
                                <FormControl type="text" placeholder="proxiedFrom id" disabled={true}
                                    value={mock.proxiedFrom} />
                            </Col>
                        </FormGroup>
                    </Panel>
                    {this.props.mock && this.props.mock.stubs ?
                        <Panel header="Stub Outcome Configuration">
                            {this.props.mock.stubs.map((config) => this.getConfigDom(config))}
                        </Panel>
                        : null
                    }
                </Form>
            </div>
        )
    }
}

let mapStateToProps = (state, ownProps) => {
    return {
        mock: state.mocks.filter((mock) => mock.mockId === ownProps.params.mockId)[0]
    }
}

let mapDispatchToProps = (dispatch) => ({
    updateMockMode: (mockId, mode) => dispatch(changeMockMode.request(mockId, mode)),
    changeEnumStubValue: (mockId, stubId, value) => dispatch(changeEnumStubValue.request(mockId, stubId, value)),
    dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(MockPage)
