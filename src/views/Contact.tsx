import useDocumentTitle from "../hooks/useDocumentTitle";
import axios from "axios";
import izitoast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const Contact = () => {
	useDocumentTitle("Me Contacter");

	//submit form with axios
	const handleSubmit = (e) => {
		e.preventDefault();

		const config = {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		};

		const data = {
			name: e.target.name.value,
			email: e.target.email.value,
			message: e.target.message.value,
		};

		axios
			.post("https://api.alexisprovost.com/discord", data, config)
			.then((res) => {
				izitoast.success({
					title: "Message envoyé",
					message: "Votre message a bien été envoyé",
				});

				e.target.name.value = "";
				e.target.email.value = "";
				e.target.message.value = "";
			})
			.catch((err) => {
				izitoast.error({
					title: "Erreur",
					message:
						"Une erreur est survenue lors de l'envoi du message. Vous pouvez me contacter directement par mail à hello@alexisprovost.com",
				});
			});
	};

	return (
		<div className="contact">
			<div className="contact-container">
				<h2 className="section-title">Formulaire de contact</h2>
				<h4 className="section-subtitle">
					Vous pouvez me contacter via ce formulaire et je reviendrai votre message sur discord
				</h4>
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label htmlFor="name">Nom</label>
						<input
							type="text"
							className="form-control"
							id="name"
							name="name"
							placeholder="Votre nom"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							className="form-control"
							id="email"
							name="email"
							placeholder="Votre email"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="message">Message</label>
						<textarea
							className="form-control"
							id="message"
							name="message"
							placeholder="Votre message"
							required
						></textarea>
					</div>
					<button type="submit" className="btn btn-primary">
						Envoyer
					</button>
				</form>
			</div>
		</div>
	);
};

export default Contact;
