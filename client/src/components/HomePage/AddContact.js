import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddContact = () => {
  const navigate = useNavigate();

  const [newContact, setNewContact] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate phone number format
    if (newContact.phone.match(/[0-9]{4}-[0-9]{5}-[0-9]{2}/)) {
      alert("Phone number should not contain dashes. Please remove dashes and try again.");
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        navigate("/Login");
        return;
      }

      const response = await fetch(
        "https://my-contacts-server-beryl.vercel.app/api/contacts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newContact),
        }
      );

      if (!newContact.name || !newContact.email || !newContact.phone) {
        alert("All fields are mandatory!");
        return;
      }

      if (response.ok) {
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="_login-container">
      <div className="_container">
        <h2>Add Contact</h2>
        <form className="_login-title" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={newContact.name}
            onChange={(e) =>
              setNewContact({ ...newContact, name: e.target.value })
            }
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={newContact.email}
            onChange={(e) =>
              setNewContact({ ...newContact, email: e.target.value })
            }
            required
          />
          <input
            type="tel"
            placeholder="Phone"
            value={newContact.phone}
            onChange={(e) =>
              setNewContact({ ...newContact, phone: e.target.value })
            }
            required
          />
          <div className="_button-container">
            <button type="submit">Add Contact</button>
            <button
              type="button"
              className="_cancel-button"
              onClick={() => navigate("/home")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContact;
