// One key per tool, so the skill tracer can find "Docker" in a job's tools,
// a project's stack and the parts list alike.
const aliases: Record<string, string> = {
  "aws (ec2, iam, s3, cloudwatch)": "aws",
  "aws ec2": "aws",
  "aws cloudwatch": "cloudwatch",
  "rest apis": "rest api",
};

export const toolKey = (name: string) => {
  const key = name.toLowerCase().trim();
  return aliases[key] ?? key;
};
