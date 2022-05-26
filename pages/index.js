import { Container } from 'react-bootstrap';
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.min.css';

const Homepage = () => {

    return (
        <Container>
            <h1>Welcome!</h1>
            <Link href={"/add-new-user"}>Add user</Link>
        </Container>
    )
}

export default Homepage;