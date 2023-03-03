import { Button, Col, Container, Offcanvas, Row } from 'react-bootstrap'
import { useState } from 'react'

type props = {
  show: boolean,
  handleClose: () => void
}

export default function LeftMenu({show, handleClose}: props) {
  return (
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Menu</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Container>
          <Row>
            <Col>
              <Button variant='primary'>Genual</Button>
            </Col>
          </Row>
        </Container>
      </Offcanvas.Body>
    </Offcanvas>
  )
}