import React, { useState } from 'react'
import { DistanceMatrix } from './DistanceMatrix';

export const InputForm = () => {
    const [formData, setFormData] = useState({});
    const [showTable, setShowTable] = useState(false)

    const onChangeHandler = (e) => {
        e.preventDefault();

        setFormData({ ...formData, [e.target.name]: e.target.value })

    }

    return (
        <div>
            <div className="form-group my-4">
                <label >Origin 1</label>
                <input type="text" className="form-control" name="origin1" onChange={(onChangeHandler)} placeholder="Enter First Origin" />
            </div>
            <div className="form-group my-4">
                <label >Origin 2</label>
                <input type="text" className="form-control" name="origin2" onChange={(onChangeHandler)} placeholder="Enter Second Origin" />
            </div>
            <div className="form-group my-4">
                <label >Destination 3</label>
                <input type="text" className="form-control" name="dest1" onChange={(onChangeHandler)} placeholder="Enter First Destination" />
            </div>
            <div className="form-group my-4">
                <label >Destination 4</label>
                <input type="text" className="form-control" name="dest2" onChange={(onChangeHandler)} placeholder="Enter Second Destination" />
            </div>
            <button type="button" className="btn btn-primary" onClick={() => setShowTable(!showTable)} >Submit</button>

            {showTable && <DistanceMatrix formData={formData} />}


        </div>
    )
}
