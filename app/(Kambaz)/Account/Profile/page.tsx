import Link from "next/link";
import { Button, FormControl, FormSelect } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { BiCalendar } from "react-icons/bi";
import { InputGroup } from "react-bootstrap";
export default function Profile() {
    return (
        <div id="wd-profile-screen" className='p-2'>
            <h1>Profile</h1>
            <FormControl
                placeholder="alice"
                className="mb-2"/>
            <FormControl
                placeholder='password'
                type='password'
                className='mb-2'/>
            <FormControl
                placeholder='Alice'
                className='mb-2'/>
            <FormControl
                placeholder='Wonderland'
                className='mb-2'/>
            <InputGroup>
            <FormControl
                placeholder='01/01/2023'
                type='date'
                className='mb-2'/>
                <InputGroupText>
                    <BiCalendar className="fs-5" />
                </InputGroupText>
            </InputGroup>
            <FormControl
                placeholder='alice@wonderland'
                type='email'
                className='mb-2'/>
            <FormSelect>
                <option value="0" defaultChecked>User</option>
                <option value="1">Admin</option>
                <option value="2">Faculty</option>
                <option value="3">Student</option>
            </FormSelect><br/>
            <Link href='Signin'>
                <Button variant='danger' className='w-100'>Signout</Button>
            </Link>
           


        </div>
    );
}
