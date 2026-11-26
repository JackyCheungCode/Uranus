export default {
  async fetch(request) {
    const url = new URL(request.url);
    return new Response(JSON.stringify({
      name: "Uranus",
      status: "online",
      service: "Cloudflare Workers",
      path: url.pathname
    }, null, 2), {
      headers: { "content-type": "application/json; charset=utf-8" }
    });
  }
};
