import React from 'react';
import {Popover,OverlayTrigger,Button} from 'react-bootstrap'
const popover = (props) => (
    <Popover id="popover-basic">
        <Popover.Title as="h3">{props.rate}</Popover.Title>
      <Popover.Content>
            Category: <strong>{props.category}</strong> 
       
      </Popover.Content>
    </Popover>
  );
  
  const PopMessage = (props) => (
    <OverlayTrigger trigger="click" placement="right" overlay={popover(props)}>
      <Button variant="success">View Details</Button>
    </OverlayTrigger>
  );
  
export default PopMessage