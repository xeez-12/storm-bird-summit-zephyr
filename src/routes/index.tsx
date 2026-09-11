import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { RevenueChip } from "@/components/revenue-chip";
import { SatelliteMap } from "@/components/satellite-map";
import { savePlayerUsername } from "@/lib/game-state";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const [username, setUsername] = useState("");
  const [savedUsername, setSavedUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const submitUsername = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUsernameError("");
    try {
      const result = await savePlayerUsername({ data: username });
      setSavedUsername(result.username);
    } catch (error) {
      setUsernameError(error instanceof Error ? error.message : "Unable to save username.");
    }
  };
  return (
    <main className="map-stage">
      <h1 className="sr-only">Meridian logistics manager</h1>
      <SatelliteMap />
      <RevenueChip />
      <header className="ops-brand" aria-label="Meridian Logistics Manager">
        <span className="ops-brand__mark">M</span>
        <span><strong>MERIDIAN</strong><small>LOGISTICS MANAGER</small></span>
      </header>
      <form className="player-identity" onSubmit={submitUsername} aria-label="Player identity">
        <label htmlFor="player-username">PLAYER</label>
        <input id="player-username" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="username" maxLength={24} />
        <button type="submit">{savedUsername || "SAVE"}</button>
        {usernameError ? <small role="alert">{usernameError}</small> : null}
      </form>
      <div className="map-legend" aria-label="Map legend"><span><i className="legend-dot legend-dot--europe" />EUROPE</span><span><i className="legend-dot legend-dot--russia" />RUSSIA</span><span><i className="legend-dot legend-dot--china" />CHINA</span></div>
    </main>
  );
}
