import axios from "axios";

export const getRandomInteger = (l, r) => {
  // Ensure l and r are integers and swap if l > r
  l = Math.ceil(l); // Round l up to nearest integer
  r = Math.floor(r); // Round r down to nearest integer

  // Swap l and r if l is greater than r
  if (l > r) {
    let temp = l;
    l = r;
    r = temp;
  }

  // Calculate a random integer between l and r (inclusive)
  return Math.floor(Math.random() * (r - l + 1)) + l;
};

export const addToLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

export const getFromLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  if (!data) return null;
  return JSON.parse(data);
};

export const removeFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};

export const clearFromLocalStorage = () => {
  localStorage.clear();
};

export const saveToLocalStorage = (key, value) => {
  let data = localStorage.getItem(key);
  value.addedQuantity = 1;

  let failed = false;
  if (data) {
    data = JSON.parse(data);
    if (data.find((item) => item._id === value._id)) {
      data = data.map((item) => {
        if (item._id === value._id) {
          if (item.addedQuantity >= item.quantity) {
            item.addedQuantity += 0;
            failed = true;
          } else {
            item.addedQuantity += 1;
          }
        }
        return item;
      });
      addToLocalStorage(key, JSON.stringify(data));
      if (failed) return "failed";
    } else {
      addToLocalStorage(key, JSON.stringify([...data, value]));
    }
  } else {
    addToLocalStorage(key, JSON.stringify([value]));
  }
};

export const addToWishlist = (user_id, property) => {
  saveToLocalStorage(user_id, property);
};

export const decreaseOneFromCart = (user_id, id) => {
  let data = localStorage.getItem(user_id);
  if (!data) return null;
  data = JSON.parse(data);
  let newData = data.map((item) => {
    if (item._id === id) {
      item.addedQuantity -= 1;
    }
    return item;
  });
  newData = newData.filter((item) => item.addedQuantity > 0);
  addToLocalStorage(user_id, JSON.stringify(newData));
};

export const increaseOneFromCart = (user_id, id) => {
  let data = localStorage.getItem(user_id);
  if (!data) return null;
  data = JSON.parse(data);
  let failed = false;
  let newData = data.map((item) => {
    if (item._id === id) {
      if (item.addedQuantity >= item.quantity) {
        item.addedQuantity += 0;
        failed = true;
      } else {
        item.addedQuantity += 1;
      }
    }
    return item;
  });
  if (failed) return "failed";
  addToLocalStorage(user_id, JSON.stringify(newData));
};

export const deleteFromWishlist = (user_id, id) => {
  let data = localStorage.getItem(user_id);
  if (!data) return null;
  data = JSON.parse(data);
  const newData = data.filter((item) => item._id !== id);
  addToLocalStorage(user_id, JSON.stringify(newData));
};

export const imageUpload = async (image) => {
  const formData = new FormData();
  formData.append("image", image);
  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    formData
  );
  return data.data.display_url;
};

export const byteScaleUpload = async (image) => {
  const baseUrl = "https://api.bytescale.com";
  const path = `/v2/accounts/${
    import.meta.env.VITE_Bytescale_accountId
  }/uploads/form_data`;
  const entries = (obj) =>
    Object.entries(obj).filter(([, val]) => (val ?? null) !== null);
  const query = entries({})
    .flatMap(([k, v]) => (Array.isArray(v) ? v.map((v2) => [k, v2]) : [[k, v]]))
    .map((kv) => kv.join("="))
    .join("&");
  const formData = new FormData();
  formData.append("file", image);
  const response = await fetch(
    `${baseUrl}${path}${query.length > 0 ? "?" : ""}${query}`,
    {
      method: "POST",
      body: formData,
      headers: Object.fromEntries(
        entries({
          Authorization: `Bearer ${import.meta.env.VITE_Bytescale_apiKey}`,
          "X-Upload-Metadata": JSON.stringify({}),
        })
      ),
    }
  );
  const result = await response.json();
  if (Math.floor(response.status / 100) !== 2)
    throw new Error(`Bytescale API Error: ${JSON.stringify(result)}`);
  const { files } = result;
  if (!files || files.length !== 1)
    throw new Error(`Bytescale API Error: ${JSON.stringify(result)}`);
  const { fileUrl } = files[0];
  return fileUrl;
};
