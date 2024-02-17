import React from "react";
import Link from "next/link";

const BirthdateSelector = () => {
  return (
    <div className="text-center mt-5">
      <h1>Select Your Birthdate</h1>

      <ul>
        <li>
          Dear Participant, the purpose of conducting these tests is to evaluate
          the functionality of the user interface (UI) rather than assessing
          your individual performance.
        </li>
        <li>
          We encourage you to explore and feel comfortable making mistakes; our
          primary focus is on examining the UI's functionality.
        </li>
        <li>
          Our main objective is to assess the efficiency and accuracy of date
          entry.
        </li>
        <li>
          Please ensure to focus on selecting your birth date accurately, giving
          priority to accuracy over speed.
        </li>
        <li>Click on the "Next" button below to proceed. Thank you.</li>
      </ul>
      {/* Next.js Link component for client-side navigation */}
      <Link href="/variant-a">
        <button className="btn btn-primary mt-3">Next</button>
      </Link>
    </div>
  );
};

export default BirthdateSelector;
