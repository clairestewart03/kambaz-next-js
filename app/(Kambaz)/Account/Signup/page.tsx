import Link from "next/link";
import FormControl from "react-bootstrap/FormControl";
export default function Signup() {
    return (
        <div id="wd-signup-screen" className='p-2'>
      <h1>Sign Up</h1>
      <FormControl id="wd-username"
             placeholder="username"
             className="mb-2"/>
      <FormControl id="wd-password"
             placeholder="password" type="password"
             className="mb-2"/>
      <Link id="wd-signin-btn"
            href="/Account/Profile"
            className="btn btn-primary w-100 mb-2">
            Signup </Link>
      <Link id="wd-signup-link" href="/Account/Signin">Signin</Link>
    </div>
    );}
