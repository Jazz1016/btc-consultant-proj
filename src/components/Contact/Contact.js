import React, { useState } from "react";
import axios from "axios";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
// import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import "./Contact.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import ButtonToolbar from "react-bootstrap/ButtonToolbar"
const notify = () => toast("Wow so easy !");
const Contact = props => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  return (
    <div className="flex-contact">
      <header className="contact-header">Contact me</header>
      <section className="contact-box">
        <h5>Name</h5>
        <input
          onChange={e => {
            setName(e.target.value);
          }}
          value={name}
        />
        <h5>Email</h5>
        <input
          onChange={e => {
            setEmail(e.target.value);
          }}
          value={email}
          type="email"
        />
        <h5>Subject</h5>
        <input
          onChange={e => {
            setSubject(e.target.value);
          }}
          value={subject}
        />
        <h5>Message</h5>
        <TextareaAutosize
          rows="5"
          cols="35"
          onChange={e => {
            setMessage(e.target.value);
          }}
          value={message}
        />
        <br />
        <Button
          variant="success"
          onClick={() => {
            axios.post(`/api/contact`, { name, subject, email, message });
            toast.success("Message sent", {
              position: toast.POSITION.BOTTOM_RIGHT
            });
            setEmail("");
            setName("");
            setSubject("");
            setMessage("");
          }}
        >
          Send
        </Button>
      </section>
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default Contact;
