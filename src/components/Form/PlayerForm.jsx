import { useState } from "react";
import axios from "axios";

const playerPositions = [
    <option key="default">Select Position</option>,
    <option key="QB">QB</option>,
    <option key="RB">RB</option>,
    <option key="WR">WR</option>,
    <option key="TE">TE</option>,
    <option key="K">K</option>
]

export const PlayerForm = ({setPlayerList}) => {

    const [playerData, setPlayerData] = useState({
        playerName: '',
        playerTeam: '',
        playerPosition: null
    });

    const handleClear = () => {
        setPlayerData({
            playerName: '',
            playerTeam: '',
            playerPosition: null
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post('http://localhost:9000/players', {
                name: playerData.playerName,
                team: playerData.playerTeam,
                position: playerData.playerPosition
            });
            
            setPlayerList(playerList => [...playerList, res.data]);

            event.target.reset();
            handleClear();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="player-name">Player Name: </label>
                <input
                    id="player-name"
                    value={playerData.playerName}
                    onChange = {e => setPlayerData({...playerData, playerName: e.target.value})}
                    placeholder="ex. Tom Brady"
                />
            </div>
            <div>
                <label htmlFor="player-team">Player Team: </label>
                <input
                    id="player-team"
                    value={playerData.playerTeam}
                    onChange = {e => setPlayerData({...playerData, playerTeam: e.target.value})}
                    placeholder="ex. Dallas Cowboys"
                />
            </div>
            <div>
                <label htmlFor="player-position">Player Position: </label>
                <select id="player-position" onChange={e => setPlayerData({...playerData, playerPosition: e.target.value})}>
                    {playerPositions}
                </select>
            </div>
            <div>
                <button type="reset" onClick={handleClear}>Clear</button>
                <button>Submit</button>
            </div>
        </form>
    );
}