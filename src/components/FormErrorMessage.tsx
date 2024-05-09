/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';

interface FormErrorMessageProps {
	errorString?: string;
}

const FormErrorMessage: React.FC<
	FormErrorMessageProps & React.HTMLAttributes<HTMLParagraphElement>
> = ({ errorString, ...rest }) => {
	return <>{errorString && <p {...rest}>{errorString}</p>}</>;
};

export default FormErrorMessage;
