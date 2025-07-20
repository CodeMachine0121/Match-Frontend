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

  if (loading) {
    return (
      <div className="match-list">
        <h2>Upcoming Matches</h2>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <div className="loading-text">Loading matches...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="match-list">
        <h2>Upcoming Matches</h2>
        <div className="error-container">
          <div>⚠️ {error}</div>
        </div>
      </div>
    );
  }

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="match-list">
      <h2>Upcoming Matches</h2>
      <div className="matches">
        {matches.map(match => (
          <div className={`match-card status-${match.status}`} key={match.id}>
            <div className="match-header">
              <div className="match-game">{match.game}</div>
              <div className={`match-status status-${match.status}`}>
                {match.status.toUpperCase()}
              </div>
            </div>

            <div className="match-teams">
              <div className="match-team">{match.teams[0]}</div>
              <div className="match-vs">VS</div>
              <div className="match-team">{match.teams[1]}</div>
            </div>

            <div className="match-details">
              <div className="match-detail-item">
                <div className="match-detail-icon">🏆</div>
                <div className="match-detail-label">Tournament</div>
                <div className="match-detail-value">{match.tournament}</div>
              </div>
              <div className="match-detail-item">
                <div className="match-detail-icon">🎯</div>
                <div className="match-detail-label">Stage</div>
                <div className="match-detail-value">{match.stage}</div>
              </div>
              <div className="match-detail-item">
                <div className="match-detail-icon">🕒</div>
                <div className="match-detail-label">Time</div>
                <div className="match-detail-value">{formatDateTime(match.startTime)}</div>
              </div>
            </div>

            {match.matchDetails && (
              <div className="match-details">
                <div className="match-detail-item">
                  <div className="match-detail-icon">🎮</div>
                  <div className="match-detail-label">Format</div>
                  <div className="match-detail-value">{match.matchDetails.format}</div>
                </div>
                {match.matchDetails.mapPool && (
                  <div className="match-detail-item">
                    <div className="match-detail-icon">🗺️</div>
                    <div className="match-detail-label">Maps</div>
                    <div className="match-detail-value">{match.matchDetails.mapPool.join(", ")}</div>
                  </div>
                )}
              </div>
            )}

            {match.score && typeof match.score === 'object' && (
              <div className="match-score">
                <h4>Current Score</h4>
                <div className="score-display">
                  {Object.entries(match.score).map(([team, score], idx) => (
                    <span key={team}>
                      {team}: <span className="score-number">{score}</span>
                      {idx < Object.entries(match.score).length - 1 ? ' | ' : ''}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {match.mapScores && Array.isArray(match.mapScores) && (
              <div className="map-scores">
                <h4>Map Scores</h4>
                <ul className="map-scores-list">
                  {match.mapScores.map((mapScore, idx) => (
                    <li key={idx} className="map-score-item">
                      <span className="map-name">{mapScore.map}</span>
                      <div className="map-score-values">
                        {Object.entries(mapScore.score).map(([team, score], i) => (
                          <span key={team}>
                            {team}: <span className="score-number">{score}</span>
                            {i < Object.entries(mapScore.score).length - 1 ? ' | ' : ''}
                          </span>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {match.currentMap && (
              <div className="current-map">
                Current Map: <strong>{match.currentMap}</strong>
              </div>
            )}

            {match.winner && (
              <div className="match-winner">
                <div className="winner-text">🏅 Winner: {match.winner}</div>
              </div>
            )}

            {match.streamUrl && (
              <div className="match-actions">
                <a
                  href={match.streamUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="stream-button"
                >
                  🔴 Watch Live
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
