import Bonjour from "@/components/Bonjour";
import FutureButton from "@/components/FutureButton";

import { useTranslations } from "next-intl";

export default function Home() {
	const t = useTranslations("home");

	return (
		<main className="about">
			<Bonjour />
		</main>
	);
}
