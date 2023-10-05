import React from 'react'
import { Card } from 'reactstrap'
import { Container } from '@mui/material'
const ContactForm = () => {
  const [formStatus, setFormStatus] = React.useState('Send')
  const onSubmit = (e) => {
    e.preventDefault()
    setFormStatus('Submitting...')
    const { name, email, message } = e.target.elements
    let conFom = {
      name: name.value,
      email: email.value,
      message: message.value,
    }
  }
  return (
    <>
    <div style={{
        marginTop:"750px"
      }}></div>
    
    <Container >
      <Card style={{ padding:"50px" }}>
        <div className="container mt-5">
          <h2 className="mb-3">contact</h2>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="name">
                Name
              </label>
              <input className="form-control" type="text" id="name" required />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input className="form-control" type="email" id="email" required />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="message">
                Message
              </label>
              <textarea className="form-control" id="message" required />
            </div>
            <button className="btn btn-danger" type="submit">
              {formStatus}
            </button>
          </form>
        </div>
      </Card>
    </Container>
    </>
  )
}
export default ContactForm