export function getEnv(
	key: string,
	defaultValue?: string,
	env = process.env
): string {
	const value = env[key]
	const publicValue = env[`NEXT_PUBLIC_${key}`];
	if(publicValue !== undefined){
		return publicValue;
	}

	if (value !== undefined) {
		return value
	}


	if (defaultValue !== undefined) {
		return defaultValue
	}



	console.log("=>(get-value.config.ts:16) process.env", process.env);
	throw new Error(`Config error: missing required env variable "${key}"`)
}