import React from 'react'
import { Card, CardBody, CardFooter, CardTitle } from 'reactstrap'

function ToDoCard(props) {
    const {title ="", description ="", updatedAt=""} = props
  return (
    <Card>
        <CardTitle>
            {title}
        </CardTitle>
        <CardBody>
            {description}
        </CardBody>
        <CardFooter>
            Last updated at {updatedAt}
        </CardFooter>
    </Card>
  )
}

export default ToDoCard
