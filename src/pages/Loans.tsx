import React, {useEffect, useState} from "react";
import axios from "axios";
import {useUser} from "../context/UserContext";

interface Loan {
	id: number;
	amount: number;
	months: number;
	status: string;
}

const Loans: React.FC = () => {
	const {user} = useUser();
	const [loans, setLoans] = useState<Loan[]>([]);
	const [amount, setAmount] = useState("");
	const [months, setMonths] = useState("");

	useEffect(() => {
		if (user) {
			fetchLoans();
		}
	}, [user]);

	const fetchLoans = async () => {
		try {
			const response = await axios.get(
				`http://localhost:5213/api/loans/user/${user?.id}`
			);
			setLoans(response.data);
		} catch (error) {
			console.error("Error fetching loans:", error);
		}
	};

	const handleRequestLoan = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!user) return;

		try {
			const newLoan = {
				userId: user.id,
				amount: parseFloat(amount),
				months: parseInt(months),
				status: "Pending",
			};
			await axios.post("http://localhost:5213/api/loans", newLoan);

			// Limpiar el formulario
			setAmount("");
			setMonths("");

			// Recargar la lista de préstamos
			fetchLoans();
		} catch (error) {
			console.error("Error requesting loan:", error);
		}
	};

	return (
		<div>
			<h1>Bienvenido, {user?.name}!</h1>

			{user?.role !== "Admin" && (
				<div>
					<div className="card" style={{width: "36rem"}}>
						<div className="card-body">
							<form onSubmit={handleRequestLoan}>
								<h5 className="card-title">Solicitar Préstamo</h5>
								<h6 className="card-subtitle mb-2 text-body-secondary">
									Ingrese el monto que desea solicitar
								</h6>

								<div className="mb-3">
									<label htmlFor="amount" className="form-label">
										Monto
									</label>
									<input
										required
										className="form-control"
										id="amount"
										placeholder="Monto"
										type="number"
										value={amount}
										onChange={(e) => setAmount(e.target.value)}
									/>
								</div>
								<button type="submit" className="btn btn-primary">
									Solicitar
								</button>
							</form>
						</div>
					</div>
					<div className="card mt-2" style={{width: "36rem"}}>
						<div className="card-body">
							<h3>Mis prestamos</h3>
							<ul>
								{loans.map((loan) => (
									<li key={loan.id}>
										Amount: ${loan.amount}, Months: {loan.months}, Status:{" "}
										{loan.status}
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Loans;
