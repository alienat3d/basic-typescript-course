type Config = {
	protocol: "http" | "https";
	port: 3000 | 3001;
};

type Role = {
	role: string;
};

type ConfigWithRole = Config & Role;

const serverConfig: ConfigWithRole = {
	protocol: "https",
	port: 3001,
	role: "admin",
};

const startServer = (
	protocol: "http" | "https",
	port: 3000 | 3001
): "Server started" => {
	console.log(`Server started on ${protocol}://server:${port}`);

	return "Server started";
};

startServer(serverConfig.protocol, serverConfig.port);
