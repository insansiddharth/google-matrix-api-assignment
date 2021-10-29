import React, { useState, useEffect } from 'react'

export const DistanceMatrix = ({formData}) => {

    const apiKey = "API-Key"
    const [response, setResponse] = useState([])

    const getLatLong = async (location) => {
        const geoCodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${apiKey}`

        let cordinates = {};
        await fetch(geoCodeURL).then((res) => res.json()).then((res) => {
            cordinates = res.results[0].geometry.location;
            // console.log(cordinates);
        })
        return cordinates;
    }





    useEffect(() => {
        const getDistanceMatrix = async () => {
            console.log("props",formData)
            let origin1 = await getLatLong(formData.origin1); //{ lat: 19.0759837, lng: 72.8776559 } //await getLatLong("mumbai");
            let origin2 =  await getLatLong(formData.origin2);//{ lat: 12.9715987, lng: 77.5945627 } //            await getLatLong("bangalore");
            let dest1 = await getLatLong(formData.dest1);   //{ lat: 22.572646, lng: 88.36389500000001 } //await getLatLong("kolkata");
            let dest2 =  await getLatLong(formData.dest2); //{ lat: 13.0826802, lng: 80.2707184 } //await getLatLong("chennai");

            const url = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${dest1.lat},${dest1.lng}|${dest2.lat},${dest2.lng}&origins=${origin1.lat},${origin1.lng}|${origin2.lat},${origin2.lng}&key=${apiKey}`

            console.log("url", url)
            const result = await fetch(url) //.then((res)=>res.json()).then((res)=>{console.log(res); setResponse(res.rows);});
            const resp = await result.json()
            // setResponse(resp.rows);
            const tempArray = [...(resp.rows[0].elements), ...(resp.rows[1].elements)]
            // resp1 = tempArray;
            setResponse(tempArray);


            console.log("response",tempArray);
        }
        getDistanceMatrix();

        // console.log(tempArray);

    }, [])


    return (
        <div>
            <table className="table table-dark my-4">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Origin</th>
                        <th scope="col">Destination</th>
                        <th scope="col">Distance</th>
                        <th scope="col">Time</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>{formData.origin1}</td>
                        <td>{formData.dest1}</td>
                        <td>{response[0]?.distance.text}</td>
                        <td>{response[0]?.duration.text}</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>{formData.origin1}</td>
                        <td>{formData.dest2}</td>
                        <td>{response[1]?.distance.text}</td>
                        <td>{response[1]?.duration.text}</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>{formData.origin2}</td>
                        <td>{formData.dest1}</td>
                        <td>{response[2]?.distance.text}</td>
                        <td>{response[2]?.duration.text}</td>
                    </tr>
                    <tr>
                        <th scope="row">4</th>
                        <td>{formData.origin2}</td>
                        <td>{formData.dest2}</td>
                        <td>{response[3]?.distance.text}</td>
                        <td>{response[3]?.duration.text}</td>
                    </tr>
                </tbody>
            </table>
        </div>

    )
}
