import { Button, Col, Container, Offcanvas, Row } from 'react-bootstrap'
import { useState } from 'react'

type props = {
  show: boolean,
  handleClose: () => void
}

export default function LeftMenu({ show, handleClose }: props) {
  return (
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Menu</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <a href="" className="btn btn-primary btn-with-icon">
                <div className="ht-40 justify-content-between">
                  <span className="pd-x-15">Crear paciente</span>
                  <span className="icon wd-40"><i className="bi bi-person-fill"></i></span>
                </div>
              </a>
            </div>
            <div className="col-6">
              <a href="" className="btn btn-primary btn-with-icon">
                <div className="ht-40 justify-content-between">
                  <span className="pd-x-15">Verificar cita</span>
                  <span className="icon wd-40"><i className="bi bi-calendar"></i></span>
                </div>
              </a>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-6">
              <a href="" className="btn btn-primary btn-with-icon">
                <div className="ht-40 justify-content-between">
                  <span className="pd-x-15">Asignar Cita</span>
                  <span className="icon wd-40"><i className="bi bi-person-fill"></i></span>
                </div>
              </a>
            </div>
            <div className="col-6">
              <a href="" className="btn btn-primary btn-with-icon">
                <div className="ht-40 justify-content-between">
                  <span className="pd-x-15">Crear paciente</span>
                  <span className="icon wd-40"><i className="bi bi-person-fill"></i></span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  )
}