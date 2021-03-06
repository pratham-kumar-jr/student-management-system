import React, { useState } from "react";
import H1 from "../components/Basic/H1";
import P from "../components/Basic/P";
import RouteLink from "../components/RouteLink";
import { useFormik } from "formik";
import { BsLock } from "react-icons/bs";
import { FaSpinner } from "react-icons/fa";
import * as yup from "yup";
import Button from "../components/Button/Button";
import Input from "../components/Input/PublicFormInput";
import { FiUser } from "react-icons/fi";
import { HiLockClosed } from "react-icons/hi";
import ToggleButton from "../components/ToggleButton";
import { SiMailDotRu } from "react-icons/si";

interface Props {}

const SignUp: React.FC<Props> = (props) => {
	console.log("Sign up page render");
	const [showPassword, setShowPassword] = useState(false);
	const {
		handleSubmit,
		setSubmitting,
		getFieldProps,
		isSubmitting,
		isValid,
		errors,
		touched,
	} = useFormik({
		initialValues: {
			username: "",
			email: "",
			password: "",
		},

		validationSchema: yup.object().shape({
			username: yup.string().required().lowercase(),
			email: yup.string().required().email(),
			password: yup
				.string()
				.required()
				.min(8, ({ min }) => `At least ${min} char!!!`),
		}),
		onSubmit: () => {
			console.log("Registering!!!");
			setTimeout(() => {
				setSubmitting(false);
			}, 5000);
		},
	});
	return (
		<div className="flex-1 p-6 pt-12 md:p-0">
			<div className=" max-w-lg mx-auto p-6">
				<H1 className="max-w-xs">Get started with a free account</H1>
				<P className="mt-3">
					Already have an account?{" "}
					<RouteLink to="/login" className="underline">
						Log in
					</RouteLink>
				</P>
				<form className="mt-12" onSubmit={handleSubmit}>
					<Input
						id="username"
						type="text"
						placeholder="Username"
						required
						autoComplete="username"
						touched={touched.username}
						errors={errors.username}
						Icon={FiUser}
						{...getFieldProps("username")}
					/>
					<Input
						id="email"
						type="email"
						placeholder="Email Address"
						required
						autoComplete="email"
						Icon={SiMailDotRu}
						iconClassName="fill-primary-400"
						className="mt-5"
						{...getFieldProps("email")}
						touched={touched.email}
						errors={errors.email}
					/>
					<Input
						id="password"
						type={showPassword ? "text" : "password"}
						placeholder="Password"
						required
						autoComplete="current-password"
						Icon={HiLockClosed}
						className="mt-5"
						iconClassName="fill-primary-400"
						{...getFieldProps("password")}
						touched={touched.password}
						errors={errors.password}
					/>
					<div className="flex items-center justify-start space-x-2 mt-8">
						<input type="checkbox" className="w-4 h-4" />
						<span className=" text-secondary-light text-sm">
							I agree to the{" "}
							<RouteLink to="/terms-and-conditions">
								terms and conditions
							</RouteLink>
						</span>
					</div>
					<div className="mt-5 flex justify-between items-center">
						<ToggleButton
							label="show password"
							checked={showPassword}
							onChange={setShowPassword}
							className="flex-shrink-0"
						/>
						<Button
							type="submit"
							disabled={!isValid}
							className="flex-shrink-0"
							Icon={isSubmitting ? FaSpinner : BsLock}
							iconAnimation={isSubmitting ? "spin" : "none"}
						>
							Get Started!
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

SignUp.defaultProps = {};

export default React.memo(SignUp);
