import { Dispatch, SetStateAction } from "react"

export default function Header({ identification, setIdentification, setSearch }: { identification: string, setIdentification: Dispatch<SetStateAction<string>>, setSearch: Dispatch<SetStateAction<boolean>> }) {
  const keyPress = (e: { key: string; keyCode: number }) => {
    if(e.key === 'Enter' || e.keyCode === 13) {
      setSearch(false)      
      setSearch(true)
    }
  }
  
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-md fixed-top" style={{ "backgroundColor": "#44A69C" }}>
          <div className="container-fluid">
            <a className="navbar-brand fw-bold text-white fs-1" href="#">PACIENTES</a>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon text-white"></span>
            </button>

            <div className="navbar-collapse mt-2">
              <div className="input-group">
                <span className="input-group-text" id="basic-addon1">
                  <i className="bi bi-search"></i>
                </span>
                <input type='number' className="form-control" placeholder="Buscar Paciente" onKeyDown={keyPress} value={identification} onChange={(e) => { setIdentification(e.target.value) }} />
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}