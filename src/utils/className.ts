const cn = (...inputs: string[]): string => inputs.filter(Boolean).join(" ");

export default cn;
