import React from 'react'
import { Container } from "react-bootstrap";

const ContainerBox = (props) => {
  const {children, className} =  props
    return (
        <Container className={className}>{children}</Container>
  )
}

export default ContainerBox