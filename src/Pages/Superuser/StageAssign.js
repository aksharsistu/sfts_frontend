import React, {useContext, useEffect, useState} from 'react';
import './Styles/stageassign.css';
import axios from "axios";
import AuthContext from "../../Components/AuthProvider";

const StageAllocationPage = () => {
    // Context Variables:
    const {BASE_URL} = useContext(AuthContext)

    // State Variables:
    const [stageList, setStageList] = useState([]);
    const [stageName, setStageName] = useState('');
    const [placeName, setPlaceName] = useState('')
    const [ipAddress, setIpAddress] = useState('');

    // Refresh the table with current data:
    async function refresh() {
        try {
            const response = await axios.get(BASE_URL + '/stage/list/')
            setStageList(response.data)
        } catch (error) {
            console.error('Error', error)
            alert('Error loading current data')
        }
    }

    // Load the table once:
    useEffect(() => {
        refresh()
    }, [])

    // Sends data to the backend server:
    const handleAllocationSubmit = async (e) => {
        e.preventDefault();
        const data = {
            stageName: stageName,
            placeName: placeName,
            ipAddress: ipAddress
        }
        try {
            await axios.post(BASE_URL + '/stage/set/', data)
            setStageName('')
            setPlaceName('')
            setIpAddress('')
            await refresh()
        } catch (error) {
            console.error('Error: ', error)
            alert('Error Allocating Stage to the IP specified')
        }
    };

    // Sends the IP Address to be deleted:
    const handleDelete = async (ipAddress) => {
        try {
            await axios.post(BASE_URL + '/stage/delete/', ipAddress)
            await refresh()
        } catch (error) {
            console.error('Error', error)
            alert('Error updating stage')
        }
    };

    return (
        <div className="stage-allocation-container">
            <div className="table-container">
                <h2>Stage Allocation</h2>
                <table className="stage-table">
                    <thead>
                    <tr>
                        <th>Stage Name</th>
                        <th>Place Name</th>
                        <th>IP Address</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {stageList.map((stage, index) => (
                        <tr key={index}>
                            <td>{stage.stageName}</td>
                            <td>{stage.placeName}</td>
                            <td>{stage.ipAddress}</td>
                            <td>
                                <button
                                    className="delete-button"
                                    onClick={() => handleDelete(stage.ipAddress)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="form-container-custom">
                <h2>Allocate Stage</h2>
                <form onSubmit={handleAllocationSubmit}>
                    <div className="form-row-stage">
                        <label htmlFor="stageName">Stage Name:</label>
                        <input
                            type="text"
                            id="stageName"
                            className="input-field-custom"
                            value={stageName}
                            onChange={(e) => setStageName(e.target.value.toUpperCase())}
                            maxLength={4}
                            required
                        />
                    </div>

                    <div className="form-row-custom">
                        <label htmlFor="placeName">Place Name:</label>
                        <select
                            name="placeName"
                            id="placeName"
                            value={placeName}
                            onChange={e => setPlaceName(e.target.value)}
                            className="input-field-select"
                            required
                        >
                            <option value="">Select Place</option>
                            <option value="start">Start</option>
                            <option value="end">End</option>
                            <option value="qa">QA</option>
                            <option value="rework">Rework</option>
                        </select>
                    </div>

                    <div className="form-row-custom">
                        <label htmlFor="ipAddress">IP Address:</label>
                        <input
                            type="text"
                            id="ipAddress"
                            className="input-field-custom"
                            value={ipAddress}
                            onChange={(e) => setIpAddress(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-row-custom">
                        <button type="submit" className="allocate-button-custom">
                            Allocate
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StageAllocationPage;
