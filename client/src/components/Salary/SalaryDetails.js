import React from "react";
import { useParams } from "react-router-dom";

export default function SalaryDetails(props) {
  const URL = props.api_url;

  const { salaryId } = useParams();

  return (
    <>
      <div>SalaryDetails</div>
      <p>{salaryId}</p>
      <p>{URL}</p>
    </>
  );
}
