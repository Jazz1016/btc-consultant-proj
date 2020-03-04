import React, { useState } from "react";
import axios from "axios";

const Contact = props => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  return (
    <div>
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
      <input
        onChange={e => {
          setMessage(e.target.value);
        }}
        value={message}
      />
      <section>
        <button
          onClick={() => {
            axios.post(`/api/contact`, { name, subject, email, message });
          }}
        >
          send
        </button>
      </section>
    </div>
  );
};

export default Contact;
