// These components will be making separate API calls from the app
// component to serve specific data about our artist
import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import ButtonStyleContext from "./ButtonStyleContext";


function ArtistView() {
    const { id } = useParams()
    const [ artistData, setArtistData ] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const API_URL = `http://localhost:4000/album/${id}` 
        const fetchData = async () => {
            const response = await fetch(API_URL)
            const resData = await response.json()
            setArtistData(resData.results)
        }
        fetchData()
    }, [id])

    const justAlbums = artistData.filter(entry => entry.collectionType === 'Album')

    const renderAlbums = justAlbums.map((album, i) => {
        return (
            <div key={i}>
                <Link to={`/album/${album.collectionId}`}>
                    <p className="list_style">{album.collectionName}</p>
                </Link>
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

    const artist_style = {
        marginLeft:"10em",
        marginRight:"10em",
        fontSize: "3em",
        color:"red"
    }
    
    return (
        <div>
            {artistData.length > 0 ? <h2 style={artist_style}>{artistData[0].artistName}</h2> : <h2>Loading...</h2>}
            {navButtons()}
            {renderAlbums}
        </div>
    )
}

export default ArtistView

