import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./TermsAndConditions.css";

const TermsAndConditions = () => {
  const [allAgreed, setAllAgreed] = useState(false);
  const [term1Agreed, setTerm1Agreed] = useState(false);
  const [term2Agreed, setTerm2Agreed] = useState(false);

  const handleAllAgree = () => {
    const newState = !allAgreed;
    setAllAgreed(newState);
    setTerm1Agreed(newState);
    setTerm2Agreed(newState);
  };

  const handleTermAgreeChange = (term, value) => {
    switch (term) {
      case "all":
        setAllAgreed(value);
        setTerm1Agreed(value);
        setTerm2Agreed(value);
        break;
      case "term1":
        setTerm1Agreed(value);
        setAllAgreed(value && term2Agreed);
        break;
      case "term2":
        setTerm2Agreed(value);
        setAllAgreed(term1Agreed && value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="terms-and-conditions">
      <h2>이용약관</h2>
      <div className="terms-box">
        <div className="term-checkbox">
          <input
            type="checkbox"
            id="allAgree"
            checked={allAgreed}
            onChange={handleAllAgree}
          />
          <label htmlFor="allAgree">전체 동의</label>
        </div>
        <div className="term">
          <input
            type="checkbox"
            id="term1Agree"
            checked={term1Agreed}
            onChange={(e) => handleTermAgreeChange("term1", e.target.checked)}
          />
          <label htmlFor="term1Agree">약관 1 동의</label>
          <div className="term-content">
            {/* 약관 1 내용 */}
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
        </div>
        <div className="term">
          <input
            type="checkbox"
            id="term2Agree"
            checked={term2Agreed}
            onChange={(e) => handleTermAgreeChange("term2", e.target.checked)}
          />
          <label htmlFor="term2Agree">약관 2 동의</label>
          <div className="term-content">
            {/* 약관 2 내용 */}
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
        </div>
      </div>
      <div className="actions">
        <Link
          to={allAgreed ? "/signup" : "#"}
          className={allAgreed ? "active" : "disabled"}
        >
          동의하고 가입하기
        </Link>
      </div>
    </div>
  );
};

export default TermsAndConditions;
