import React, { useState } from 'react';
import './App.css';

function App() {
  // State to manage modal visibility and form data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [company, setCompany] = useState('');
  const [companyInfo, setCompanyInfo] = useState('');
  const [productInput, setProductInput] = useState('');
  const [products, setProducts] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);

  // Function to handle adding a product to the list
  const handleAddProduct = () => {
    if (productInput.trim()) {
      setProducts([...products, productInput]);
      setProductInput('');
    }
  };

  // Function to handle form submission
  const handleSubmit = () => {
    if (company && products.length > 0) {
      const newClient = { company, products, companyInfo };
      setClients([...clients, newClient]);
      // Reset fields and close modal
      setCompany('');
      setProducts([]);
      setCompanyInfo('')
      setIsModalOpen(false);
    }
  };

  return (
    <div className="App" style={{backgroundColor: 'white', height: '100vh'}}>
      {/* Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Client</h2>
            <input
              type="text"
              placeholder="Enter company name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
            <div>
                <input 
                    type='text'
                    placeholder='About the organisation'
                    value={companyInfo}
                    onChange={(e) => setCompanyInfo(e.target.value)}
                />
            </div>
            <div className="product-input">
              <input
                type="text"
                placeholder="Enter product or service"
                value={productInput}
                onChange={(e) => setProductInput(e.target.value)}
              />
              <button onClick={handleAddProduct}>Add to List</button>
            </div>
            <ul>
              {products.map((product, index) => (
                <li key={index}>{product}</li>
              ))}
            </ul>
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Display added clients */}
      <div className="client-list" style={{backgroundColor: 'red', display: 'flex', height: '100%'}}>

        <div style={{width: '20%', backgroundColor: 'white', height: '100%'}}>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <h2>Client List</h2>
                <button onClick={() => setIsModalOpen(true)}>+</button>
            </div>
            <div>
                { clients.map((client, index) => {
                    return (
                        <a key={index} href='#' onClick={() => setSelectedCompany(clients.at(index))}><h3>{client.company}</h3></a>
                    );
                }) }
            </div>
                { clients.map((client, index) => {
                    // <a key={index} href='#' onClick={() => alert(clients.at(index))}><h3>{client.company}</h3></a>
                    <div key={index} className="client-card">
                        <a href='#' onClick={() => alert(client.company)}><h3>{client.company}</h3></a>
                    </div>
                }) }
        </div>

        <div style={{width: '80%', backgroundColor: 'green', height: '100%', display: 'flex', flexDirection: 'column'}}>
                { selectedCompany ? Object.entries(selectedCompany).map((e) => {
                    return (
                        <div>
                            <p>{e[0]}:</p>
                            <p>{e[1]}</p>
                        </div>
                    )
                }) : 'No client selected' }
        </div>

        {/* {clients.map((client, index) => (
          <div key={index} className="client-card">
            <a href='#' onClick={() => alert(client.company)}><h3>{client.company}</h3></a>
            <p>{client.companyInfo}</p>
            <ul>
              {client.products.map((product, idx) => (
                <li key={idx}>{product}</li>
              ))}
            </ul>
          </div>
        ))} */}
      </div>
    </div>
  );
}

export default App;
