import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MatchList.css";

export default function MatchList() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"
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

  const handleCardClick = (match) => {
    setSelectedMatch(match);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedMatch(null);
  };

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
    <>
      <div className="match-list">
        <h2>Upcoming Matches</h2>
        <div className="matches">
          {matches.map(match => (
            <div
              className={`match-card-simple status-${match.status}`}
              key={match.id}
              onClick={() => handleCardClick(match)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleCardClick(match);
                }
              }}
            >
              <div className="card-header-simple">
                <div className="match-game-simple">{match.game}</div>
                <div className={`match-status-simple status-${match.status}`}>
                  {match.status === 'live' && '🔴'}
                  {match.status === 'scheduled' && '⏰'}
                  {match.status === 'ended' && '✅'}
                </div>
              </div>

              <div className="match-teams-simple">
                <div className="team-name">{match.teams[0]}</div>
                <div className="vs-simple">VS</div>
                <div className="team-name">{match.teams[1]}</div>
              </div>

              <div className="match-info-simple">
                <div className="tournament-simple">🏆 {match.tournament}</div>
                <div className="time-simple">🕒 {formatDateTime(match.startTime)}</div>
              </div>

              {match.winner && (
                <div className="winner-simple">
                  🏅 {match.winner}
                </div>
              )}

              <div className="click-hint">Click for details</div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedMatch && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selectedMatch.game} Match Details</h3>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>

            <div className="modal-body">
              <div className="modal-teams">
                <div className="modal-team">{selectedMatch.teams[0]}</div>
                <div className="modal-vs">VS</div>
                <div className="modal-team">{selectedMatch.teams[1]}</div>
              </div>

              <div className="modal-status-bar">
                <div className={`modal-status status-${selectedMatch.status}`}>
                  {selectedMatch.status.toUpperCase()}
                </div>
              </div>

              <div className="modal-details">
                <div className="detail-row">
                  <span className="detail-label">🏆 Tournament:</span>
                  <span className="detail-value">{selectedMatch.tournament}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">🎯 Stage:</span>
                  <span className="detail-value">{selectedMatch.stage}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">🕒 Time:</span>
                  <span className="detail-value">{formatDateTime(selectedMatch.startTime)}</span>
                </div>
              </div>

              {selectedMatch.matchDetails && (
                <div className="modal-details">
                  <div className="detail-row">
                    <span className="detail-label">🎮 Format:</span>
                    <span className="detail-value">{selectedMatch.matchDetails.format}</span>
                  </div>
                  {selectedMatch.matchDetails.mapPool && (
                    <div className="detail-row">
                      <span className="detail-label">🗺️ Map Pool:</span>
                      <span className="detail-value">{selectedMatch.matchDetails.mapPool.join(", ")}</span>
                    </div>
                  )}
                </div>
              )}

              {selectedMatch.score && typeof selectedMatch.score === 'object' && (
                <div className="modal-score">
                  <h4>Current Score</h4>
                  <div className="score-display">
                    {Object.entries(selectedMatch.score).map(([team, score], idx) => (
                      <div key={team} className="score-item">
                        <span className="score-team">{team}</span>
                        <span className="score-number">{score}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedMatch.mapScores && Array.isArray(selectedMatch.mapScores) && (
                <div className="modal-map-scores">
                  <h4>Map Scores</h4>
                  <div className="map-scores-grid">
                    {selectedMatch.mapScores.map((mapScore, idx) => (
                      <div key={idx} className="map-score-card">
                        <div className="map-name">{mapScore.map}</div>
                        <div className="map-score-values">
                          {Object.entries(mapScore.score).map(([team, score]) => (
                            <div key={team} className="map-team-score">
                              <span>{team}</span>
                              <span className="score-number">{score}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedMatch.currentMap && (
                <div className="modal-current-map">
                  <strong>Current Map: {selectedMatch.currentMap}</strong>
                </div>
              )}

              {selectedMatch.winner && (
                <div className="modal-winner">
                  🏅 Winner: <strong>{selectedMatch.winner}</strong>
                </div>
              )}
            </div>

            {selectedMatch.streamUrl && (
              <div className="modal-actions">
                <a
                  href={selectedMatch.streamUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="stream-button"
                >
                  🔴 Watch Live Stream
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
