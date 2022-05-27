import { useState } from 'react'
import { Container } from 'react-bootstrap';
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.min.css';

const Homepage = ({ data }) => {
    const [user, setUser] = useState(data)
    return (
        <Container>
            <h1>Welcome!</h1>
            <Link href={"/add-new-user"}>Add user</Link>
            <div className="mt-3">
                <h2>User List: {user.length}</h2>
                {
                    user && <p>{JSON.stringify(user)}</p>
                }
            </div>
        </Container>
    )
}

export const getStaticProps = async () => {
    const userResponse = await fetch("http://localhost:3000/api/user")
    const data = await userResponse.json()

    return {
        props: {
            data
        }
    }
}

export default Homepage;