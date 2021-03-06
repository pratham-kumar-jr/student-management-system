import React from "react";
import P from "../components/Basic/P";

interface Props {}

const LoadingPage: React.FC<Props> = (props) => {
	console.log("loading page render");
	return (
		<div className="w-screen h-screen relative">
			<div className="absolute w-48 border-2 bg-secondary-finest rounded-full h-5 top-1/2 md:left-2/5 left-1/4">
				<div className="w-20 h-4 rounded-full bg-primary-lightest animate-moveX">
					<P className="text-xs w-12 m-auto text-secondary-dark">Loading...</P>
				</div>
			</div>
		</div>
	);
};

LoadingPage.defaultProps = {};

export default React.memo(LoadingPage);
