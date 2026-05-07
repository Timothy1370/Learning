import { MapManager } from './MapManager';
import { StateManager } from './StateManager';
import { AirQualityPoint, fetchAirQoData } from '../services/aqService';
import { HeatmapModule } from '../modules/HeatmapModule';
import { MarkersModule } from '../modules/MarkersModule';

export interface AppState {
  data: AirQualityPoint[];
  loading: boolean;
}

export class StageManager {
  private mapManager: MapManager;
  private stateManager: StateManager<AppState>;
  private heatmapModule: HeatmapModule | null = null;
  private markersModule: MarkersModule | null = null;

  constructor(googleApiKey: string) {
    this.mapManager = new MapManager(googleApiKey);
    this.stateManager = new StateManager<AppState>({ data: [], loading: false });
  }

  async start() {
    // 1. Initialize Map
    const map = await this.mapManager.init('map-canvas', {
      center: { lat: 0.3476, lng: 32.5825 }, // Center on Kampala
      zoom: 11, // High resolution zoom for city view
      mapId: 'AIR_QUALITY_STATION_MAP',
      zoomControl: true,
      streetViewControl: true,
      mapTypeControl: true,
      fullscreenControl: true,
      gestureHandling: 'greedy'
    });

    // 2. Initialize Core Modules
    this.heatmapModule = new HeatmapModule(map, this.stateManager);
    this.markersModule = new MarkersModule(map, this.stateManager);

    // 3. Fetch Initial Data
    await this.refreshData();
  }

  async refreshData() {
    this.stateManager.setState({ loading: true });
    try {
      const data = await fetchAirQoData();
      this.stateManager.setState({ data, loading: false });
      console.log(`StageManager: Loaded ${data.length} AirQo measurement points.`);
    } catch (err) {
      console.error('StageManager Data Error:', err);
      this.stateManager.setState({ loading: false });
    }
  }

  getStateManager() {
    return this.stateManager;
  }
  
  getMap() {
    return this.mapManager.map;
  }
}
