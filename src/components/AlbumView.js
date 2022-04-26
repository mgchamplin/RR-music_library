// These components will be making separate API calls from the app
// component to serve specific data about a given album
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ButtonStyleContext from "./ButtonStyleContext";

function AlbumView() {
    const navigate = useNavigate();
    const { id } = useParams()
    const [ albumData, setAlbumData ] = useState([])

    useEffect(() => {
        const API_URL = `http://localhost:4000/song/${id}`
        const fetchData = async () => {
            const response = await fetch(API_URL)
            const resData = await response.json()
            setAlbumData(resData.results)
        }
        fetchData()
    }, [id])

    const justSongs = albumData.filter(entry => entry.wrapperType === 'track')

    const renderSongs = justSongs.map((song, i) => {
        return (
            <div key={i}>
                <p className="list_style">{song.trackName}</p>
            </div>
        )
    })

    const buttonStyling = React.useContext(ButtonStyleContext)

    const navButtons = () => {
        return(
            <div>
                <button style={buttonStyling} onClick={() => navigate(-1)}>Back</button>
                <button style={buttonStyling} onClick={() => navigate('/')}>Home</button>
            </div>
        )
    }

    return (
        <div>
            {navButtons()}
            {renderSongs}
        </div>
    )
}


export default AlbumView

