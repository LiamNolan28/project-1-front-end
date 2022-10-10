import { useState, useEffect } from 'react';
import axios from 'axios';
import { TeamForm } from '../Form/TeamForm.jsx'

const Team = ({team: {_id, name, team}}) => {

    const [isEdit, toggleIsEdit] = useState(false);

    const deleteTeam = async (event) => {
        try {
            await axios.delete('http://localhost:9000/teams/'+_id);
            console.log('Team Deleted');
            // FIXME: Update page after deleting player
        } catch (err) {
            console.log(err);
        }
    }

    if (!isEdit) {
        return (
            <tr className="row-container">
                <td>{name}</td>
                <td>{team.name}</td>
                <td><button onClick={() => {toggleIsEdit(true)}}>Edit</button></td>
                <td><button onClick={deleteTeam}>Delete</button></td>
             </tr>
        );
    } else {
        return (
            <h1>EDIT MODE!</h1>
        );
    }
}

export const TeamList = () => {

    const [teamList, setTeamList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:9000/teams')
            .then(res => { setTeamList(res.data); console.log(res.data) })
            .catch(err => console.error(err));
    }, []);

    return (
        <>
            <TeamForm setTeamList={setTeamList}/>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Team</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {teamList.map(team => <Team key={team._id} team={team} />)}
                </tbody>
            </table>
        </>
    );
}