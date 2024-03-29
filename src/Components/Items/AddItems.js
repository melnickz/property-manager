import { db } from "../../Context/firebase";
import { useUserAuth } from "../../Context/UserAuthContext";
import { Form } from "react-bootstrap";
import { useState } from "react";
import { addDoc, collection, doc } from "firebase/firestore";
import back from "../../Assets/backarrow.svg";
export const AddItems = (props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState();

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (name !== "" && !isNaN(price))
      try {
        const query = await doc(db, "Users", `${user.uid}`);
        const colRef = await collection(query, "Personal Items");
        await addDoc(colRef, {
          Name: name,
          Price: Number(price),
        });
        setUserDataUpdated(!userDataUpdated);
      } catch (error) {
        console.log('Failed to fetch items');
      }
  };

  const { user, setUserDataUpdated, userDataUpdated } = useUserAuth();

  return (
    <>
      <div style={{ backgroundColor: "white" }}>
        <div className="p-3" style={{backgroundColor: "#a7a4e0"}}>
        <button
            style={{
              backgroundColor: "#a7a4e0",
              border: "none",
              outline: "none",
            }}
            onClick={() => {
              props.setAdding(false);
            }}
          >
            <img alt="back" src={back} />
          </button>
        </div>
        <Form className="p-5" onSubmit={handleAddItem}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <label for="formBasicName">Item Name</label>
            <Form.Control
              type="text"
              placeholder="Item Name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formBasicPrice">
            <label for="formBasicPrice">Price</label>
            <Form.Control
              type="text"
              placeholder="Price"
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Form.Group>
          <div className="d-grid">
            <button className="mb-4 btn login-btn" type="Submit">
              Add Item
            </button>
          </div>
        </Form>
        <div style={{backgroundColor: "#a7a4e0"}} className="p-3">

        </div>
      </div>
    </>
  );
};
