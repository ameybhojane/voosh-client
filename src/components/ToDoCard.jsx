import moment from 'moment/moment'
import React from 'react'
import { Card, CardBody, CardFooter, CardTitle } from 'reactstrap'

function ToDoCard(props) {
    const {title ="", description ="", createdAt=""} = props
  return (
    <Card>
        <CardTitle>
            {title}
        </CardTitle>
        <CardBody>
            {description}
        </CardBody>
        <CardFooter>
            Created at {moment(createdAt).format('DD/MM/YY HH:mm:ss')}
        </CardFooter>
    </Card>
  )
}

export default ToDoCard
