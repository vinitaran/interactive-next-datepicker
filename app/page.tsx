import React from "react";
import Link from "next/link";

const BirthdateSelector = () => {
  return (
    <div className="text-center mt-5">
      <h1>Select Your Birthdate</h1>

      {/* Next.js Link component for client-side navigation */}
      <Link href="/variant-a">
        <button className="btn btn-primary mt-3">Next</button>
      </Link>
    </div>
  );
};

export default BirthdateSelector;
