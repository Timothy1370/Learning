import { StateManager } from '../lib/StateManager';
import { AppState } from '../lib/StageManager';

/**
 * HeatmapModule: A feature module from the "Google Maps Workshop" architecture.
 * It strictly handles the visualization of PM2.5 values as a heatmap.
 */
export class HeatmapModule {
  private map: google.maps.Map;
  private heatmap: google.maps.visualization.HeatmapLayer | null = null;
  private stateManager: StateManager<AppState>;

  constructor(map: google.maps.Map, stateManager: StateManager<AppState>) {
    this.map = map;
    this.stateManager = stateManager;

    // Listen for state changes (e.g., when new data is fetched)
    this.stateManager.subscribe((state) => {
      this.render(state.data);
    });
  }

  private render(data: any[]): void {
    console.log('HeatmapModule: Updating weights...');
    
    // 1. Clear existing heatmap
    if (this.heatmap) {
      this.heatmap.setMap(null);
    }

    // 2. Prepare weighted points for Google Maps Heatmap Layer
    // We Map our data to WeightedLocation objects
    const heatmapData = data.map(point => {
      return {
        location: new google.maps.LatLng(point.lat, point.lng),
        weight: point.value // PM2.5 value used as intensity
      };
    });

    // 3. Create and mount new layer
    this.heatmap = new google.maps.visualization.HeatmapLayer({
      data: heatmapData,
      map: this.map,
      radius: 30, // Visual size of the points
      opacity: 0.8,
      gradient: [
        'rgba(0, 255, 255, 0)',
        'rgba(0, 255, 255, 1)',
        'rgba(0, 191, 255, 1)',
        'rgba(0, 127, 255, 1)',
        'rgba(0, 63, 255, 1)',
        'rgba(0, 0, 255, 1)',
        'rgba(0, 0, 223, 1)',
        'rgba(0, 0, 191, 1)',
        'rgba(0, 0, 159, 1)',
        'rgba(0, 0, 127, 1)',
        'rgba(63, 0, 91, 1)',
        'rgba(127, 0, 63, 1)',
        'rgba(191, 0, 31, 1)',
        'rgba(255, 0, 0, 1)'
      ]
    });
  }
}
