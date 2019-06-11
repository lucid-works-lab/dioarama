import React, {Component, PropTypes} from 'react'
import RequestItem from './RequestItem'
import ResponsePayload from '../domain/ResponsePayload'
import {ListGroup, ListGroupItem, Button, Grid, Row, Col} from 'react-bootstrap';

class RequestList extends Component {
    constructor (props) {
        super(props);
        this.refresh = this.refresh.bind(this);
    }

    componentWillMount () {
        this.refresh();
    }

    refresh () {
        this.props.fetchMockRequestList(1, 200);
    }

    render () {
        const {requests} = this.props;
        return (
            <Grid>
                <Row>
                    <Col xs={3} xsOffset={9}>
                        <Button  onClick={this.refresh} style={{margin: "20px"}}>Refresh</Button>
                    </Col>
                </Row>
                <ListGroup>
                    {requests.map(request =>
                        <ListGroupItem key={request.index}>
                            <RequestItem
                                {...request}
                            />
                        </ListGroupItem>
                    )}
                </ListGroup>
            </Grid>
        )
    }
}

RequestList.propTypes = {
    requests: PropTypes.arrayOf(PropTypes.shape({
        method: PropTypes.string,
        url: PropTypes.string,
        response: PropTypes.instanceOf(ResponsePayload)
    }).isRequired).isRequired,
}

export default RequestList;
