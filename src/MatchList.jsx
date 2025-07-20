import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MatchList.css";

export default function MatchList() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      axios.defaults.baseURL = "http://localhost:5105"
    axios.get("/api/v1/match/all")
      .then(response => {
        setMatches(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError("Error fetching matches");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="match-list"><h2>Upcoming Matches</h2><p>Loading...</p></div>;
  if (error) return <div className="match-list"><h2>Upcoming Matches</h2><p>{error}</p></div>;

  return (
    <div className="match-list">
      <h2>Upcoming Matches</h2>
      <div className="matches">
        {matches.map(match => (
          <div className="match-card" key={match.id}>
            <div className="teams">{match.teams.join(" vs ")}</div>
            <div className="time"><b>Start:</b> {new Date(match.startTime).toLocaleString()}</div>
            <div className="tournament"><b>Tournament:</b> {match.tournament}</div>
            <div className="stage"><b>Stage:</b> {match.stage}</div>
            <div className="game"><b>Game:</b> {match.game}</div>
            <div className="status"><b>Status:</b> {match.status}</div>
            {match.streamUrl && (
              <div className="stream"><b>Stream:</b> <a href={match.streamUrl} target="_blank" rel="noopener noreferrer">Watch</a></div>
            )}
            {match.matchDetails && (
              <div className="details">
                <b>Format:</b> {match.matchDetails.format}<br/>
                <b>Map Pool:</b> {match.matchDetails.mapPool && match.matchDetails.mapPool.join(", ")}
              </div>
            )}
            {match.score && typeof match.score === 'object' && (
              <div className="score">
                <b>Score:</b> {Object.entries(match.score).map(([team, score], idx) => (
                  <span key={team}>{team}: {score}{idx < Object.entries(match.score).length - 1 ? ' | ' : ''}</span>
                ))}
              </div>
            )}
            {match.mapScores && Array.isArray(match.mapScores) && (
              <div className="map-scores">
                <b>Map Scores:</b>
                <ul>
                  {match.mapScores.map((mapScore, idx) => (
                    <li key={idx}>
                      <b>{mapScore.map}:</b> {Object.entries(mapScore.score).map(([team, score], i) => (
                        <span key={team}>{team}: {score}{i < Object.entries(mapScore.score).length - 1 ? ' | ' : ''}</span>
                      ))}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {match.currentMap && <div className="current-map"><b>Current Map:</b> {match.currentMap}</div>}
            {match.winner && <div className="winner"><b>Winner:</b> {match.winner}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
