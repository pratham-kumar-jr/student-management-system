import React, { useState } from "react";
import Input from "../components/Input/PublicFormInput";
import { FiUser } from "react-icons/fi";
import { HiLockClosed } from "react-icons/hi";
import Button from "../components/Button/Button";
import RouteLink from "../components/RouteLink";
import H1 from "../components/Basic/H1";
import P from "../components/Basic/P";
import { BsLock } from "react-icons/bs";
import { FaSpinner } from "react-icons/fa";
import { useFormik } from "formik";
import * as yup from "yup";
import ToggleButton from "../components/ToggleButton";
import { authActions } from "../store/binds/auth.bind";
import { useAppSelector } from "../store/store";
import { meError, meLoading } from "../store/selectors/auth.selectors";

interface Props {}

const Login: React.FC<Props> = (props) => {
	const [showPassword, setShowPassword] = useState(false);

	const loading = useAppSelector(meLoading);
	const error = useAppSelector(meError);

	const {
		handleSubmit,
		touched,
		isValid,
		errors,
		values,
		getFieldProps,
	} = useFormik({
		initialValues: {
			email: "",
			password: "",
		},

		validationSchema: yup.object().shape({
			email: yup.string().required().email(),
			password: yup
				.string()
				.required()
				.min(8, ({ min }) => `At least ${min} char!!!`),
		}),

		onSubmit: () => {
			console.log("Submitting!");
			authActions.login(values);
			// loginAPI(values)
			// 	.then((user) => {
			// 		setSubmitting(false);
			// 		authActions.login(user);
			// 		history.push("/dashboard");
			// 	})
			// 	.catch((error) => {
			// 		setSubmitting(false);
			// 		console.log(error.message);
			// 	});
		},
	});

	return (
		<div className="flex-1 p-6 pt-12 md:p-0">
			<div className=" max-w-lg mx-auto p-6">
				<H1>
					Log In to <RouteLink to="/login">SMS</RouteLink>
				</H1>
				<P className="mt-3">
					New Here? Log In to{" "}
					<RouteLink to="/signup">Create an account</RouteLink>
				</P>
				<form className="mt-12 relative" onSubmit={handleSubmit}>
					{error && (
						<P className="text-sm text-danger-dark absolute -top-7">{error}</P>
					)}
					<Input
						id="email"
						type="email"
						placeholder="Email address"
						required
						autoComplete="email"
						Icon={FiUser}
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
					<div className="mt-4 flex justify-between items-center">
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
							Icon={loading ? FaSpinner : BsLock}
							iconAnimation={loading ? "spin" : "none"}
						>
							Log in
						</Button>
					</div>
					<div className="flex flex-col items-center mt-10 justify-between">
						<div className="flex items-center justify-start space-x-2 flex-shrink-0">
							<input type="checkbox" className="w-4 h-4" />
							<span className=" text-secondary-light text-sm">
								Keep me logged in
							</span>
						</div>
						<RouteLink to="/forgot-password" className=" font-semibold mt-3">
							Forgot Password?
						</RouteLink>
					</div>
				</form>
			</div>
		</div>
	);
};

Login.defaultProps = {};

export default React.memo(Login);
