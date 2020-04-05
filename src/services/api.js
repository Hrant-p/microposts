const useRequest = async request => {
  const response = await fetch(request);
  return response.json();
};

class Api {
  constructor(baseUrl) {
    this.url = baseUrl;
  }

 createPost = async post => {
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

  fetchPosts = async () => {
    try {
      const request = new Request(`${this.url}/posts.json`, {
        method: 'get'
      });
      return useRequest(request);
    } catch (e) {
      console.error(e);
    }
  };

  fetchPostById = async id => {
    try {
      const request = new Request(`${this.url}/posts/${id}.json`, {
        method: 'get'
      });
      return useRequest(request);
    } catch (e) {
      console.error(e);
    }
  }
}

export const apiService = new Api('https://microposts-2020.firebaseio.com');
