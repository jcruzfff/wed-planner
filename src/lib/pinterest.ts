// Pinterest API Client
// Uses a single account's access token for all searches

const PINTEREST_API_BASE = "https://api.pinterest.com/v5";

export interface PinterestPin {
  id: string;
  title: string | null;
  description: string | null;
  link: string | null;
  media: {
    media_type: string;
    images: {
      "150x150"?: { url: string; width: number; height: number };
      "400x300"?: { url: string; width: number; height: number };
      "600x"?: { url: string; width: number; height: number };
      "1200x"?: { url: string; width: number; height: number };
      originals?: { url: string; width: number; height: number };
    };
  };
  dominant_color: string | null;
}

export interface PinterestSearchResponse {
  items: PinterestPin[];
  bookmark: string | null;
}

export async function searchPinterestPins(
  query: string,
  bookmark?: string
): Promise<PinterestSearchResponse> {
  const accessToken = process.env.PINTEREST_ACCESS_TOKEN;
  
  if (!accessToken) {
    throw new Error("Pinterest access token not configured");
  }

  const params = new URLSearchParams({
    query,
    page_size: "25",
  });
  
  if (bookmark) {
    params.append("bookmark", bookmark);
  }

  const response = await fetch(
    `${PINTEREST_API_BASE}/search/pins?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    }
  );

  if (!response.ok) {
    const error = await response.text();
    console.error("Pinterest API error:", error);
    throw new Error(`Pinterest API error: ${response.status}`);
  }

  return response.json();
}

// Get image URL at preferred size
export function getPinImageUrl(pin: PinterestPin, size: "small" | "medium" | "large" = "medium"): string {
  const images = pin.media?.images;
  if (!images) return "";
  
  switch (size) {
    case "small":
      return images["150x150"]?.url || images["400x300"]?.url || "";
    case "medium":
      return images["400x300"]?.url || images["600x"]?.url || "";
    case "large":
      return images["600x"]?.url || images["1200x"]?.url || images.originals?.url || "";
    default:
      return images["400x300"]?.url || "";
  }
}
