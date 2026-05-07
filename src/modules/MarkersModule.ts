import { StateManager } from '../lib/StateManager';
import { AppState } from '../lib/StageManager';

/**
 * MarkersModule: Visualizes AirQo monitoring stations as interactive markers.
 * Displays station name and PM2.5 value on click.
 */
export class MarkersModule {
  private map: google.maps.Map;
  private markers: google.maps.Marker[] = [];
  private infoWindow: google.maps.InfoWindow | null = null;
  private stateManager: StateManager<AppState>;

  constructor(map: google.maps.Map, stateManager: StateManager<AppState>) {
    this.map = map;
    this.stateManager = stateManager;

    // Listen for state changes
    this.stateManager.subscribe((state) => {
      this.render(state.data);
    });
  }

  private render(data: any[]): void {
    console.log('MarkersModule: Updating markers...');
    
    // 1. Clear existing markers
    this.markers.forEach(marker => marker.setMap(null));
    this.markers = [];

    if (!this.infoWindow) {
      this.infoWindow = new google.maps.InfoWindow();
    }

    // 2. Create new markers
    data.forEach(point => {
      // Create a marker for each monitoring station
      const marker = new google.maps.Marker({
        position: { lat: point.lat, lng: point.lng },
        map: this.map,
        title: point.location,
        label: {
          text: Math.round(point.value).toString(),
          color: 'white',
          fontSize: '10px'
        },
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 12,
          fillColor: this.getColorForValue(point.value),
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor: '#FFFFFF',
        }
      });

      // Show details when the marker is clicked
      marker.addListener('click', () => {
        const content = `
          <div style="padding: 12px; min-width: 200px; font-family: sans-serif;">
            <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: #141414; text-transform: uppercase; letter-spacing: -0.02em;">
              ${point.location}
            </h3>
            <div style="display: flex; align-items: center; gap: 8px; border-top: 1px solid #eee; padding-top: 8px;">
              <span style="font-size: 10px; font-weight: bold; color: #666; font-family: monospace;">PM2.5:</span>
              <span style="font-size: 16px; font-weight: 700; color: ${this.getColorForValue(point.value)}; font-family: monospace;">
                ${point.value.toFixed(1)}
              </span>
              <span style="font-size: 10px; color: #999;">µg/m³</span>
            </div>
            <p style="margin: 8px 0 0 0; font-size: 10px; color: #666; font-style: italic;">
              AirQo Real-time Measurement
            </p>
          </div>
        `;
        this.infoWindow?.setContent(content);
        this.infoWindow?.open(this.map, marker);
      });

      this.markers.push(marker);
    });
  }

  /**
   * Returns a color based on PM2.5 levels (Common Air Quality Index colors)
   */
  private getColorForValue(value: number): string {
    if (value <= 12) return '#00E400'; // Good
    if (value <= 35.4) return '#FFFF00'; // Moderate
    if (value <= 55.4) return '#FF7E00'; // Unhealthy for Sensitive Groups
    if (value <= 150.4) return '#FF0000'; // Unhealthy
    if (value <= 250.4) return '#8F3F97'; // Very Unhealthy
    return '#7E0023'; // Hazardous
  }
}
