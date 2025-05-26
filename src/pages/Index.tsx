import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

const Index = () => {
  const handleClick = () => {
    toast.success("You clicked the button!");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>Hello Buddy</h1>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button onClick={handleClick} className="mt-4">
            Click Me
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Click this button to trigger a toast</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default Index;
