import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import './Styles/home.css';
import AuthContext from "../Components/AuthProvider";

const Home = () => {
    // Context Variables:
    const {BASE_URL, username} = useContext(AuthContext);

    // State Variables:
    const [message, setMessage] = useState('');
    const [options, setOptions] = useState([]);
    const [processNo, setProcessNo] = useState('');
    const [productName, setProductName] = useState('');
    const [stageName, setStageName] = useState('');
    const [placeName, setPlaceName] = useState('');
    const [barcode, setBarcode] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [stageQuantity, setStageQuantity] = useState(0)
    const [override, setOverride] = useState(false);
    const [barcodeDisable, setBarcodeDisable] = useState(false);
    let descriptionDisable = !(stageName === 'RWRK' || stageName.includes('TS') || stageName.includes('PCK') || placeName === 'rework');

    // To run once:
    useEffect(() => {
        fetchStage();
        fetchOptions();
    }, []);

    // To run on change of processNo:
    useEffect(() => {
        fetchData();
    }, [processNo, options]);

    // To run on selection of option:
    useEffect(() => {
        fetchQuantity();
        fetchBarcodeDisable();
    }, [productName])

    // useEffect(()=> {
    //     fetchQuantity();
    // }, [processNo, productName])


    // Get Stage and Place info:
    const fetchStage = async () => {
        try {
            const response = await axios.get(BASE_URL + '/stage/get/')
            const {stageName, placeName} = response.data
            setStageName(stageName)
            setPlaceName(placeName)
        } catch (error) {
            console.error('Error fetching data from the server:', error)
        }
    };

    // Get Existing Process Numbers:
    const fetchOptions = async () => {
        try {
            const response = await axios.get(BASE_URL + '/process/get/')
            setOptions(response.data)
        } catch (error) {
            console.error('Error fetching data from the server:', error)
        }
    };

    // Get data related to processNo:
    const fetchData = () => {
        // Fetching product name and quantity:
        try {
            let processes = options.map((process) => (process.processNo))
            const {productName, currentQuantity} = options[processes.findIndex((process) => {
                return process === parseInt(processNo)
            })];
            setProductName(productName);
            setQuantity(currentQuantity);
        } catch (error) {
            console.error('Error' + error)
            setProductName('');
            setQuantity(0);
        }
    };

    const fetchQuantity = async () => {
        // Fetching stage specific quantity
        try{
            const response = await axios.post(BASE_URL + '/process/quantity/',
                {processNo: processNo, productName: productName, stageName: stageName})
            setStageQuantity(response.data)
        } catch (error) {
            console.error('Error', error)
        }
    }

    const fetchBarcodeDisable = async () => {
        // Fetching barcode field validity
        const data = {
            productName: productName,
            stageName: stageName,
            placeName: placeName
        }
        try {
            const response = await axios.post(BASE_URL + '/barcode/check/', data)
            const {disable} = response.data
            setBarcodeDisable(disable)
        } catch (error) {
            console.error('Error validating barcode field', error)
        }
    }

    // Send data to backend for validation and logging:
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            processNo: processNo,
            productName: productName,
            stageName: stageName,
            placeName: placeName,
            barcode: barcode,
            description: description,
            username: username,
            override: override,
        }
        try {
            const response = await axios.post(BASE_URL + '/barcode/log/', data)
            setMessage(response.data)
            setBarcode('')
            setDescription('')
            await fetchQuantity()
            await fetchOptions()
        } catch (error) {
            console.error(error)
            alert('Error sending data to the server')
        }
    };

    // The webpage:
    return (
        <div className="container">
            <h1 className="home">Product Barcode Form</h1>
            <span className="message">{message}</span>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <label htmlFor="productNo">Process No.:</label>
                    <select
                        id="productNo"
                        value={processNo}
                        onChange={(e) => setProcessNo(e.target.value)}
                        required
                    >
                        <option value="">Select a process</option>
                        {options.map((option, index) => (
                            <option value={option.processNo} key={index}>{option.processNo}</option>
                            ))}
                    </select>
                </div>

                <div className="form-row">
                    <label htmlFor="productName">Product Name:</label>
                    <input
                        type="text"
                        id="productName"
                        value={productName}
                        disabled
                    />
                </div>

                <div className="form-row">
                    <label htmlFor="stageName">Stage:</label>
                    <input
                        type="text"
                        id="stageName"
                        value={stageName + ' - ' + placeName}
                        disabled
                    />
                </div>

                <div className="form-row">
                    <label htmlFor="barcode">Barcode:</label>
                    <input
                        type="number"
                        id="barcode"
                        value={barcode}
                        maxLength={12}
                        onChange={(e) => setBarcode(e.target.value)}
                        disabled={barcodeDisable}
                        required
                    />
                </div>

                <div className="form-row">
                    <label htmlFor="description">Description:</label>
                    <input
                        type="number"
                        id="description"
                        value={description}
                        maxLength={13}
                        onChange={(e) => setDescription(e.target.value)}
                        disabled={descriptionDisable || barcodeDisable || !override}
                        required={!(descriptionDisable || barcodeDisable || !override)}
                    />
                </div>

                <div className="form-row">
                    <label>
                        <input
                            type="checkbox"
                            checked={override}
                            onChange={(e) => setOverride(e.target.checked)}
                            disabled={!(placeName === 'qa' || placeName ==='end')}
                        />
                        Reject (for QA and Inspection-End)
                    </label>
                </div>

                <div className="form-row-submit">
                    <button type="submit">Submit</button>
                    <span><strong>Quantity: </strong>{quantity}</span>
                    <span><strong>Stage Quantity: </strong>{stageQuantity}</span>
                </div>
            </form>
        </div>
    );
};

export default Home;
