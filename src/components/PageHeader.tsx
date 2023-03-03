import { Nav } from "react-bootstrap";

type header = {
  parent: string,
  menu: string,
  icon: string,
}

export function PageHeader({parent, menu, icon}: header) {
  return (
    <>
      <div className="br-pageheader">
        <Nav className="breadcrumb pd-0 mg-0 tx-12">
          <a className="breadcrumb-item" href="index.html">Cure Latam APP</a>
          <a className="breadcrumb-item" href="#">{parent}</a>
          <span className="breadcrumb-item active">{menu}</span>
        </Nav>
      </div>
    </>
  )
}