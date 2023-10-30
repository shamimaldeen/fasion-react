import React from 'react';

const NoDataFound = () => {
    return (
        <div>
            <div className={'no-data-found-container'} style={{textAlign:"center", width:"100%", marginLeft:"80%"}}>
                <div className={'message text-danger mt-4'} >
                    <h4>No Data Found !</h4>
                </div>

            </div>
        </div>
    );
};

export default NoDataFound;