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

  if (data) {
    data = JSON.parse(data);
    addToLocalStorage(key, JSON.stringify([...data, value]));
  } else {
    addToLocalStorage(key, JSON.stringify([value]));
  }
};

export const addToWishlist = (user_id, property) => {
  saveToLocalStorage(user_id, property);
};

export const deleteFromWishlist = (user_id, property) => {
  let data = localStorage.getItem(user_id);
  if (!data) return null;
  data = JSON.parse(data);
  const newData = data.filter(
    (item) => parseInt(item._id) !== parseInt(property._id)
  );
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
