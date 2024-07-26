import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ApprovalList = () => {
    const [approvals, setApprovals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApprovals = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/approvals');
                console.log('API Response:', response.data); // Log API response
                setApprovals(response.data);
            } catch (error) {
                setError('There was an error fetching the approvals');
            } finally {
                setLoading(false);
            }
        };

        fetchApprovals();
    }, []);

    const updateApprovalStatus = async (id) => {
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/approvals/${id}/status`);
            console.log('Update Response:', response.data); // Log update response
            setApprovals(prevApprovals =>
                prevApprovals.map(approval =>
                    approval.id === id ? { ...approval, status: 1 } : approval
                )
            );
        } catch (error) {
            console.error('There was an error updating the approval status', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Approval List</h2>
            {approvals.length > 0 ? (
                <table className="table table-striped table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th>ID</th>
                            <th>Public Key</th>
                            <th>Consent URL</th>
                            <th>Status</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {approvals.map(approval => (
                            <tr key={approval.id}>
                                <td>{approval.id}</td>
                                <td>{approval.public_key}</td>
                                <td>
                                    <a href={approval.consent_url} target="_blank" rel="noopener noreferrer">
                                        {approval.consent_url}
                                    </a>
                                </td>
                                <td>{approval.status == 1 ? 'Approved' : 'Pending'}</td>
                                <td>{new Date(approval.created_at).toLocaleString()}</td>
                                <td>{new Date(approval.updated_at).toLocaleString()}</td>
                                <td>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => updateApprovalStatus(approval.id)}
                                        disabled={approval.status === 1}
                                    >
                                        {approval.status == 1 ? 'Approved' : 'Pending'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No approvals found</p>
            )}
        </div>
    );
};

export default ApprovalList;
