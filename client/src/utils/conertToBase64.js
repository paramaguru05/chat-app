
function convertImagetoBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file); // Reads the file as a DataURL
    reader.onload = () => resolve(reader.result); // Base64 string is in reader.result
    reader.onerror = (error) => reject(error);
  });
}

export default  convertImagetoBase64