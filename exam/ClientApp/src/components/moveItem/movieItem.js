import React from 'react';
import {Card, Button} from 'react-bootstrap'
import Pop from '../popmessage/popmessage.js'
const movieitem = (props) => {
    return (
        <div>
            <Card style={{ width: '18rem', margin:'0 auto'}}>
  <Card.Img variant="top" src="https://cdn.cnn.com/cnnnext/dam/assets/200709133727-01-disney-world-reopening-preview-castle.jpg" />
                <Card.Body>
                    <p>{props.id + 1}</p>
                    <div style={{ textAlign: 'center', color: props.movie.rate == 10 ? 'green' : '', fontWeight:'bold'}}>
         <Card.Title>{props.movie.name.toUpperCase()}</Card.Title>

                        <Card.Text>
                            
      <Pop rate={props.movie.rate} category={props.movie.category.name}/>
    </Card.Text>
    </div>
  </Card.Body>
</Card>
        </div>
    )
}

export default movieitem;