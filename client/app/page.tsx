"use client";
import { getApiClient } from "@/services";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Button, Spinner } from "@jecfe/react-design-system";
import { useState } from "react";

const testApi = getApiClient().path("/auth").method("get").create();

export default function Home() {
  const { error, isLoading } = useUser();

  const [response, setResponse] = useState<string>();
  const [apiError, setApiError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const callApi = async () => {
    setLoading(true);
    await testApi({})
      .then((response) => setResponse(response.data))
      .catch((e) => setApiError(e));
    setLoading(false);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <div className="space-y-4">
      <Button onClick={(e) => callApi()}>Ping API</Button>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div>API Response: {response ?? "No response to render"}</div>
          <div>API Error: {apiError ?? "No error to render"}</div>
        </>
      )}
    </div>
  );
}
