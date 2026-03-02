

let BASE_URL = 'http://10.115.169.103:5150';

export const apiHelper = async (
  endpoint:string,
  method = "GET",
  body:any = null
) => {
  try {
    const options:any = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Add body only if not GET and body exists
    if (method !== "GET" && body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    const data = await response.json();

    return data; // returning JSON response
  } catch (error) {
    console.log("API Error:", error);
    return {
      isSuccess: false,
      message: "Something went wrong",
    };
  }
};
export default apiHelper;
