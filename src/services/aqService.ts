export interface AirQualityPoint {
  lat: number;
  lng: number;
  value: number;
  location: string;
}

/**
 * Fetches the list of available grids from AirQo.
 */
export async function fetchAirQoGrids(): Promise<any[]> {
  try {
    const url = '/api/airqo/grids';
    const response = await fetch(url);
    if (!response.ok) return [];
    
    const json = await response.json();
    return json.grids || [];
  } catch (error) {
    console.error('Failed to fetch AirQo grids:', error);
    return [];
  }
}

/**
 * AirQo Data Implementation
 */
export async function fetchAirQoData(): Promise<AirQualityPoint[]> {
  try {
    // Call our local server proxy to avoid CORS and hide the API key
    const url = '/api/airqo/recent';
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      console.warn(`AirQo Network Alert: ${response.status}`);
      return [];
    }

    const json = await response.json();
    
    // Developer debug log to inspect structural changes in Grid response
    console.log('AirQo Service: Raw Response Count:', json.measurements?.length);

    // Safety check on response structure
    if (!json.success || !Array.isArray(json.measurements)) {
      console.error('AirQo response structure unrecognized', json);
      return [];
    }

    // Normalizing PM2.5 values (0-100 scale) for map weights
    return json.measurements
      .filter((m: any) => (m.siteDetails?.latitude || m.location?.latitude) && (m.siteDetails?.longitude || m.location?.longitude))
      .map((m: any) => {
        const rawValue = m.pm2_5?.value || m.value || 0;
        const lat = m.siteDetails?.latitude || m.location?.latitude;
        const lng = m.siteDetails?.longitude || m.location?.longitude;
        
        return {
          lat,
          lng,
          value: Math.min(Math.max(rawValue, 0), 100),
          location: m.siteDetails?.description || m.siteDetails?.name || m.site?.name || 'AirQo Monitor'
        };
      });
  } catch (error) {
    console.error('AirQo Integration Failed:', error);
    return [];
  }
}
