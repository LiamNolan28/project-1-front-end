import { useState } from "react";
import axios from "axios";

export const TeamForm = ({setTeamList}) => {

    const [teamData, setTeamData] = useState({
        teamName: '',
        teamTeam:[null]
    });

    const handleClear = () => {
        setTeamData({
            playerName: '',
            teamTeam: [null]
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post('http://localhost:9000/teams', {
                name: teamData.teamName,
                team: teamData.teamTeam
            });
            
            setTeamList(teamList => [...teamList, res.data]);

            event.target.reset();
            handleClear();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="team-name">Team Name: </label>
                <input
                    id="team-name"
                    value={teamData.teamName}
                    onChange = {e => setTeamData({...teamData, teamName: e.target.value})}
                    placeholder="ex. Team Liam"
                />
            </div>
            <div>
                <label htmlFor="team-roster">Roster: </label>
                <input
                    id="team-roster"
                    value={teamData.teamTeam}
                    onChange = {e => setTeamData({...teamData, teamTeam: e.target.value})}
                />
            </div>
            <div>
                <button type="reset" onClick={handleClear}>Clear</button>
                <button>Submit</button>
            </div>
        </form>
    );
}