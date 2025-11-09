/**
 * API Client for frontend
 */
class APIClient {
  constructor(baseURL = "/api") {
    this.baseURL = baseURL;
  }

  /**
   * Make API request
   * @param {string} endpoint
   * @param {object} options
   * @returns {Promise<any>}
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      let error = {};
      try {
        error = await response.json();
      } catch {
        error = { message: "Unknown API error (empty response)" };
      }
      throw new Error(error.message || "API request failed");
    }

    // ✅ Fix: safely handle empty bodies
    try {
      return await response.json();
    } catch {
      return {}; // fallback if response has no JSON body
    }
  }

  // -------------------- User endpoints --------------------

  async getUser(id) {
    return this.request(`/users/${id}`);
  }

  async updateUser(id, data) {
    return this.request(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async getUserClubs(id) {
    return this.request(`/users/${id}/clubs`);
  }

  async getUserEvents(id) {
    return this.request(`/users/${id}/events`);
  }

  // -------------------- Event endpoints --------------------

  async getEvents(category) {
    const query = category ? `?category=${category}` : "";
    return this.request(`/events${query}`);
  }

  async getEvent(id) {
    return this.request(`/events/${id}`);
  }

  async createEvent(data) {
    return this.request("/events", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async registerEvent(id) {
    return this.request(`/events/${id}/register`, {
      method: "POST",
    });
  }

  async unregisterEvent(id) {
    return this.request(`/events/${id}/register`, {
      method: "DELETE",
    });
  }

  // -------------------- Club endpoints --------------------

  async getClubs(search) {
    const query = search ? `?search=${search}` : "";
    return this.request(`/clubs${query}`);
  }

  async getClub(id) {
    return this.request(`/clubs/${id}`);
  }

  async joinClub(id) {
    return this.request(`/clubs/${id}/join`, {
      method: "POST",
    });
  }

  async leaveClub(id) {
    return this.request(`/clubs/${id}/join`, {
      method: "DELETE",
    });
  }

  // -------------------- Talk endpoints --------------------

  async getTalks(archived = false) {
    return this.request(`/talks?archived=${archived}`);
  }

  async getTalk(id) {
    return this.request(`/talks/${id}`);
  }

  async registerTalk(id) {
    return this.request(`/talks/${id}/register`, {
      method: "POST",
    });
  }

  // -------------------- News endpoints --------------------

  async getNews(category, region) {
    const params = new URLSearchParams();
    if (category) params.append("category", category);
    if (region) params.append("region", region);
    const query = params.toString() ? `?${params.toString()}` : "";
    return this.request(`/news${query}`);
  }

  async getNewsItem(id) {
    return this.request(`/news/${id}`);
  }
}

export const apiClient = new APIClient();
