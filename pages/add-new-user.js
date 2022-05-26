import { useRef, useState } from 'react'
import { Form, Feedback, FormControl, Container, Button, Toast, ToastBody, ToastContainer } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const AddNewUser = ({ data }) => {
    const [form, setForm] = useState({})
    const [validated, setValidated] = useState()
    const [errors, setErrors] = useState({})
    const [toast, setToast] = useState(false);

    const formRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newErrors = findFormErrors()

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            setErrors({})
            setValidated(true)

            const formData = formRef.current
            const fullname = formData[0].value
            const email = formData[1].value
            const password = formData[2].value
            const re_password = formData[3].value
            const profileImg = formData[4].value

            const newUser = {
                fullname,
                email,
                password,
                profileImg
            }

            try {
                const response = await fetch('http://localhost:3001/api/user', {
                    method: "POST",
                    body: JSON.stringify(newUser)
                })
                const data = await response.json()
                setToast({ show: true, body: data.message, success: data.success })
            } catch (err) {
                setToast({ show: true, body: "Error! " + err.message, success: false })
            }
        }
    }

    const findFormErrors = () => {
        const { fullname, email, password, re_password, profile } = form
        const newErrors = {}

        if (!fullname || fullname === '') newErrors.fullname = 'This field is required!'
        if (!email || email === '') newErrors.email = 'This field is required!'
        else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) newErrors.email = "Invalid format!"
        if (!password || password === '') newErrors.password = 'This field is required!'
        else if (password !== re_password) newErrors.password = "Password mismatch!"
        if (!re_password || re_password === '') newErrors.re_password = 'This field is required!'
        else if (password !== re_password) newErrors.re_password = "Password mismatch!"
        if (!profile || profile === '') newErrors.profile = 'This field is required!'

        return newErrors
    }

    const setControl = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })

        if (!!errors[field]) setErrors({
            ...errors,
            [field]: null
        })
    }

    return (
        <Container>
            <h1>Add new user</h1>
            <ToastContainer position="top-center" className="p-3">
                {toast &&
                    <Toast bg={toast.success ? 'success' : 'danger'} delay={3000} show={toast.show} autohide onClose={() => setToast({ show: false, body: '', success: toast.success })} >
                        <ToastBody>
                            <p className="text-light">{toast.body}</p>
                        </ToastBody>
                    </Toast>
                }
            </ToastContainer>
            <Form method="" validated={validated} ref={formRef}>
                <Form.Group className="mb-3" >
                    <Form.Label>Fullname</Form.Label>
                    <Form.Control
                        type="text"
                        required
                        placeholder="First Name, Middle Initial, Last Name"
                        onChange={(e) => setControl('fullname', e.target.value)}
                        isInvalid={!!errors.fullname}
                    />
                    <Form.Control.Feedback type="invalid">{errors.fullname}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        required
                        placeholder="Email address"
                        onChange={(e) => setControl('email', e.target.value)}
                        isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        required
                        placeholder="Password"
                        onChange={(e) => setControl('password', e.target.value)}
                        isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control
                        type="password"
                        required
                        placeholder="Confirm password"
                        onChange={(e) => setControl('re_password', e.target.value)}
                        isInvalid={!!errors.re_password}
                    />
                    <Form.Control.Feedback type="invalid">{errors.re_password}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Profile image</Form.Label>
                    <Form.Control
                        type="file"
                        required
                        accept=".jpeg, .png"
                        isInvalid={!!errors.profile}
                        onChange={(e) => setControl('profile', e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">{errors.profile}</Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" onClick={(e) => handleSubmit(e)}>Submit</Button>
            </Form>
        </Container >
    )
}

export default AddNewUser;