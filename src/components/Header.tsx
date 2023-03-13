import { useState } from "react";
import LeftMenu from './LeftMenu'

export default function Header() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (
    <>
      <LeftMenu show={show} handleClose={handleClose} />

      <div className="br-header">
        <div className="br-header-left border-0">
          <div className="navicon-left hidden-md-down border-0">
            
          </div>
          <div className="navicon-left hidden-lg-up border-0">
            
          </div>          
        </div>
        <div className="br-header-right">
          <div className="navicon-right">
            <a id="btnRightMenu" href="" className="pos-relative">
              <i className="bi bi-person-fill"></i>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}