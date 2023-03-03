export default function Login() {
  return (
    <div className="login-wrapper wd-300 wd-xs-350 pd-25 pd-xs-40 bg-white rounded shadow-base">
      <div className="signin-logo tx-center tx-28 tx-bold tx-inverse mb-5">
        <img src="/src/assets/img/logo.png" width="200px"/>
      </div>
      <div className="form-group">
        <input type="text" className="form-control" placeholder="Enter your username" />
      </div>
      <div className="form-group">
        <input type="password" className="form-control" placeholder="Enter your password" />
      </div>
      <button type="submit" className="btn btn-info btn-block">Sign In</button>
    </div>
  )
}