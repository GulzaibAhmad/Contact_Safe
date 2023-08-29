import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./homepage.css";

const HomePage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          navigate("/Login");
          return;
        }

        const response = await fetch(
          "https://my-contacts-server-beryl.vercel.app/api/users/current",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          navigate("/Login");
        }
      } catch (error) {
        console.error(error);
        navigate("/Login");
      }
    };

    const fetchContactsData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          navigate("/Login");
          return;
        }

        const response = await fetch(
          "https://my-contacts-server-beryl.vercel.app/api/contacts",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const contactsData = await response.json();
          setContacts(contactsData);
        } else {
          navigate("/Login");
        }
      } catch (error) {
        console.error(error);
        navigate("/Login");
      }
    };

    fetchUserData();
    fetchContactsData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/Login");
  };

  const handleEditContact = (contactId) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === contactId ? { ...contact, isEditing: true } : contact
      )
    );
  };

  const handleCancelEdit = (contactId) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === contactId ? { ...contact, isEditing: false } : contact
      )
    );
  };

  const handleSaveEdit = (contactId, updatedContact) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/Login");
      return;
    }

    fetch(
      `https://my-contacts-server-beryl.vercel.app/api/contacts/${contactId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedContact),
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Failed to update contact");
      })
      .then((updatedContactData) => {
        setContacts((prevContacts) =>
          prevContacts.map((contact) =>
            contact.id === contactId
              ? { ...updatedContactData, isEditing: false }
              : contact
          )
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEditChange = (contactId, field, value) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === contactId ? { ...contact, [field]: value } : contact
      )
    );
  };

  const handleDeleteContact = async (contactId) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        navigate("/Login");
        return;
      }

      const response = await fetch(
        `https://my-contacts-server-beryl.vercel.app/api/contacts/${contactId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setContacts(contacts.filter((contact) => contact.id !== contactId));
      } else {
        navigate("/Login");
      }
    } catch (error) {
      console.error(error);
      navigate("/Login");
    }
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="header">
          {user ? (
            <h1 className="welcome-heading">Welcome {user.username}!</h1>
          ) : null}
          <div className="buttons">
            <Link to="/add-contact" className="button">
              Add Contact
            </Link>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>

        <div className="contacts-container">
          {contacts.map((contact) => (
            <div key={contact.id} className="contact-card">
            {contact.isEditing ? (
              <div className="edit-form">
                <input
                  type="text"
                  value={contact.name}
                  onChange={(e) =>
                    handleEditChange(contact.id, "name", e.target.value)
                  }
                />
                <input
                  type="email"
                  value={contact.email}
                  onChange={(e) =>
                    handleEditChange(contact.id, "email", e.target.value)
                  }
                />
                <input
                  type="tel"
                  value={contact.phone}
                  onChange={(e) =>
                    handleEditChange(contact.id, "phone", e.target.value)
                  }
                />
                <button onClick={() => handleSaveEdit(contact.id, contact)}>
                  Save
                </button>
                <button onClick={() => handleCancelEdit(contact.id)}>
                  Cancel
                </button>
              </div>
            ) : (
              <div className="paragraph">
                <p>
                  <strong>Name:</strong> {contact.name}
                </p>
                <p>
                  <strong>Email:</strong> {contact.email}
                </p>
                <p>
                  <strong>Phone:</strong> {contact.phone}
                </p>
                <button onClick={() => handleEditContact(contact.id)}>
                  Edit
                </button>
                <button onClick={() => handleDeleteContact(contact.id)}>
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default HomePage;
