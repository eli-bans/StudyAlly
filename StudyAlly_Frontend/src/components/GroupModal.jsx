import React from 'react';

const GroupModal = ({ isOpen, setOpen, groupDetails }) => {
    const handleCloseClick = () => {
        setOpen(false);
    }

    return (
        <>
            {isOpen && (
                <div className="overlay">
                    <div className="modal">
                        <p className="close-btn" onClick={handleCloseClick}>X</p>
                        <h2>Group Details</h2>
                        {groupDetails && (
                            <>
                                <p>Group Name: {groupDetails.name}</p>
                                <p>Group Major: {groupDetails.major}</p>
                                <p>Group Creator: {groupDetails.creator}</p>
                               
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default GroupModal;