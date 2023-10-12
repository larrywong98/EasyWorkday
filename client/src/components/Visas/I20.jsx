import React from 'react'
import HRFeedback from './HRFeedback';

const I20 = (status) => {
    const I20Receipt = () => {
        if (status === "pending") {
            return <p>Waiting for HR to approve your I-20</p>;
        } else if (status === "approved") {
            return <p>All documents have been approved</p>;
        } else if (status === "rejected") {
            return <HRFeedback />;
        }
    }
    return (
        <section>I20Receipt: {I20Receipt}</section>
    )
}

export default I20