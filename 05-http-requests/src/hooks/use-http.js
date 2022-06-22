import { useCallback, useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const httpRequest = useCallback(
    (requestConfig = { url: "" }, applyData = (data) => data) => {
      setIsLoading(true);
      setError(null);
      fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? requestConfig.body : null,
      })
        .then((response) => response.json())
        .then((data) => applyData(data))
        .catch(() => setError("Something went wrong!"))
        .finally(() => setIsLoading(false));
    },
    []
  );
  return { isLoading, error, httpRequest };
};

export default useHttp;
