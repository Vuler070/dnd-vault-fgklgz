
import { Player } from '@/types/Player';
import { samplePlayers } from '@/data/samplePlayers';

class PlayerManager {
  private players: Player[] = [...samplePlayers];

  getAllPlayers(): Player[] {
    return this.players;
  }

  getPlayerById(id: string): Player | undefined {
    return this.players.find(player => player.id === id);
  }

  addPlayer(player: Player): void {
    this.players.push(player);
    console.log('Player added:', player.name);
  }

  updatePlayer(id: string, updatedPlayer: Partial<Player>): boolean {
    const index = this.players.findIndex(player => player.id === id);
    if (index !== -1) {
      this.players[index] = { ...this.players[index], ...updatedPlayer };
      console.log('Player updated:', this.players[index].name);
      return true;
    }
    return false;
  }

  deletePlayer(id: string): boolean {
    const index = this.players.findIndex(player => player.id === id);
    if (index !== -1) {
      const deletedPlayer = this.players.splice(index, 1)[0];
      console.log('Player deleted:', deletedPlayer.name);
      return true;
    }
    return false;
  }

  getPlayerCount(): number {
    return this.players.length;
  }
}

export const playerManager = new PlayerManager();
