import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Upload files for analysis
 * @param {File[]} files - Array of files to upload
 * @returns {Promise} Response from server
 */
export const uploadFiles = async (files) => {
  try {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    const response = await api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
};

/**
 * Analyze documents for discrepancies
 * @param {string} firText - First Information Report text
 * @param {string} witnessText - Witness statement text
 * @returns {Promise} Analysis results
 */
export const analyzeDocuments = async (firText, witnessText) => {
  try {
    const response = await api.post("/analyze", {
      fir_text: firText,
      witness_text: witnessText,
    });

    return response.data;
  } catch (error) {
    console.error("Analysis error:", error);
    throw error;
  }
};

/**
 * Compare two texts
 * @param {string} text1 - First text
 * @param {string} text2 - Second text
 * @returns {Promise} Comparison results
 */
export const compareTexts = async (text1, text2) => {
  try {
    const response = await api.post("/compare", {
      text1,
      text2,
    });

    return response.data;
  } catch (error) {
    console.error("Comparison error:", error);
    throw error;
  }
};

/**
 * Extract text from image
 * @param {File} file - Image file
 * @returns {Promise} Extracted text
 */
export const extractTextFromImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post("/extract-text", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Text extraction error:", error);
    throw error;
  }
};

/**
 * Get health status of the API
 * @returns {Promise} Health status
 */
export const getHealthStatus = async () => {
  try {
    const response = await api.get("/health");
    return response.data;
  } catch (error) {
    console.error("Health check error:", error);
    return { status: "error" };
  }
};

export default api;
