const apiUrl = "http://localhost:3002";

export const postData = async (endpoint, data) => {
  try {
    const response = await fetch(`${apiUrl}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData);
      return responseData;
    } else {
      throw new Error("Error al guardar los datos");
    }
  } catch (error) {
    console.error("Error de red:", error);
    return false;
  }
};

export const getData = async (endpoint) => {
  try {
    const response = await fetch(`${apiUrl}/${endpoint}`);
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Error al obtener los datos");
    }
  } catch (error) {
    console.error("Error de red:", error);
    return null;
  }
};

export const getReport = async (endpoint) => {
  try {
    const response = await fetch(`${apiUrl}/${endpoint}`);
    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "informe.pdf";
      link.click();
      window.URL.revokeObjectURL(url);
    } else {
      console.error("Error al descargar el informe");
    }
  } catch (error) {
    console.error("Error de red:", error);
  }
};
