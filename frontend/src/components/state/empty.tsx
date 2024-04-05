import { Alert, AlertDescription } from "../ui/alert";

// extends react component props
interface Props extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
}

export const EmptyContent = ({ text = "No data found" }: Props) => {
  return (
    <Alert>
      <AlertDescription>{text}</AlertDescription>
    </Alert>
  );
};
