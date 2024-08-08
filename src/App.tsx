import React, { useState } from "react";

interface Props {}

const CompoundInterestCalculator: React.FC<Props> = () => {
  const [principal, setPrincipal] = useState<number>(0);
  const [formattedPrincipal, setFormattedPrincipal] = useState<string>("$0");
  const [annualInterest, setAnnualInterest] = useState<number>(0);
  const [totalAfterOneYear, setTotalAfterOneYear] = useState<number>(0);
  const [totalAfterOneMonth, setTotalAfterOneMonth] = useState<number>(0);
  const [interestAfterOneMonth, setInterestAfterOneMonth] = useState<number>(0);
  const [interestAfterOneYear, setInterestAfterOneYear] = useState<number>(0);
  const [dailyInterest, setDailyInterest] = useState<number>(0);
  const [isCalculated, setIsCalculated] = useState<boolean>(false);

  const formatNumber = (num: number) => {
    return num.toLocaleString("es-CO", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handlePrincipalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    const numericValue = inputValue === "" ? 0 : parseFloat(inputValue);
    setPrincipal(numericValue);
    setFormattedPrincipal(`$${numericValue.toLocaleString("es-CO")}`);
  };

  const handleAnnualInterestChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAnnualInterest(parseFloat(e.target.value));
  };

  const calculateInterests = () => {
    const r = annualInterest / 100;
    const n = 365;
    const tMonth = 1 / 12;
    const tYear = 1;

    const AMonth = principal * Math.pow(1 + r / n, n * tMonth);
    const AYear = principal * Math.pow(1 + r / n, n * tYear);

    const dailyInterestAmount = principal * Math.pow(1 + r / n, 1) - principal;

    setTotalAfterOneMonth(AMonth);
    setTotalAfterOneYear(AYear);
    setInterestAfterOneMonth(AMonth - principal);
    setInterestAfterOneYear(AYear - principal);
    setDailyInterest(dailyInterestAmount);

    setIsCalculated(true);
  };

  return (
    <div className="container">
      <div className="image-wrapper">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSvyBKUzltXSN1Z64a9VacGRW6Iov0Vohp6Q&s"
          alt="Interest Calculator Icon"
          className="circle-image"
        />
      </div>
      <h2 className="header">Cálculo de Interés NU</h2>
      <form className="form">
        <div className="form-group">
          <label className="label" htmlFor="principal">
            Monto Principal
          </label>
          <input
            className="input"
            id="principal"
            type="text"
            value={formattedPrincipal}
            onChange={handlePrincipalChange}
          />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="annualInterest">
            Interés Anual (%)
          </label>
          <input
            className="input"
            id="annualInterest"
            type="number"
            value={annualInterest}
            onChange={handleAnnualInterestChange}
          />
        </div>
        <button className="button" type="button" onClick={calculateInterests}>
          Calcular
        </button>
      </form>
      {isCalculated && (
        <div className="results">
          <h3 className="results-header">Resultados</h3>
          <div className="card">
            <p className="card-title">Interés diario:</p>
            <p className="card-content">${formatNumber(dailyInterest)} COP</p>
          </div>
          <div className="card">
            <p className="card-title">Interés ganado en 1 mes:</p>
            <p className="card-content">
              ${formatNumber(interestAfterOneMonth)} COP
            </p>
          </div>
          <div className="card">
            <p className="card-title">Total después de 1 mes:</p>
            <p className="card-content">
              ${formatNumber(totalAfterOneMonth)} COP
            </p>
          </div>
          <div className="card">
            <p className="card-title">Interés ganado en 1 año:</p>
            <p className="card-content">
              ${formatNumber(interestAfterOneYear)} COP
            </p>
          </div>
          <div className="card">
            <p className="card-title">Total después de 1 año:</p>
            <p className="card-content">
              ${formatNumber(totalAfterOneYear)} COP
            </p>
          </div>
        </div>
      )}
      <div className="footer">
        <p className="footer-text">Creado por Johan Morales</p>
      </div>
    </div>
  );
};

export default CompoundInterestCalculator;
