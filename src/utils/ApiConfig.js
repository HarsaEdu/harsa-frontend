// ApiCaller.js
import { useState, useEffect } from "react";
import axios from "axios";

const ApiCaller = ({
  endpoint,
  method = "GET",
  data = null,
  onSuccess,
  onError,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          method,
          url: `https://651a7d75340309952f0d6272.mockapi.io/api/v1/${endpoint}`, // Sesuaikan dengan base URL yang benar
          data,
        });
        setIsLoading(false);
        onSuccess(response.data);
      } catch (error) {
        setIsLoading(false);
        setError(error);
        onError && onError(error);
      }
    };

    fetchData();
  }, [endpoint, method, data, onSuccess, onError]);

  return { isLoading, error };
};

export default ApiCaller;
