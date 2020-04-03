const useRequest = async request => {
  const response = await fetch(request);
  return response.json();
};

class Api {
  constructor(baseUrl) {
    this.url = baseUrl;
  }

  async createPost(post) {
    try {
      const request = new Request(`${this.url}/posts.json`, {
        method: 'post',
        body: JSON.stringify(post)
      });
      return useRequest(request);
    } catch (e) {
      console.error(e);
    }
  }

  async fetchPosts() {
    try {
      const request = new Request(`${this.url}/posts.json`, {
        method: 'get'
      });
      return useRequest(request);
    } catch (e) {
      console.error(e);
    }
  }
}

export const apiService = new Api('https://microposts-2020.firebaseio.com');
