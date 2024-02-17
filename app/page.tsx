import React from "react";
import Link from "next/link";

const BirthdateSelector = () => {
  return (
    <div className="text-center mt-5">
      <div className="steps-container">
        <h1>Select Your Birthdate</h1>
        <ul className="steps">
          <li>
            1. Dear Participant, the purpose of conducting these tests is to
            evaluate the functionality of the user interface (UI) rather than
            assessing your individual performance.
          </li>
          <li>
            2. We encourage you to explore and feel comfortable making mistakes;
            our primary focus is on examining the UI functionality.
          </li>
          <li>
            3. Our main objective is to assess the efficiency and accuracy of
            date entry.
          </li>
          <li>
            4. Please ensure to focus on selecting your birth date accurately,
            giving priority to accuracy over speed.
          </li>
          <li>5. Click on the Next button below to proceed. Thank you.</li>
        </ul>
      </div>
      {/* Next.js Link component for client-side navigation */}
      <Link href="/variant-a">
        <button className="btn btn-primary mt-3">Next</button>
      </Link>
    </div>
  );
};

export default BirthdateSelector;
