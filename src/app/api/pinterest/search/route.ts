import { NextRequest, NextResponse } from "next/server";
import { searchPinterestPins, getPinImageUrl } from "@/lib/pinterest";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");
  const bookmark = searchParams.get("bookmark") || undefined;

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter 'q' is required" },
      { status: 400 }
    );
  }

  // Add "wedding" to search for more relevant results
  const weddingQuery = query.toLowerCase().includes("wedding") 
    ? query 
    : `wedding ${query}`;

  try {
    const response = await searchPinterestPins(weddingQuery, bookmark);
    
    // Transform to simpler format for frontend
    const pins = response.items.map((pin) => ({
      id: pin.id,
      title: pin.title || pin.description?.slice(0, 50) || "Wedding inspiration",
      imageUrl: getPinImageUrl(pin, "large"),
      thumbnailUrl: getPinImageUrl(pin, "medium"),
      dominantColor: pin.dominant_color,
      link: pin.link,
    }));

    return NextResponse.json({
      pins,
      nextPage: response.bookmark,
    });
  } catch (error) {
    console.error("Pinterest search error:", error);
    
    // Return mock data if Pinterest is not configured (for development)
    if (error instanceof Error && error.message.includes("not configured")) {
      return NextResponse.json({
        pins: getMockPins(query),
        nextPage: null,
        isMock: true,
      });
    }
    
    return NextResponse.json(
      { error: "Failed to search Pinterest" },
      { status: 500 }
    );
  }
}

// Mock data for development when Pinterest isn't configured
function getMockPins(query: string) {
  const mockImages = [
    { id: "1", url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=800&fit=crop", title: "Bridal bouquet" },
    { id: "2", url: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&h=900&fit=crop", title: "Garden venue" },
    { id: "3", url: "https://images.unsplash.com/photo-1594552072238-b8a33785b261?w=600&h=750&fit=crop", title: "Wedding dress" },
    { id: "4", url: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=600&h=800&fit=crop", title: "Table setting" },
    { id: "5", url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=850&fit=crop", title: "Wedding decor" },
    { id: "6", url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600&h=700&fit=crop", title: "Wedding cake" },
    { id: "7", url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&h=900&fit=crop", title: "Outdoor ceremony" },
    { id: "8", url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&h=800&fit=crop", title: "Wedding rings" },
    { id: "9", url: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&h=750&fit=crop", title: "Bride portrait" },
    { id: "10", url: "https://images.unsplash.com/photo-1510076857177-7470076d4098?w=600&h=850&fit=crop", title: "Reception hall" },
    { id: "11", url: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600&h=800&fit=crop", title: "Wedding photography" },
    { id: "12", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=900&fit=crop", title: "Floral arrangement" },
  ];

  return mockImages.map((img) => ({
    id: img.id,
    title: `${query} - ${img.title}`,
    imageUrl: img.url,
    thumbnailUrl: img.url.replace("600", "400"),
    dominantColor: null,
    link: null,
  }));
}
