import React, {Component, PropTypes} from 'react'
import {Button, Modal} from 'react-bootstrap';

class RequestItem extends Component {
    constructor (props) {
        super(props);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.state = {showModal: false};
    }

    close () {
        this.setState({showModal: false});
    }

    open () {
        this.setState({showModal: true});
    }

    render () {
        const {index, requestTime, mockId, method, url, responseStatus, requestHeaders, requestBody, responseHeaders, responseBody} = this.props;
        return (
            <div>
                <Button
                    bsStyle="link"
                    onClick={this.open}
                    style={{whiteSpace: "pre-wrap", textAlign: "left", padding: "0", color: "gray"}}
                >
                    {new Date(requestTime).toLocaleTimeString() + ' [' + mockId + ':' +  method + '] ' + url}
                </Button>

                <Modal bsSize="large" show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>{new Date(requestTime).toLocaleTimeString() + ' ['  + mockId + ':' + method + '] ' + url}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Response Status - {responseStatus}<br/>
                        Request Headers
                        <pre style={{whiteSpace: "pre-wrap"}}>
                    {requestHeaders}
                </pre>
                        Request Body
                        <pre style={{whiteSpace: "pre-wrap"}}>
                    {requestBody}
                </pre>
                        Response Headers
                        <pre style={{whiteSpace: "pre-wrap"}}>
                    {responseHeaders}
                </pre>
                        Response Body
                        <pre style={{whiteSpace: "pre-wrap"}}>
                    {responseBody}
                </pre>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        )
    }
}

RequestItem.propTypes = {
    index: PropTypes.number.isRequired,
    method: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
}

export default RequestItem;