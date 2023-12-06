import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center gap-4">
        <p className="font-bold text-8xl">404</p>
        <p className="font-medium">
          Sorry, we were unable to find that page
        </p>
        <Button>
          <Link to="/dashboard">Back to Homepage</Link>
        </Button>
     </div>
  );
};

export default NotFoundPage;