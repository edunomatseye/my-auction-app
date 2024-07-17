import { compare, genSalt, hash } from "bcryptjs";

export const saltAndHashPassword = async (password: string) => {
	// const saltRounds = 10;
	// const hashedPassword = await bcrypt.hash(password, saltRounds);

	// Salt and hash password
	const salt = await genSalt(10);
	const pwHash = await hash(password, salt);

	return pwHash;
};

export const verifyPassword = async (
	password: string,
	hashedPassword: string,
) => {
	const isMatch = await compare(password, hashedPassword);

	return isMatch;
};

export { compare };
