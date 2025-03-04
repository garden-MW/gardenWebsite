const { spawn } = require("child_process");
const os = require("os");

// Execute the command line arguments passed to this script
const args = process.argv.slice(2);

// Check if the platform is Windows
const isWindows = os.platform() === "win32";

// For Windows, use cmd.exe to run commands that require a shell
const shell = isWindows ? "cmd.exe" : undefined;

// Spawn the child process
const child = spawn(args[0], args.slice(1), {
  shell, // Use the shell explicitly on Windows
  stdio: "inherit", // This ensures that stdin, stdout, and stderr are inherited from the parent process
});

// Gracefully handle SIGINT (Ctrl+C) signal
process.on("SIGINT", () => {
  // Kill the child process on SIGINT to ensure it stops
  child.kill("SIGINT");

  // Exit the main process cleanly
  process.exit(0);
});

// When the child process finishes, ensure the main process exits with the same exit code
child.on("close", (code) => {
  process.exit(code);
});
