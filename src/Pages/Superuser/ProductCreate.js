import React, {useContext, useEffect, useState} from 'react';
import './Styles/productcreate.css';
import AuthContext from "../../Components/AuthProvider";
import axios from "axios";

const ProductCreationPage = () => {
    // Context Variables:
    const {BASE_URL} = useContext(AuthContext)

    // Stage Variables:
    const [productList, setProductList] = useState([]);
    const [productName, setProductName] = useState('');
    const [processId, setProcessId] = useState([]);
    const [start, setStart] = useState([false, false, false, false, false, false])
    const [end, setEnd] = useState([false, false, false, false, false, false])
    const [qa, setQa] = useState([false, false, false, false, false, false])
    const [rework, setRework] = useState([false, false, false, false, false, false])
    const [final, setFinal] = useState(['', '', '', '', '', ''])

    // Loads current Product List: [{ productName, processId }]
    async function refresh() {
        try {
            const response = await axios.get(BASE_URL + '/product/get/')
            setProductList(response.data)
        } catch (error) {
            console.error('Error', error)
        }
    }

    // Load the table once:
    useEffect(() => {
        refresh()
    }, [])

    // Sends productName and processId to the backend server: { productName, processId }
    const handleCreationSubmit = async (e) => {
        e.preventDefault();
        const data = {
            productName: productName,
            processId: processId,
            start: start,
            end: end,
            qa: qa,
            rework: rework,
            final: final
        };
        try {
            await axios.post(BASE_URL + '/product/set/', data)
            setProcessId([])
            setProductName('')
            setStart([false, false, false, false, false, false])
            setEnd([false, false, false, false, false, false])
            setQa([false, false, false, false, false, false])
            setRework([false, false, false, false, false, false])
            setFinal(['', '', '', '', '', ''])
            await refresh()
        } catch (error) {
            console.error(error)
            alert('Error creating product')
        }
    };

    // Sends the productName to be deleted: productName
    const handleDelete = async (productName) => {
        try {
            await axios.post(BASE_URL + '/product/delete/', productName)
            await refresh()
        } catch (error) {
            console.error('Error', error)
            alert('Error deleting the product')
        }
    };

    return (
        <div className="product-creation-container">
            <div className="product-table-container">
                <h2>Product List</h2>
                <table className="product-table">
                    <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Process ID</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {productList.map((product, index) => (
                        <tr key={index}>
                            <td>{product.productName}</td>
                            <td>{product.processId}</td>
                            <td>
                                <button
                                    className="delete-button"
                                    onClick={() => handleDelete(product.productName)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="product-form-container">
                <h2>Create Product</h2>
                <form onSubmit={handleCreationSubmit}>
                    <div className="form-row">
                        <label htmlFor="productName">Product Name:</label>
                        <input
                            type="text"
                            id="productName"
                            className="input-field"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-row">
                        <label htmlFor="processId">Process ID:(Stages seperated by hyphen)</label>
                        <input
                            type="text"
                            id="processId"
                            className="input-field"
                            value={processId.join('-')}
                            onChange={(e) => {setProcessId(e.target.value.toUpperCase().split('-'))}}
                            maxLength={29}
                            required
                        />
                    </div>

                    <div className="form-row">
                        <table className="product-table">
                            <thead>
                            <tr>
                                <th>Stage</th>
                                <th>Start</th>
                                <th>End</th>
                                <th>QA</th>
                                <th>Rework</th>
                                <th>Final</th>
                            </tr>
                            </thead>
                            <tbody>
                            {processId.map((stage, index) => (
                                <tr key={index}>
                                    <td>{stage}</td>
                                    <td><input
                                        type="checkbox"
                                        value={start[index]}
                                        onChange={(e) => {
                                            let newStart = start.slice()
                                            newStart[index] = e.target.checked
                                            setStart(newStart)
                                        }}
                                    /></td>
                                    <td><input
                                        type="checkbox"
                                        value={end[index]}
                                        onChange={(e) => {
                                            let newEnd = end.slice()
                                            newEnd[index] = e.target.checked
                                            setEnd(newEnd)
                                        }}
                                    /></td>
                                    <td><input
                                        type="checkbox"
                                        value={qa[index]}
                                        onChange={(e) => {
                                            let newQa = qa.slice()
                                            newQa[index] = e.target.checked
                                            setQa(newQa)
                                        }}
                                    /></td>
                                    <td><input
                                        type="checkbox"
                                        value={rework[index]}
                                        onChange={(e) => {
                                            let newRework = rework.slice()
                                            newRework[index] = e.target.checked
                                            setRework(newRework)
                                        }}
                                    /></td>
                                    <td><select
                                        name="final"
                                        id="final"
                                        value={final[index]}
                                        onChange={(e) => {
                                            let newFinal = final.slice()
                                            newFinal[index] = e.target.value
                                            setFinal(newFinal)
                                        }}
                                        required
                                    >
                                        <option value="">Select</option>
                                        <option value="start" disabled={!start[index]}>Start</option>
                                        <option value="end" disabled={!end[index]}>End</option>
                                        <option value="qa" disabled={!qa[index]}>QA</option>
                                        <option value="rework" disabled={!rework[index]}>Rework</option>
                                    </select></td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="form-row">
                        <button type="submit" className="create-button">
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductCreationPage;
