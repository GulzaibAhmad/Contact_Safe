import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {

    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          navigate('/Login');
          return;
        }

        const response = await fetch("https://my-contacts-server-beryl.vercel.app/api/users/current", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
        
          // Log user data
          console.log(userData);  
        
          // Set user state
          setUser(userData); 
        } else {
          navigate('/Login'); 
        }
        
        
      } catch (error) {
        console.error(error);
        navigate('/Login');
      }
    };

    const fetchContacts = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          navigate('/Login');
          return;
        }

        const response = await fetch("https://my-contacts-server-beryl.vercel.app/api/contacts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const contactsData = await response.json();
          setContacts(contactsData);
        } else {
          navigate('/Login');
        }
      } catch (error) {
        console.error(error);
        navigate('/Login');
      }
    };

    fetchUser();
    fetchContacts();
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem("accessToken");
    navigate('/Login');
  }

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>

      {user && (
        <h1>Welcome {user.username}!</h1>
      )}

      <div>
        {contacts.map(contact => (
          <div key={contact.id}>
            <p>{contact.name}</p>
            <p>{contact.email}</p>
            <p>{contact.phone}</p>
            <button>Edit</button>
            <button>Delete</button>
            </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;