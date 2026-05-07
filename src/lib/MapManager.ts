import { importLibrary, setOptions } from '@googlemaps/js-api-loader';

/**
 * MapManager: Responsible for loading the Google Maps SDK and 
 * maintaining the direct reference to the Map instance.
 * Updated to use the functional API as per @googlemaps/js-api-loader v1.17+
 */
export class MapManager {
  public map: google.maps.Map | null = null;

  constructor(apiKey: string) {
    setOptions({
      key: apiKey,
      v: 'weekly'
    });
  }

  async init(elementId: string, options: google.maps.MapOptions): Promise<google.maps.Map> {
    // Import the required libraries using the new functional API
    const [{ Map }] = await Promise.all([
      importLibrary('maps') as Promise<google.maps.MapsLibrary>,
      importLibrary('visualization') as Promise<google.maps.VisualizationLibrary>
    ]);

    const mapElement = document.getElementById(elementId);
    
    if (!mapElement) throw new Error(`Map container #${elementId} not found.`);
    
    this.map = new Map(mapElement, options);
    return this.map;
  }

  /**
   * Helper to create a single marker on the map.
   */
  createMarker(position: google.maps.LatLngLiteral, title: string): google.maps.Marker | null {
    if (!this.map) return null;
    return new google.maps.Marker({
      position,
      map: this.map,
      title
    });
  }
}
