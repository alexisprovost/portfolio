const HeaderTitle = (props: any) => {
	return (
		<section>
			<div className="animate__animated animate__fadeInUp animate__faster hero-container sub-page" key={+new Date()}>
				<h1 className="hero-title">{props.title}</h1>
			</div>
		</section>
	);
};

export default HeaderTitle;
