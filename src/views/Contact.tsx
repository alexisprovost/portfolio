import useDocumentTitle from "../hooks/useDocumentTitle";

const Contact = () => {
	useDocumentTitle("Me Contacter");

	return (
		<div className="contact">
			<div className="contact-container">
				<h2 className="section-title">Formulaire de contact</h2>
				<form action="mailto:alexis@provost.cloud" method="post">
					<div className="form-group">
						<label htmlFor="name">Nom</label>
						<input type="text" className="form-control" id="name" name="name" placeholder="Votre nom" />
					</div>
					<div className="form-group">
						<label htmlFor="email">Email</label>
						<input type="email" className="form-control" id="email" name="email" placeholder="Votre email" />
					</div>
					<div className="form-group">
						<label htmlFor="message">Message</label>
						<textarea
							className="form-control"
							id="message"
							name="message"
							rows={3}
							placeholder="Votre message"
						></textarea>
					</div>
					<button type="submit" className="btn btn-primary">
						Envoyer
					</button>
				</form>
			</div>
		</div>
	);
}

export default Contact;
