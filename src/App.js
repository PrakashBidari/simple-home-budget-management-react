import { useState } from "react";

export default function App() {
  const [showExpanceForm, setShowExpanceForm] = useState(false);
  const [expances, setExpance] = useState([]);

  function handleShowExpanceForm(e) {
    setShowExpanceForm(() => !showExpanceForm);
  }

  function handleExpance(expance) {
    setExpance((expances) => [...expances, expance]);
    setShowExpanceForm(false);
  }

  return (
    <div className="app">
      <h2>Simple Home Budget Management System</h2>
      <div className="container">
        <div className="sidebar">
          <ExpanceList expances={expances} setExpance={setExpance} />
          {showExpanceForm && <ExpanceForm onHandleExpance={handleExpance} />}
          <Button onClick={handleShowExpanceForm}>
            {showExpanceForm ? "Close" : "Add Expance"}
          </Button>
        </div>

        <ExpanceTable expances={expances} />
        {/* {expances.length !== 0 ?  : ""} */}
      </div>
    </div>
  );
}

function ExpanceList({ expances, setExpance }) {
  function handleDelete(id) {
    setExpance((expances) => expances.filter((expance) => expance.id !== id));
  }

  return (
    <div className="expance-list">
      {expances.length !== 0
        ? expances.map((expance) => (
            <SingleList
              expance={expance}
              key={expance.id}
              onHandleDelete={handleDelete}
            />
          ))
        : "No Data At the movement"}
    </div>
  );
}

function SingleList({ expance, onHandleDelete }) {
  return (
    <div className="card">
      <img className="card-image" src={expance.image} alt="..." />
      <div className="card-body">
        <h3 className="name">{expance.name}</h3>
        <small>{expance.date}</small>
      </div>
      <p>Rs {expance.price} /-</p>
      <button
        style={{ background: "none", border: "none" }}
        onClick={() => onHandleDelete(expance.id)}
      >
        ❌
      </button>
    </div>
  );
}

function ExpanceTable({ expances }) {
  const totalBudget = 0;
  const tableTotal = expances.reduce((sum, expanse) => sum + expanse.price, 0);
  const remainingBudget = totalBudget + tableTotal;

  return (
    <div className="expanse-table">
      <h4>
        {remainingBudget > 0
          ? `The available budget right now is Rs ${remainingBudget}`
          : `You have exceade your budget by ${remainingBudget}`}
      </h4>
      <table>
        <thead>
          <tr>
            <th>S.N</th>
            <th>Name</th>
            <th>Image</th>
            <th>Date</th>
            <th>Price</th>
          </tr>
        </thead>

        <tbody>
          {expances.map((expanse, index) => (
            <TableList expanse={expanse} index={index} key={expanse.id} />
          ))}

          <SubTotal tableTotal={tableTotal} />
        </tbody>
      </table>
    </div>
  );
}

function TableList({ expanse, index }) {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{expanse.name}</td>
      <td>
        <img className="table-image" src={expanse.image} alt="..." />
      </td>
      <td>{expanse.date}</td>
      <td>Rs {expanse.price}</td>
    </tr>
  );
}

function SubTotal({ tableTotal }) {
  return (
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td>Total</td>
      <td>Rs {tableTotal}</td>
    </tr>
  );
}

function ExpanceForm({ onHandleExpance }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !price || !date || !image) {
      alert("Fill All Fild Correctly");
      return;
    }

    const id = 100 * Math.random(10);
    // console.log(id);
    const expance = {
      id,
      name,
      image: `${image}?=${id}`,
      price,
      date,
    };
    onHandleExpance(expance);
  }

  return (
    <div className="expanse-form" onSubmit={handleSubmit}>
      <form>
        <div className="form-add-expence">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Image</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />

          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <Button>Add</Button>
      </form>
    </div>
  );
}

function Button({ children, onClick }) {
  return (
    <div className="btn-container">
      <button className="add-button" onClick={onClick}>
        {children}
      </button>
    </div>
  );
}
