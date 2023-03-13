export default function Footer() {
  return (
    <footer className="bg-white fixed-bottom">
      <div className="container">
        <div className="row border-top border-cure text-center">
          <div className="col-6 border-end border-cure">
            <button className="btn fw-bold text-cure">
              <i className="bi bi-person-fill fs-4"></i>
              <br />
              Pacientes
            </button>
          </div>
          <div className="col-6">
            <button className="btn fw-bold text-cure">
              <i className="bi bi-calendar2-date fs-4"></i>
              <br />
              Agenda
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}