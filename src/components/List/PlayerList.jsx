import { useState, useEffect } from 'react';
import axios from 'axios';
import { PlayerForm } from '../Form/PlayerForm.jsx'

const playerPositions = [
    <option key="default">Select Position</option>,
    <option key="QB">QB</option>,
    <option key="RB">RB</option>,
    <option key="WR">WR</option>,
    <option key="TE">TE</option>,
    <option key="K">K</option>
]

const Player = ({player: {_id, name, team, position}}) => {

    const [playerData, setPlayerData] = useState({
        playerName: '',
        playerTeam: '',
        playerPosition: null
    });

    const [isEdit, toggleIsEdit] = useState(false);

    const deletePlayer = async (event) => {
        try {
            await axios.delete('http://localhost:9000/players/'+_id);
            console.log('Player Deleted');
            // FIXME: Update page after deleting player
        } catch (err) {
            console.log(err);
        }
    }

    const handleUpdate = async (event) => {
        try {
            await axios.put('http://localhost:9000/players/'+_id, {
                name: playerData.playerName,
                team: playerData.playerTeam,
                position: playerData.playerPosition
            });
            console.log('Player Updated');
            toggleIsEdit(false);
        } catch (err) {
            console.log(err);
        }
    }

    if (!isEdit) {
        return (
            <tr className="row-container">
                <td>{name}</td>
                <td>{team}</td>
                <td>{position}</td>
                <td><button onClick={() => {toggleIsEdit(true)}}>Edit</button></td>
                <td><button onClick={deletePlayer}>Delete</button></td>
            </tr>
        );
    } else {
        return (
            <tr>
                <td>
                    <form>
                        <input
                            id="player-name"
                            value={playerData.playerName}
                            onChange = {e => setPlayerData({...playerData, playerName: e.target.value})}
                            placeholder="ex. Tom Brady"
                        />
                    </form>
                </td>
                <td>
                    <form>
                        <input 
                            id="player-team"
                            value={playerData.playerTeam}
                            onChange = {e => setPlayerData({...playerData, playerTeam: e.target.value})}
                            placeholder="ex. Dallas Cowboys"
                        />
                    </form>
                </td>
                <td>
                    <form>
                        <select id="player-position" onChange={e => setPlayerData({...playerData, playerPosition: e.target.value})}>
                        {playerPositions}
                        </select>
                    </form>
                </td>
                <td><button onClick={handleUpdate}>Submit</button></td>
                <td><button onClick={() => {toggleIsEdit(false)}}>Cancel</button></td>
            </tr>
        );
    }
}

export const PlayerList = () => {

    const [playerList, setPlayerList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:9000/players')
            .then(res => { setPlayerList(res.data); console.log(res.data) })
            .catch(err => console.error(err));
    }, []);

    return (
        <>
            <PlayerForm setPlayerList={setPlayerList}/>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Team</th>
                        <th>Position</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {playerList.map(player => <Player key={player._id} player={player} />)}
                </tbody>
            </table>
        </>
    );
}