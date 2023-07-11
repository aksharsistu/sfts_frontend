import React, {useState, useEffect, useContext} from 'react';
import './Styles/processcreate.css';
import AuthContext from "../../Components/AuthProvider";
import axios from "axios";

const ProductPage = () => {
    // Context Variables:
    const {BASE_URL} = useContext(AuthContext)

    // State Variables:
    const [processNo, setProcessNo] = useState(0)
    const [productList, setProductList] = useState([])
    const [processList, setProcessList] = useState([]);
    const [productName, setProductName] = useState('');
    const [maxQuantity, setMaxQuantity] = useState(0);
    const [startingSNo, setStartingSNo] = useState(0);

    // Run at first render:
    useEffect(() => {
        fetchProcessList();
        fetchProductList();
    }, []);

    // Obtain current set processes from backend:
    const fetchProcessList = async () => {
        try {
            const response = await axios.get(BASE_URL + '/process/get/')
            setProcessList(response.data)
        } catch (error) {
            console.error('Error fetching list:', error)
        }
    }

    // Obtain product list from the same link used in product creation page:
    const fetchProductList = async () => {
        try {
            const response = await axios.get(BASE_URL + '/product/get/')
            setProductList(response.data)
        } catch (error) {
            console.error('Error', error)
        }
    }

    // Sends processNo to be deleted:
    const handleDelete = async (processNo) => {
        try {
            await axios.post(BASE_URL + '/process/delete/', processNo)
            await fetchProcessList()
        } catch (error) {
            console.error('Error: ', error)
            alert('Error updating processes')
        }
    }

    // Sends data to backend to create a process:
    const handleProductSubmit = async (e) => {
        e.preventDefault();
        const data = {
            processNo: processNo,
            productName: productName,
            maxQuantity: maxQuantity,
            startingSNo: parseInt(startingSNo),
            endingSNo: parseInt(startingSNo) + parseInt(maxQuantity),
        }
        try {
            await axios.post(BASE_URL + '/process/set/', data)
            setProductName('')
            setMaxQuantity(0)
            await fetchProcessList()
        } catch (error) {
            console.error('Error creating process: ', error)
            alert('Error creating process')
        }
    };

    // The webpage:
    return (
        <div className="process-page-container">
            <div className="process-table-container">
                <h2>Current Process</h2>
                <table className="process-table">
                    <thead>
                    <tr>
                        <th>Process No</th>
                        <th>Product Name</th>
                        <th>Starting SNo</th>
                        <th>Max Quantity</th>
                        <th>Current Quantity</th>
                    </tr>
                    </thead>
                    <tbody>
                    {processList.map((process) => (
                        <tr key={process.processNo}>
                            <td>{process.processNo}</td>
                            <td>{process.productName}</td>
                            <td>{process.startingSNo}</td>
                            <td>{process.maxQuantity}</td>
                            <td>{process.currentQuantity}</td>
                            <td>
                                <button
                                    className="delete-button"
                                    onClick={() => handleDelete(process.processNo)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="process-form-container">
                <h2>Create New Process</h2>
                <form onSubmit={handleProductSubmit}>
                    <div className="process-form-column">
                        <label htmlFor="processNo"><strong>Process No.:</strong></label>
                        <input
                            type="number"
                            max={999999}
                            min={100000}
                            value={processNo}
                            onChange={(event) => {
                                setProcessNo(event.target.value)
                                setStartingSNo(parseInt(event.target.value + '000000'))
                            }}
                        />
                    </div>
                    <div className="process-form-column">
                        <label htmlFor="productName">Product Name:</label>
                        <select
                            id="productName"
                            className="process-input-field"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            required
                        >
                            <option value="">Select Product</option>
                            {productList.map((product, index) => (
                                <option value={product.productName} key={index}>{product.productName}</option>
                            ))}
                        </select>
                    </div>

                    <div className="process-form-column">
                        <label htmlFor="maxQuantity">Max Quantity:</label>
                        <input
                            type="number"
                            id="maxQuantity"
                            className="process-input-field"
                            value={maxQuantity}
                            onChange={(e) => setMaxQuantity(e.target.value)}
                            required
                        />
                    </div>

                    <div className="process-form-column">
                        <label htmlFor="startingSNo">Starting SNo:</label>
                        <input
                            type="number"
                            id="startingSNo"
                            className="process-input-field"
                            value={startingSNo}
                            disabled
                        />
                    </div>

                    <div className="process-form-column">
                        <label htmlFor="endingSNo">Ending SNo:</label>
                        <input
                            type="number"
                            id="endingSNo"
                            className="process-input-field"
                            value={parseInt(startingSNo) + parseInt(maxQuantity)}
                            disabled
                        />
                    </div>

                    <div className="process-form-column">
                        <button type="submit" className="process-submit-button">
                            Assign Process
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductPage;
