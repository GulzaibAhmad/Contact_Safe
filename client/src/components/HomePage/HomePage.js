import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./homepage.css";

const HomePage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [editingContact, setEditingContact] = useState(null);
  const [showAddContact, setShowAddContact] = useState(false); // State for showing the "Add Contact" section

  useEffect(() => {
    const fetchUser = async () => {
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

    const fetchContacts = async () => {
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

    fetchUser();
    fetchContacts();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/Login");
  };

  const handleAddContact = async () => {
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
        alert("All feilds are mandatory!");
      }

      if (response.ok) {
        const addedContact = await response.json();
        setContacts([...contacts, addedContact]);
        setNewContact({ name: "", email: "", phone: "" });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditContact = (contactId) => {
    setEditingContact(contactId);
  };

  const handleUpdateContact = async (contactId, updatedContact) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        navigate("/Login");
        return;
      }

      const response = await fetch(
        `https://my-contacts-server-beryl.vercel.app/api/contacts/${contactId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedContact),
        }
      );

      if (response.ok) {
        const updatedContactData = await response.json();
        setContacts((prevContacts) =>
          prevContacts.map((contact) =>
            contact.id === contactId ? updatedContactData : contact
          )
        );
        setEditingContact(null);
      } else {
        alert("All feilds are mandatory!");
      }
    } catch (error) {
      console.error(error);
    }
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
    <div className="container-home login-title">
    <div>
      <button onClick={handleLogout}>Logout</button>

      {user && <h1>Welcome {user.username}!</h1>}

      <div className="add-contact">
        <h2>Add Contact</h2>
        
        {showAddContact && (
          <div className="add-contact-form">
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
            <button onClick={handleAddContact}>Add Contact</button>
          </div>
        )}
        <button
          onClick={() => setShowAddContact(!showAddContact)}
          className="add-contact-button"
        >
          {showAddContact ? "Cancel" : "Add Contact"}
        </button>
      </div>

      <div>
        {contacts.map((contact) => (
          <div key={contact.id}>
            {editingContact === contact.id ? (
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  value={contact.name}
                  onChange={(e) =>
                    setContacts((prevContacts) =>
                      prevContacts.map((c) =>
                        c.id === contact.id ? { ...c, name: e.target.value } : c
                      )
                    )
                  }
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={contact.email}
                  onChange={(e) =>
                    setContacts((prevContacts) =>
                      prevContacts.map((c) =>
                        c.id === contact.id
                          ? { ...c, email: e.target.value }
                          : c
                      )
                    )
                  }
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={contact.phone}
                  onChange={(e) =>
                    setContacts((prevContacts) =>
                      prevContacts.map((c) =>
                        c.id === contact.id
                          ? { ...c, phone: e.target.value }
                          : c
                      )
                    )
                  }
                />
                <button
                  onClick={() =>
                    handleUpdateContact(contact.id, {
                      name: contact.name,
                      email: contact.email,
                      phone: contact.phone,
                    })
                  }
                >
                  Save
                </button>
                <button onClick={() => setEditingContact(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <p>{contact.name}</p>
                <p>{contact.email}</p>
                <p>{contact.phone}</p>
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
