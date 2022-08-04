import { useRouter } from "next/router";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { useTranslation } from "next-i18next";
import useStore from "~/hooks/useStore";

export default function GetStartedEmailForm() {
	const router = useRouter();
	const { t } = useTranslation();
	const validationSchema = Yup.object({
		email: Yup.string().email(t("forms.errors.Invalid email address")).required(t("forms.errors.Please enter your email address")),
	});

	const [user, setUser] = [useStore((state) => state.user), useStore((state) => state.setUser)];

	return (
		<Formik
			initialValues={{
				email: "",
			}}
			validationSchema={validationSchema}
			onSubmit={(values) => {
				setUser({ ...user, email: values.email });
				router.push("/get-started/");
			}}
		>
			{() => (
				<Form className="text-16px flex flex-col space-y-2 border border-dark-grey p-1 sm:flex-row sm:space-y-0 sm:space-x-2 md:flex-col md:space-y-2 md:space-x-0 lg:flex-row lg:space-x-2 lg:space-y-0">
					<div className="relative flex-auto">
						<Field type="email" name="email" placeholder="Enter your email" className="text-16px h-[45px] w-full border-none bg-transparent px-4 text-black" />

						<div className="top-[100%] left-0 mt-1 text-orange md:absolute">
							<ErrorMessage name="email" />
						</div>
					</div>
					<button type="submit" className="h-[45px] bg-purple px-9 font-semibold leading-none text-white">
						{t(`Subscribe`)}
					</button>
				</Form>
			)}
		</Formik>
	);
}
